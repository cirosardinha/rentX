import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { AppError } from "@shared/errors/AppError";
export class AuthenticateController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const { email, password } = request.body;

			const authenticateUserUseCase = container.resolve(
				AuthenticateUserUseCase
			);

			const { user, token, refresh_token } =
				await authenticateUserUseCase.execute({
					email,
					password,
				});

			return response.json({ user, token, refresh_token });
		} catch (error: unknown) {
			if (error instanceof AppError) {
				return response.status(401).json({ error: error.message });
			}
			return response.status(500).json({ error: "Internal server error" });
		}
	}
}
