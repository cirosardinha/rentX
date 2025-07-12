import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";
import { AppError } from "@shared/errors/AppError";

export class RefreshTokenController {
	async handle(request: Request, response: Response) {
		try {
			const token =
				request.body.token ||
				request.headers["x-access-token"] ||
				request.query.token;

			const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

			const refresh_token = await refreshTokenUseCase.execute(token);

			return response.json({ refresh_token });
		} catch (error: unknown) {
			if (error instanceof AppError) {
				return response.status(400).json({ error: error.message });
			}
			return response.status(500).json({ error: "Internal server error" });
		}
	}
}
