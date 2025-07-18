import { Category } from "../infra/typeorm/entities/Category";

export interface ICreateCategoryDTO {
	name: string;
	description: string;
}

export interface ICategoriesRepository {
	findByName(name: string): Promise<Category | null>;
	list(): Promise<Category[]>;
	create({ name, description }: ICreateCategoryDTO): Promise<void>;
}
