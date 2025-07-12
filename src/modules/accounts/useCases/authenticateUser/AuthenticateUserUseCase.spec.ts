import { AppError } from "@shared/errors/AppError";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
		dateProvider = new DayjsDateProvider();
		authenticateUserUseCase = new AuthenticateUserUseCase(
			usersRepositoryInMemory,
			usersTokensRepositoryInMemory,
			dateProvider
		);
		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
	});

	it("should be able to authenticate an user", async () => {
		const user: ICreateUserDTO = {
			name: "User Test",
			email: "4zRyI@example.com",
			password: "1234",
			driver_license: "ABC-1234",
		};

		await createUserUseCase.execute(user);

		const result = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password,
		});

		expect(result).toHaveProperty("token");
	});

	it("should not to be able to authenticate a non-existent user", async () => {
		expect(async () => {
			await authenticateUserUseCase.execute({
				email: "nonexistent@example.com",
				password: "1234",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should be not be able to authenticate with incorrect password", async () => {
		const user: ICreateUserDTO = {
			name: "User Test",
			email: "4zRyI@example.com",
			password: "1234",
			driver_license: "ABC-1234",
		};

		await createUserUseCase.execute(user);

		expect(async () => {
			await authenticateUserUseCase.execute({
				email: user.email,
				password: "incorrectPassword",
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
