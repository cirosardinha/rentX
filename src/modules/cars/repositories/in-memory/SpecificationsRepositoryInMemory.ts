import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
	ICreateSpecificationDTO,
	ISpecificationsRepository,
} from "../ISpecificationsRepository";

export class SpecificationsRepositoryInMemory
	implements ISpecificationsRepository
{
	specifications: Specification[] = [];
	async create({
		name,
		description,
	}: ICreateSpecificationDTO): Promise<Specification> {
		const specification = new Specification();

		Object.assign(specification, {
			name,
			description,
		});

		this.specifications.push(specification);

		return specification;
	}

	async findByName(name: string): Promise<Specification | null> {
		const specification = this.specifications.find(
			(specification) => specification.name === name
		);

		return specification || null;
	}
	async findByIds(ids: string[]): Promise<Specification[]> {
		const allSpecifications = this.specifications.filter((specification) =>
			ids.includes(specification.id)
		);

		return allSpecifications;
	}
}
