import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";

export class CreateUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const { name, email, password, driver_license } = request.body;

			const createUserUseCase = container.resolve(CreateUserUseCase);

			await createUserUseCase.execute({
				name,
				email,
				password,
				driver_license,
			});

			return response.status(201).send();
		} catch (error: unknown) {
			if (error instanceof AppError) {
				return response.status(400).json({ error: error.message });
			}
			return response.status(500).json({ error: "Internal server error" });
		}
	}
}
