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
		} catch (error: any) {
			console.log(error);
			return response.status(400).json({ error: error.message });
		}
	}
}
