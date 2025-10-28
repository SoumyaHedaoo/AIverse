import { clerkClient } from "@clerk/express";
import { FREE_PLAN, PREMIUM_PLAN } from "../constant.js";
import { sql } from "../db/index.js";
import { expressAsyncHandler } from "../utils/expressAsyncHandler.js";
import OpenAI from "openai";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import axios from "axios";
import { uploadOnCloudinary } from "../utils/cloudinaryUploader.js";
import fs from 'fs/promises';
import {createReadStream} from 'fs';  
import FormData from "form-data";




const ai = new OpenAI({
    apiKey: `${process.env.GEMINI_API_KEY}`,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

const generateArticle = expressAsyncHandler(async(req , res)=>{
    
    const {userId} = req.auth();
    const {prompt , length} = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage; 

    if(plan !== PREMIUM_PLAN && free_usage>=10) throw new ApiError(400 , "Limit reached | Upgrade to continue");

    const response = await ai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature : 0.7,
    max_tokens : length,
});

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations (user_id , prompt , content , type) 
              VALUES(${userId} , ${prompt} , ${content} , 'article' )`;

    if(plan !== FREE_PLAN){
        await clerkClient.users.updateUserMetadata(userId , {
            privateMetadata :{
                free_usage : free_usage+1,
            }
        })
    }

    return res
            .status(200)
            .json(new ApiResponse(200 , content , "Article generated successfully"));
})

const generateBlogTitle = expressAsyncHandler(async(req , res)=>{
    
    const {userId} = req.auth();
    const {prompt} = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage; 

    if(plan !== PREMIUM_PLAN && free_usage>=10) throw new ApiError(400 , "Limit reached | Upgrade to continue");

    const response = await ai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature : 0.7,
    max_tokens : 200,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations (user_id , prompt , content , type) 
              VALUES(${userId} , ${prompt} , ${content} , 'article' )`;

    if(plan !== FREE_PLAN){
        await clerkClient.users.updateUserMetadata(userId , {
            privateMetadata :{
                free_usage : free_usage+1,
            }
        })
    }

    return res
            .status(200)
            .json(new ApiResponse(200 , content , "Title generated successfully"));
})

const generateImage = expressAsyncHandler(async(req , res)=>{
    
    const {userId} = req.auth();
    const {prompt , publish} = req.body;
    const plan = req.plan;

    if(plan !== PREMIUM_PLAN) throw new ApiError(400 , "premium feature | Upgrade to continue");

    const formData = new FormData()
    formData.append('prompt', prompt)

    const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData, {
        method: 'POST',
        headers: {'x-api-key': process.env.CLIPDROP_API_KEY,},
        responseType : 'arraybuffer',
    })

    const base64Image = `data:image/png;base64,${Buffer.from(data , 'binary').toString('base64')}`;

    const secureUrl = await uploadOnCloudinary(base64Image);
    if (!secureUrl) throw new ApiError(500, "Image upload to Cloudinary failed");
    
    await sql`
    INSERT INTO creations (user_id, prompt, content, type, publish)
    VALUES (${userId}, ${prompt}, ${secureUrl}, 'image', ${publish ? true : false})
  `;


    return res
            .status(200)
            .json(new ApiResponse(200 , secureUrl , "Image generated successfully"));
})

