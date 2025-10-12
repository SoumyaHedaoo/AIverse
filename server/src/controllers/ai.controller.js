import { clerkClient } from "@clerk/express";
import { FREE_PLAN, PREMIUM_PLAN } from "../constant.js";
import { sql } from "../db.js";
import { expressAsyncHandler } from "../utils/expressAsyncHandler.js";
import OpenAI from "openai";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

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
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature : 0.7,
    max_tokens : length,
});

    const content = response.choices[0].message.content;

    await sql`INSERT INTO CREATION (user_id , prompt , content , type) 
              VALUES(${userId} , ${prompt} , ${content} , 'article' )`;

    if(plan !== FREE_PLAN){
        await clerkClient.users.updateUserMetadata(userId , {
            free_usage : free_usage+1,
        })
    }

    return res
            .status(200)
            .json(new ApiResponse(200 , content , "Article generated successfully"));
})


export {
    generateArticle ,

}