import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { AppError } from "@shared/errors/AppError";

export class CreateCarSpecificationController {
	async handle(request: Request, response: Response) {
		try {
			const { id } = request.params;
			const { specifications_id } = request.body;
			const createCarSpecificationUseCase = container.resolve(
				CreateCarSpecificationUseCase
			);

			const cars = await createCarSpecificationUseCase.execute({
				car_id: id,
				specifications_id,
			});

			return response.json(cars);
		} catch (error: any) {
			throw new AppError(error);
		}
	}
}
