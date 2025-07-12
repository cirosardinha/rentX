import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

export class CarsRepositoryInMemory implements ICarsRepository {
	cars: Car[] = [];

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
		const car = new Car();

		Object.assign(car, {
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

		this.cars.push(car);

		return car;
	}

	async findByLicensePlate(license_plate: string): Promise<Car | null> {
		return this.cars.find((car) => car.license_plate === license_plate) || null;
	}

	async findAvailable(
		brand?: string,
		name?: string,
		category_id?: string
	): Promise<Car[]> {
		const all = this.cars.filter((car) => {
			if (
				car.available ||
				(brand && car.brand === brand) ||
				(category_id && car.category_id === category_id) ||
				(name && car.name === name)
			) {
				return car;
			}
			return null;
		});
		return all;
	}

	async findById(id: string): Promise<Car | null> {
		return this.cars.find((car) => car.id === id) || null;
	}

	async updateAvailable(id: string, available: boolean): Promise<void> {
		const findIndex = this.cars.findIndex((car) => car.id === id);
		this.cars[findIndex].available = available;
	}
}
