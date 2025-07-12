import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

interface IRequest {
	car_id: string;
	specifications_id: string[];
}
@injectable()
export class CreateCarSpecificationUseCase {
	constructor(
		@inject("CarsRepository")
		private carsRepository: ICarsRepository,
		@inject("SpecificationsRepository")
		private specificationsRepository: ISpecificationsRepository
	) {}
	
	async execute({
		car_id,
		specifications_id: specificatiosn_id,
	}: IRequest): Promise<Car> {
		const carExists = await this.carsRepository.findById(car_id);

		if (!carExists) {
			throw new AppError("Car doesn't exists!");
		}

		const specifications: Specification[] =
			await this.specificationsRepository.findByIds(specificatiosn_id);

		carExists.specifications = specifications;

		await this.carsRepository.create(carExists);

		return carExists;
	}
}
