import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { AppError } from "@shared/errors/AppError";

export class CreateRentalController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const { car_id, expected_return_date } = request.body;
			const { id } = request.user;

			const createRentalUseCase = container.resolve(CreateRentalUseCase);

			const rental = await createRentalUseCase.execute({
				user_id: id,
				car_id,
				expected_return_date,
			});

			return response.status(201).json(rental);
		} catch (error: any) {
			if (error instanceof AppError) {
				return response.status(400).json({ error: error.message });
			}
			return response.status(500).json({ error: "Internal server error" });
		}
	}
}
