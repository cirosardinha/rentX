import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarsRepository {
	create(data: ICreateCarDTO): Promise<Car>;

	findByLicensePlate(license_plate: string): Promise<Car | null>;

	findAvailable(
		brand?: string,
		name?: string,
		category_id?: string
	): Promise<Car[]>;

	findById(id: string): Promise<Car | null>;

	updateAvailable(id: string, available: boolean): Promise<void>;
}
