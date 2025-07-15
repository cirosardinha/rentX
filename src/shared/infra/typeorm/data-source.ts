import { DataSource } from "typeorm";

const isTestEnv = process.env.NODE_ENV === "test";

export const AppDataSource = new DataSource({
	type: "postgres",
	host:isTestEnv? "localhost" : process.env.DB_HOST || "localhost",
	port: Number(process.env.DB_PORT) || 5432,
	username: process.env.DB_USERNAME,	
	password: process.env.DB_PASSWORD ,
	database: isTestEnv ? "rentx_test" : "rentx",
	migrations: ["./src/shared/infra/typeorm/migrations/*.{ts,js}"],
	entities: ["./src/modules/**/infra/typeorm/entities/*.{ts,js}"],
	synchronize: false,
	logging: isTestEnv ? false : true,
});

async function initAppDataSource() {
	try {
		await AppDataSource.initialize();
		console.log("✅ Data Source has been initialized!");
	} catch (error) {
		console.error("❌ Error during Data Source initialization:", error);
	}
}

initAppDataSource();
