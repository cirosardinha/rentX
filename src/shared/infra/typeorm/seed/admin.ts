import { AppDataSource } from "./../data-source";
import { v4 as uuid } from "uuid";
import { hash } from "bcrypt";

async function create() {
	const connection = AppDataSource.manager;

	const id: string = uuid();
	const password: string = process.env.ADMIN_PASSWORD as string;
	const hashedPassword = await hash(password, 8);
	const email: string = process.env.ADMIN_EMAIL as string;

	await connection.query(
		`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license ) 
      values('${id}', 'admin', '${email}', '${hashedPassword}', 'true', 'NOW()', 'XXXXXX' )
    `
	);

	await AppDataSource.destroy();
}

create().then(() => {
	console.log("Admin created");
});
