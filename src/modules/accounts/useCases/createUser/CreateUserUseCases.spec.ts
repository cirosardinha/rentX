import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { AppError } from "@shared/errors/AppError";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
	});

	it("should be able to create a new user", async () => {
		const user: ICreateUserDTO = {
			name: "User Test",
			email: "4zRyI@example.com",
			password: "1234",
			driver_license: "ABC-1234",
		};

		await createUserUseCase.execute(user);

		const userCreated = await usersRepositoryInMemory.findByEmail(user.email);

		expect(userCreated).toHaveProperty("id");
	});

	it("should not be able to create a user with exists email", async () => {
		expect(async () => {
			const user: ICreateUserDTO = {
				name: "User Test",
				email: "4zRyI@example.com",
				password: "1234",
				driver_license: "ABC-1234",
			};

			await createUserUseCase.execute(user);
			await createUserUseCase.execute(user);
		}).rejects.toEqual(new AppError("User already exists!"));
	});
});
