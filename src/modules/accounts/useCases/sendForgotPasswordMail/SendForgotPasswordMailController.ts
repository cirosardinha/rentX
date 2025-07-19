import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import { AppError } from "@shared/errors/AppError";

export class SendForgotPasswordMailController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const { email } = request.body;

			const sendForgotPasswordMailUseCase = container.resolve(
				SendForgotPasswordMailUseCase
			);

			await sendForgotPasswordMailUseCase.execute(email);

			return response.status(200).send();
		} catch (error: unknown) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ message: error.message });
			}
			return response.status(500).json({ message: "Internal server error" });
		}
	}
}
