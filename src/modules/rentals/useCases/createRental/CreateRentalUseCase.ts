import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { AppError } from "@shared/errors/AppError";

import { inject, injectable } from "tsyringe";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
	user_id: string;
	car_id: string;
	expected_return_date: Date;
}

const MINIMUM_HOURS = 24;

@injectable()
export class CreateRentalUseCase {
	constructor(
		@inject("RentalsRepository")
		private rentalsRepository: IRentalsRepository,
		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider,
		@inject("CarsRepository")
		private carsRepository: ICarsRepository
	) {}
	async execute({
		user_id,
		car_id,
		expected_return_date,
	}: IRequest): Promise<Rental> {
		const car = await this.carsRepository.findById(car_id);

		if (!car) {
			throw new AppError("Car doesn't exists!");
		}

		const carUnavailableForRental =
			await this.rentalsRepository.findOpenRentalByCar(car_id);

		if (carUnavailableForRental) {
			throw new AppError("Car is unavailable");
		}

		const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
			user_id
		);

		if (rentalOpenToUser) {
			throw new AppError("There's a rental in progress for user");
		}

		//Duração minima de aluguel

		const dateNow = this.dateProvider.dateNow();

		const compare = this.dateProvider.compareInHours(
			dateNow,
			expected_return_date
		);
		if (compare < MINIMUM_HOURS) {
			throw new AppError("Invalid return time");
		}

		const rental = await this.rentalsRepository.create({
			user_id,
			car_id,
			expected_return_date,
		});

		await this.carsRepository.updateAvailable(car_id, false);

		return rental;
	}
}
