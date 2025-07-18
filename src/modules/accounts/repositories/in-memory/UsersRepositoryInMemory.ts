import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
	users: User[] = [];

	async create(data: ICreateUserDTO): Promise<void> {
		const user = new User();

		Object.assign(user, data);

		this.users.push(user);
	}
	async findByEmail(email: string): Promise<User | null> {
		return this.users.find((user) => user.email === email) || null;
	}
	async findById(id: string): Promise<User | null> {
		return this.users.find((user) => user.id === id) || null;
	}
}
