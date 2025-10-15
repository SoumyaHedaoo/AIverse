import { clerkClient } from "@clerk/express";
import { FREE_PLAN, PREMIUM_PLAN } from "../constant.js";
import { sql } from "../db/index.js";
import { expressAsyncHandler } from "../utils/expressAsyncHandler.js";
import OpenAI from "openai";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import axios from "axios";
import { uploadOnCloudinary } from "../utils/cloudinaryUploader.js";

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
    max_tokens : 50,
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

export {
    generateArticle ,
    generateBlogTitle , 
    generateImage ,
}