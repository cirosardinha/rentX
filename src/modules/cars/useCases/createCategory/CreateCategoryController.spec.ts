import request from "supertest";
import { DataSource } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm/data-source";

import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: DataSource;
describe("Create Category Controller", () => {
	beforeAll(async () => {
		connection = await AppDataSource.initialize();
		const manager = AppDataSource.manager;

		await connection.runMigrations();

		const id: string = uuid();
		const password: string = await hash("admin", 8);

		await manager.query(
			`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license ) 
					values('${id}', 'admin', 'admin@admin.com', '${password}', 'true', 'NOW()', 'XXXXXX' )
				`
		);
	});

	afterAll(async () => {
		await connection.dropDatabase();
		await connection.destroy();
	});

	it("should be able to create a new category", async () => {
		const responseToken = await request(app).post("/sessions").send({
			email: "admin@admin.com",
			password: "admin",
		});

		const { token, refresh_token } = responseToken.body;

		const response = await request(app)
			.post("/categories")
			.send({
				name: "Category Supertest",
				description: "Category description",
			})
			.set({
				Authorization: `Bearer ${token}`,
			});

		expect(response.status).toBe(201);
	});

	it("should not be able to create a new category with name exists", async () => {
		const responseToken = await request(app).post("/sessions").send({
			email: "admin@admin.com",
			password: "admin",
		});

		const { token } = responseToken.body;

		await request(app)
			.post("/categories")
			.send({
				name: "Category Supertest",
				description: "Category description Supertest",
			})
			.set({
				Authorization: `Bearer ${token}`,
			});

		const response = await request(app)
			.post("/categories")
			.send({
				name: "Category Supertest",
				description: "Category description Supertest",
			})
			.set({
				Authorization: `Bearer ${token}`,
			});

		expect(response.status).toBe(400);
	});
});
