import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { IStorageProvider } from "../IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import upload from "@config/upload";
import path from "path";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export class CloudinaryStorageProvider implements IStorageProvider {


    async saveFile(file: string, folder: string): Promise<string> {
        try {
            const localFilePath = path.resolve(upload.tmpFolder, file);

            const result = await cloudinary.uploader.upload(localFilePath, {
                folder,
                resource_type: "image",
            });


            await fs.promises.unlink(localFilePath);

            return result.public_id!;

        } catch (err) {
            console.error("Error uploading to Cloudinary:", err);
            throw new AppError("Error uploading file to Cloudinary");
        }
    }

    async deleteFile(file: string, folder: string): Promise<void> {
        try {

            const public_id = file

            const result = await cloudinary.uploader.destroy(public_id, {
                resource_type: "image",
            });

        } catch (err) {
            console.error("Error deleting file from Cloudinary:", err);
            throw new AppError("Error deleting file from Cloudinary");
        }
    }

}
