import request from "supertest";

import { DataSource } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { app } from "@shared/infra/http/app";

let connection: DataSource;
describe("Create User", () => {
	beforeAll(async () => {
		connection = await AppDataSource.initialize();
		await connection.runMigrations();
	});

	afterAll(async () => {
		await connection.dropDatabase();
		await connection.destroy();
	});

	it("should be able to create a new user", async () => {
		const response = await request(app).post("/users").send({
			name: "User Supertest",
			email: "user@user.com",
			password: "1234",
			driver_license: "ABC-1234",
		});

		expect(response.status).toBe(201);
	});

	it("should not be able to create a user with exists email", async () => {
		await request(app).post("/users").send({
			name: "User Supertest",
			email: "user@user.com",
			password: "1234",
			driver_license: "ABC-1234",
		});

		const response = await request(app).post("/users").send({
			name: "User Supertest",
			email: "user@user.com",
			password: "1234",
			driver_license: "ABC-1234",
		});

		expect(response.status).toBe(400);
		expect(response.body.error).toBe("User already exists!");
	});
});
