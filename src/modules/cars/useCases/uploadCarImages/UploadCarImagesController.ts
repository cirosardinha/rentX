import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";
import { AppError } from "@shared/errors/AppError";

interface IFiles {
	filename: string;
}
export class UploadCarImagesController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const { id } = request.params;
			const images = request.files as IFiles[];

			const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

			const images_name = images.map((file) => file.filename);

			await uploadCarImagesUseCase.execute({ car_id: id, images_name });

			return response.status(201).send();
		} catch (error: unknown) {
			if (error instanceof AppError) {
				return response.status(400).json({ error: error.message });
			}
			return response.status(500).json({ error: "Internal server error" });
		}
	}
}
