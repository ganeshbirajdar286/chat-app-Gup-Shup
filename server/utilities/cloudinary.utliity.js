import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadonCloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) return null;
        // upload 
        const response =await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        })
        console.log("file is upload on cloudinary",response.url);
         fs.unlinkSync(localfilepath)
             return response;
    }catch(err){
        fs.unlinkSync(localfilepath);
        return null;
    }
}

export default uploadonCloudinary