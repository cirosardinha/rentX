import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";
import { AppError } from "@shared/errors/AppError";

export class CreateCarController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const {
				name,
				description,
				daily_rate,
				license_plate,
				fine_amount,
				brand,
				category_id,
			} = request.body;

			const createCarUseCase = container.resolve(CreateCarUseCase);

			const car = await createCarUseCase.execute({
				name,
				description,
				daily_rate,
				license_plate,
				fine_amount,
				brand,
				category_id,
			});

			return response.status(201).json(car);
		} catch (error: unknown) {
			if (error instanceof AppError) {
				return response.status(400).json({ error: error.message });
			}
			return response.status(500).json({ error: "Internal server error" });
		}
	}
}
