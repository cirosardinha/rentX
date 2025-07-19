import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";
import { AppError } from "@shared/errors/AppError";

export class UpdateUserAvatarController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const { id } = request.user;
			const avatar_file = request.file?.filename;
	
			const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
	
			await updateUserAvatarUseCase.execute({
				user_id: id,
				avatar_file: avatar_file!,
			});
	
			return response.status(204).send();
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ message: error.message });
			}

			return response.status(500).json({ message: "Internal server error" });
		}
	}
}
