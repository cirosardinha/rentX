import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

export class ResetPasswordUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const resetPasswordUserUseCase = container.resolve(
				ResetPasswordUserUseCase
			);

			const token = request.query.token as string;
			const { password } = request.body;

			await resetPasswordUserUseCase.execute({ token, password });

			return response.status(200).send();
		} catch (error: unknown) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ error: error.message });
			}
			return response.status(500).json({ error: "Internal server error" });
		}
	}
}
