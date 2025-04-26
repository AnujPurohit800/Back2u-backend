import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "./cloudinaryConfig.js";

export const uploader = multer({
  storage: new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "Find_It",
      format: async (req, file) => "jpg",
      public_id: (req, file) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e5);
        return file.fieldname + "-" + uniqueSuffix;
      },
    },
  }),
});
