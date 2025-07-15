import { Request } from "express";
import multer from "multer";
import { resolve } from "path";
import crypto from "crypto";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
	tmpFolder,

	storage: multer.diskStorage({
		destination: tmpFolder,
		filename: (request, file, callback) => {
			const fileHash = crypto.randomBytes(16).toString("hex");
			const fileName = `${fileHash}-${file.originalname}`;

			return callback(null, fileName);
		},
	}),
	limits: {
		fileSize: 2 * 1024 * 1024,
	},
	fileFilter: (
		request: Request,
		file: Express.Multer.File,
		callback: Function
	) => {
		const allowedMimes = ["image/jpeg", "image/png", "image/webp"];

		if (allowedMimes.includes(file.mimetype)) {
			callback(null, true);
		} else {
			callback(new Error("Invalid file type."));
		}
	},
};
