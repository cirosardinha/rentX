import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface IRequest {
	name: string;
	description: string;
}

@injectable()
export class CreateSpecificationUseCase {
	constructor(
		@inject("SpecificationsRepository")
		private specificationsRepository: ISpecificationsRepository
	) {}
	async execute({ name, description }: IRequest): Promise<Specification> {
		const specificationAlreadyExists =
			await this.specificationsRepository.findByName(name);

		if (specificationAlreadyExists) {
			throw new AppError("Specification already exists!");
		}

		const specification = await this.specificationsRepository.create({
			name,
			description,
		});

		return specification;
	}
}
