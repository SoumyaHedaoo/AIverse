import { sql } from "../db";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { expressAsyncHandler } from "../utils/expressAsyncHandler";

const getUserCreations = expressAsyncHandler(async(req , res)=>{
    const {userId}= req.auth();

    const creations = await sql`SELECT *
              FROM creations
              WHERE user_id = ${userId}
              ORDER BY created_at DESC`

    if(!creations) throw new ApiError(400 , "unable to fetch users creations");

    return res
            .status(200)
            .json(new ApiResponse(200 , creations , "Users creations fetched successfully!!"));
}) 

const getAllPublishedCreations = expressAsyncHandler(async(req , res)=>{

    const creations = await sql`SELECT *
              FROM creations
              WHERE publish = true
              ORDER BY created_at DESC`

    if(!creations) throw new ApiError(400 , "unable to fetch published creations");

    return res
            .status(200)
            .json(new ApiResponse(200 , creations , "All Published creations fetched successfully!!"));
}) 


export {
    getUserCreations ,
    getAllPublishedCreations ,
}