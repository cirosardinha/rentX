import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { AppError } from "@shared/errors/AppError";

let carsRepository = new CarsRepositoryInMemory();
let createCarUseCase: CreateCarUseCase;
describe("Create Car", () => {
	beforeEach(() => {
		carsRepository = new CarsRepositoryInMemory();
		createCarUseCase = new CreateCarUseCase(carsRepository);
	});

	it("should be able to create a new car", async () => {
		const car = await createCarUseCase.execute({
			name: "Name Car",
			description: "Description Car",
			daily_rate: 100,
			license_plate: "ABC-1234",
			fine_amount: 60,
			brand: "Brand Car",
			category_id: "category",
		});

		expect(car).toHaveProperty("id");
	});

	it("should not be able to create a car with exists license plate", async () => {
		expect(async () => {
			await createCarUseCase.execute({
				name: "Name Car1",
				description: "Description Car",
				daily_rate: 100,
				license_plate: "ABC-1234",
				fine_amount: 60,
				brand: "Brand Car",
				category_id: "category",
			});

			await createCarUseCase.execute({
				name: "Name Car2",
				description: "Description Car",
				daily_rate: 100,
				license_plate: "ABC-1234",
				fine_amount: 60,
				brand: "Brand Car",
				category_id: "category",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should be able to create a car with available true by default", async () => {
		const car = await createCarUseCase.execute({
			name: "Name Car",
			description: "Description Car",
			daily_rate: 100,
			license_plate: "ABC-1234",
			fine_amount: 60,
			brand: "Brand Car",
			category_id: "category_id",
		});

		expect(car.available).toBe(true);
	});
});
