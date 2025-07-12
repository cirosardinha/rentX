import { Request, Response } from "express";

import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { AppError } from "@shared/errors/AppError";
export class CreateCategoryController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const { name, description } = request.body;

			const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

			await createCategoryUseCase.execute({ name, description });

			return response.status(201).send();
		} catch (error: unknown) {
			if (error instanceof AppError) {
				return response.status(400).json({ error: error.message });
			}
			return response.status(500).json({ error: "Internal server error" });
		}
	}
}
