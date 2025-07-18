import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {
	private repository: Repository<Car>;

	constructor() {
		this.repository = AppDataSource.getRepository(Car);
	}

	async create({
		name,
		description,
		daily_rate,
		license_plate,
		fine_amount,
		brand,
		category_id,
		specifications,
		id,
	}: ICreateCarDTO): Promise<Car> {
		const car = this.repository.create({
			name,
			description,
			daily_rate,
			license_plate,
			fine_amount,
			brand,
			category_id,
			specifications,
			id,
		});

		await this.repository.save(car);

		return car;
	}
	async findByLicensePlate(license_plate: string): Promise<Car | null> {
		const car = await this.repository.findOneBy({ license_plate });
		return car;
	}

	async findById(id: string): Promise<Car | null> {
		const car = await this.repository.findOneBy({ id });
		return car;
	}
	async findAvailable(
		brand?: string,
		name?: string,
		category_id?: string
	): Promise<Car[]> {
		const carsQuery = this.repository
			.createQueryBuilder("c")
			.where("available = :available", { available: true });

		if (brand) {
			carsQuery.andWhere("c.brand = :brand", { brand });
		}

		if (name) {
			carsQuery.andWhere("c.name = :name", { name });
		}

		if (category_id) {
			carsQuery.andWhere("c.category_id = :category_id", { category_id });
		}

		const cars = await carsQuery.getMany();

		return cars;
	}

	async updateAvailable(id: string, available: boolean): Promise<void> {
		await this.repository
			.createQueryBuilder()
			.update()
			.set({ available })
			.where("id = :id")
			.setParameters({ id })
			.execute();
	}
}
