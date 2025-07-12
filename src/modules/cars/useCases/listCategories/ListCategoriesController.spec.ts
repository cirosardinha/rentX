import request from "supertest";
import { DataSource } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm/data-source";

import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: DataSource;

describe("List Categories", () => {
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

	it("should be able to list all categories", async () => {
		const responseToken = await request(app).post("/sessions").send({
			email: "admin@admin.com",
			password: "admin",
		});

		const { token } = responseToken.body;

		await request(app)
			.post("/categories")
			.send({
				name: "Category Supertest",
				description: "Category Supertest description",
			})
			.set({
				Authorization: `Bearer ${token}`,
			});

		const response = await request(app).get("/categories");

		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
		expect(response.body[0]).toHaveProperty("id");
	});
});
