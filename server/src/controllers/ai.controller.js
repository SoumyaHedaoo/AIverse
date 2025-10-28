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
import {createReadStream , readFileSync} from 'fs';  
import FormData from "form-data";
import { getDocumentProxy , extractText } from "unpdf";




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

  const dataBuffer = readFileSync(resumeFile.path);
  const pdf = await getDocumentProxy(new Uint8Array(dataBuffer));

   const { totalPages, text } = await extractText(pdf, { mergePages: true });

  const prompt = `You are an expert resume reviewer and career advisor with 15+ years of experience in recruitment and applicant tracking systems (ATS). Analyze the following resume thoroughly and provide detailed, actionable feedback.

**Resume Content:** \n${text}

Analyze the provided resume and respond ONLY with a single prettified JSON object (not markdown; do not wrap in code block) containing well-typed fields as described:

{
  "overall_score": number (0-100),
  "summary": string (concise but impactful summary),
  "structure_feedback": string (clear, separated by paragraphs if needed),
  "content_feedback": string (clear, separated by paragraphs if needed),
  "ats_recommendations": string,
  "grammar_issues": string,
  "specific_improvements": [ { "priority": number, "description": string }, ... ],
  "red_flags": [ string, ... ], // Can be empty array
  "keywords_to_add": [ string, ... ] // Can be empty array
}

**Instructions:**
- Each array should be cleanly formed and use plain text (no HTML/markdown in values).
- Do not return markdown or code blocks. Only return the JSON data, formatted for readability.
- Ensure each object field is present, even if its value is null or empty (i.e., always include all keys so the UI remains consistent).
- Write actionable, readable, and concise content for each section.


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
  
    fs.unlink(resumeFile.path , (err)=>{
    if(err){
      throw new ApiError(500 , "unable to delete file")
    }
  });
    
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