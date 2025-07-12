import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { User } from "../entities/User";

export class UsersRepository implements IUsersRepository {
	private repository: Repository<User>;

	constructor() {
		this.repository = AppDataSource.getRepository(User);
	}
	async create({
		name,
		email,
		password,
		driver_license,
		avatar,
		id,
	}: ICreateUserDTO): Promise<void> {
		const user = this.repository.create({
			name,
			email,
			password,
			driver_license,
			avatar,
			id,
		});

		await this.repository.save(user);
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.repository.findOneBy({ email });

		return user;
	}

	async findById(id: string): Promise<User | null> {
		const user = await this.repository.findOneBy({ id });

		return user;
	}
}
