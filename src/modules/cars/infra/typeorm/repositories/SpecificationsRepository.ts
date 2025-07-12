import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Repository } from "typeorm";

import {
	ISpecificationsRepository,
	ICreateSpecificationDTO,
} from "@modules/cars/repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";

export class SpecificationsRepository implements ISpecificationsRepository {
	private repository: Repository<Specification>;

	constructor() {
		this.repository = AppDataSource.getRepository(Specification);
	}
	async create({
		name,
		description,
	}: ICreateSpecificationDTO): Promise<Specification> {
		const specification = this.repository.create({
			name,
			description,
		});

		await this.repository.save(specification);

		return specification;
	}

	async findByName(name: string): Promise<Specification | null> {
		const specification = await this.repository.findOneBy({ name });
		return specification;
	}

	async findByIds(ids: string[]): Promise<Specification[]> {
		const specifications = await this.repository.findByIds(ids);
		return specifications;
	}
}
