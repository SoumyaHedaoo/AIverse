import cloudinary from "./cloudinaryConfig"
import fs from 'fs/promises';

const uploadOnCloudinary = async (filePath)=>{
    try {
        const uploadResponse =await  cloudinary.uploader.upload(filePath , {resource_type : auto});

        console.log("File uploaded Successfully!!!");
        
        return uploadResponse.secure_url;
    } catch (error) {
        console.log("Unable to upload file , error : ", error );
    }
}

export {
    uploadOnCloudinary ,
}