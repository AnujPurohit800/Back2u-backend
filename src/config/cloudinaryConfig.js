import cloudinaryModule from "cloudinary";
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME } from "./serverConfig.js";

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };
