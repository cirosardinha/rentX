import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";
export class ListRentalsByUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const { id } = request.user;

			const listRentalsByUserUseCase = container.resolve(
				ListRentalsByUserUseCase
			);

			const rentals = await listRentalsByUserUseCase.execute(id);

			return response.status(200).json(rentals);
		} catch (error: unknown) {
			if (error instanceof Error) {
				return response.status(400).json({ error: error.message });
			}
			return response.status(500).json({ error: "Internal server error" });
		}
	}
}
