import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";

export class RentalsRepositoryInMemory implements IRentalsRepository {
	rentals: Rental[] = [];

	async create({
		user_id,
		car_id,
		expected_return_date,
	}: ICreateRentalDTO): Promise<Rental> {
		const rental = new Rental();

		Object.assign(rental, {
			user_id,
			car_id,
			expected_return_date,
			start_date: new Date(),
		});

		this.rentals.push(rental);

		return rental;
	}

	async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
		return (
			this.rentals.find(
				(rental) => rental.car_id === car_id && !rental.end_date
			) || null
		);
	}
	async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
		return (
			this.rentals.find(
				(rental) => rental.user_id === user_id && !rental.end_date
			) || null
		);
	}

	async findById(id: string): Promise<Rental | null> {
		return this.rentals.find((rental) => rental.id === id) || null;
	}

	async findByUser(user_id: string): Promise<Rental[] | null> {
		return this.rentals.filter((rental) => rental.user_id === user_id) || null;
	}
}
