import request from "supertest";

import { DataSource } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { app } from "@shared/infra/http/app";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

let connection: DataSource;

describe("Authenticate User", () => {
	beforeAll(async () => {
		connection = await AppDataSource.initialize();
		await connection.runMigrations();
	});

	afterAll(async () => {
		await connection.dropDatabase();
		await connection.destroy();
	});

	it("should be able to authenticate an user", async () => {
		const user: ICreateUserDTO = {
			name: "User Supertest",
			email: "user@user.com",
			password: "1234",
			driver_license: "ABC-1234",
		};

		await request(app).post("/users").send(user);

		const response = await request(app).post("/sessions").send({
			email: user.email,
			password: user.password,
		});

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("token");
	});

	it("should not to be able to authenticate a non-existent user or with incorrect password/email", async () => {
		const response = await request(app).post("/sessions").send({
			email: "nonexistent@example",
			password: "1234",
		});

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error).toBe("Email or password incorrect!");
	});
});
