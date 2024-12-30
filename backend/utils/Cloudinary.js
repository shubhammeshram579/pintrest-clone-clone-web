import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv";

// configration env file path
dotenv.config();

// connect with cloudinary cloud server
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});


const uploadCloudinary = async (file) =>{
    try {
        if(!file) return null

        const response = await cloudinary.uploader.upload(file.path,{
            resource_type: "auto"
        })

        console.log("file uploaded on cloudenery", response.url)
        // fs.unlinkSync(localFilePath)
        return response;

        
    } catch (error) {
        // fs.unlinkSync(localFilePath)
        console.error("Cloudinary upload error:", error.message);
        return null
        
    }

}

export {uploadCloudinary}