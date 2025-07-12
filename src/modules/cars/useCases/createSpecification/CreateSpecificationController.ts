import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { AppError } from "@shared/errors/AppError";
export class CreateSpecificationController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const { name, description } = request.body;

			const createSpecificationUseCase = container.resolve(
				CreateSpecificationUseCase
			);

			await createSpecificationUseCase.execute({ name, description });

			return response.status(201).send();
		} catch (error: unknown) {
			if (error instanceof AppError) {
				return response.status(400).json({ error: error.message });
			}
			return response.status(500).json({ error: "Internal server error" });
		}
	}
}
