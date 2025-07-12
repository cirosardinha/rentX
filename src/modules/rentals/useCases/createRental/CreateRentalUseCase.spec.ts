import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import dayjs from "dayjs";
import { AppError } from "@shared/errors/AppError";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
	const dayAdd24Hours = dayjs().add(1, "day").toDate();

	beforeEach(() => {
		rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
		dayjsDateProvider = new DayjsDateProvider();
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		createRentalUseCase = new CreateRentalUseCase(
			rentalsRepositoryInMemory,
			dayjsDateProvider,
			carsRepositoryInMemory
		);

		carsRepositoryInMemory.create({
			name: "Test",
			description: "Car Test",
			daily_rate: 100,
			brand: "Brand Test",
			license_plate: "test",
			fine_amount: 40,
			category_id: "1234",
			id: "54321",
		});
	});

	it("should be able to create a new rental", async () => {
		const rental = await createRentalUseCase.execute({
			user_id: "12345",
			car_id: "54321",
			expected_return_date: dayAdd24Hours,
		});

		expect(rental).toHaveProperty("id");
		expect(rental).toHaveProperty("start_date");
	});

	it("should not be able to create a new rental if car does not exists", async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: "12345",
				car_id: "123456",
				expected_return_date: dayAdd24Hours,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to create a new rental if there is another open to the same user", async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: "12345",
				car_id: "54321",
				expected_return_date: dayAdd24Hours,
			});

			await createRentalUseCase.execute({
				user_id: "12345",
				car_id: "54322",
				expected_return_date: dayAdd24Hours,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to create a new rental if there is another open to the same car", async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: "1234567",
				car_id: "54321",
				expected_return_date: dayAdd24Hours,
			});

			await createRentalUseCase.execute({
				user_id: "12345",
				car_id: "54321",
				expected_return_date: dayAdd24Hours,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to create a new rental with invalid return time", async () => {
		expect(async () => {
			await createRentalUseCase.execute({
				user_id: "12345",
				car_id: "54321",
				expected_return_date: dayjs().toDate(),
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