const removeBackground = expressAsyncHandler(async (req, res) => {
  const { userId } = req.auth();
  const image = req.file; 
  const imageLocalPath = req.file?.path;
  const plan = req.plan;

  if (plan !== PREMIUM_PLAN) {
    throw new ApiError(400, "premium feature | Upgrade to continue");
  }


  const imageStream = createReadStream(imageLocalPath);
  
  const formData = new FormData();
  formData.append('image_file', imageStream, image.originalname);

  const response = await axios.post(
    'https://clipdrop-api.co/remove-background/v1',
    formData,
    {
      headers: {
        'x-api-key': process.env.CLIPDROP_API_KEY,
        ...formData.getHeaders(),
      },
      responseType: 'arraybuffer',
    }
  );

  const base64Image = `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;
  const cloudinaryUrl = await uploadOnCloudinary(base64Image);

  if (!cloudinaryUrl) {
    throw new ApiError(500, "Unable to upload to Cloudinary");
  }

  fs.unlink(imageLocalPath , (err)=>{
    if(err){
      throw new ApiError(500 , "unable to delete file")
    }
  });
  
  await sql`
    INSERT INTO creations (user_id, prompt, content, type)
    VALUES (${userId}, 'remove background from image', ${cloudinaryUrl}, 'image')
  `;

  return res
          .status(200)
          .json(new ApiResponse(200, { url: cloudinaryUrl }, "Background removed successfully"));
});

const removeObject = expressAsyncHandler(async (req, res) => {
  const { userId } = req.auth();
  const {objectToRemove} = req.body;
  const imageLocalPath = req.file?.path;
  const plan = req.plan;

  if (plan !== PREMIUM_PLAN) {
    throw new ApiError(400, "premium feature | Upgrade to continue");
  }

  const cloudinaryUrl = await uploadOnCloudinary(imageLocalPath);
  if (!cloudinaryUrl) {
    throw new ApiError(500, "Unable to upload to Cloudinary");
  }

  const parts = cloudinaryUrl.split('/upload/');
  if (parts.length !== 2) {
      throw new ApiError(500, "Invalid Cloudinary URL format");
  }
  const transformedUrl = `${parts[0]}/upload/e_gen_remove:prompt_${objectToRemove}/${parts[1]}`;


  await fs.unlink(imageLocalPath);
  
  await sql`
    INSERT INTO creations (user_id, prompt, content, type)
    VALUES (${userId}, 'remove object from image', ${transformedUrl}, 'image')
  `;

  return res
          .status(200)
          .json(new ApiResponse(200, { url: transformedUrl }, "object removed successfully"));
});

const resumeReview = expressAsyncHandler(async (req, res) => {
  const { userId } = req.auth();
  const {objectToRemove} = req.body;
  const resumeFile = req.file;
  const plan = req.plan;

  if (plan !== PREMIUM_PLAN) {
    throw new ApiError(400, "premium feature | Upgrade to continue");
  }

  if(resumeFile.size > 5*1024*1024) throw new ApiError(400 , "file size exceeds allowed limit of 5MB");

  const dataBuffer = fs.readFileSync(resumeFile.path);
  const pdf = await getDocumentProxy(new Uint8Array(dataBuffer));

   const { totalPages, text } = await extractText(pdf, { mergePages: true });

  const prompt = `You are an expert resume reviewer and career advisor with 15+ years of experience in recruitment and applicant tracking systems (ATS). Analyze the following resume thoroughly and provide detailed, actionable feedback.

**Resume Content:** \n${text}

**Your Review Should Include:**

1. **Overall Assessment (Score: 0-100)**
   - Provide an overall quality score with brief justification

2. **Structure & Formatting Analysis**
   - Evaluate layout, section organization, and visual hierarchy
   - Check for ATS compatibility issues (tables, graphics, special characters, columns)
   - Assess readability and professional appearance
   - Verify consistent formatting, punctuation, and capitalization

3. **Content Quality Review**
   - Analyze professional summary/objective for impact and relevance
   - Evaluate work experience descriptions for clarity and achievement-focus
   - Check if bullet points use strong action verbs and quantifiable metrics
   - Identify missing or weak quantitative achievements (numbers, percentages, dollar amounts)
   - Assess skills section for relevance and completeness

4. **ATS Optimization**
   - Identify missing keywords from job description (if provided)
   - Suggest industry-specific terminology and skills to add
   - Check for proper use of job titles and standard section headings

5. **Language & Grammar**
   - Check for grammatical errors, typos, and spelling mistakes
   - Identify passive voice usage and suggest active alternatives
   - Flag redundant phrasing or wordy sections
   - Ensure consistency in tense usage

6. **Specific Recommendations**
   - Provide 5-7 prioritized, actionable improvements
   - Suggest specific rewrites for weak bullet points
   - Recommend missing sections or information
   - Identify gaps between resume and job requirements (if job description provided)

7. **Red Flags**
   - Highlight any concerning elements (employment gaps, frequent job changes, irrelevant information)
   - Note any content that may raise recruiter concerns

**Output Format:**
Provide your analysis in structured JSON format with the following keys: overall_score, summary, structure_feedback, content_feedback, ats_recommendations, grammar_issues, specific_improvements (array), red_flags (array), and keywords_to_add (array).

Be constructive, specific, and actionable in all feedback. Focus on improvements that will increase interview likelihood.
`

    const response = await ai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature : 0.7,
    max_tokens : 3000,
    });


    const content= response.choices[0].message.content;
  
    fs.unlinkSync(resumeFile.path);
    
  await sql`
    INSERT INTO creations (user_id, prompt, content, type)
    VALUES (${userId}, 'review attached resume ', ${content}, 'resume-review')
  `;

  return res
          .status(200)
          .json(new ApiResponse(200, content , "resume reviewed successfully"));
});

export {
    generateArticle ,
    generateBlogTitle , 
    generateImage ,
    removeBackground ,
    removeObject ,
    resumeReview ,
}