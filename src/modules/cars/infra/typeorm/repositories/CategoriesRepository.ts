import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Repository } from "typeorm";

import {
	ICategoriesRepository,
	ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";
import { Category } from "../entities/Category";

export class CategoriesRepository implements ICategoriesRepository {
	private repository: Repository<Category>;

	constructor() {
		this.repository = AppDataSource.getRepository(Category);
	}

	async create({ name, description }: ICreateCategoryDTO): Promise<void> {
		const category = this.repository.create({
			name,
			description,
		});

		await this.repository.save(category);
	}

	async list(): Promise<Category[]> {
		const categories = await this.repository.find();
		return categories;
	}

	async findByName(name: string): Promise<Category | null> {
		const category = await this.repository.findOneBy({ name });
		return category;
	}
}
