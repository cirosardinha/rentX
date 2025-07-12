import { Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm/data-source";

import { ICreateUsersTokenDTO } from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UserTokens } from "../entities/UserTokens";

export class UsersTokensRepository implements IUsersTokensRepository {
	private repository: Repository<UserTokens>;

	constructor() {
		this.repository = AppDataSource.getRepository(UserTokens);
	}

	async create({
		user_id,
		expires_date,
		refresh_token,
	}: ICreateUsersTokenDTO): Promise<UserTokens> {
		const userToken = this.repository.create({
			expires_date,
			refresh_token,
			user_id,
		});

		await this.repository.save(userToken);

		return userToken;
	}

	async findByUserIdAndRefreshToken(
		user_id: string,
		refresh_token: string
	): Promise<UserTokens | null> {
		const userTokens = await this.repository.findOne({
			where: { user_id, refresh_token },
		});

		return userTokens;
	}

	async deleteById(id: string): Promise<void> {
		await this.repository.delete(id);
	}

	async findByRefreshToken(refresh_token: string): Promise<UserTokens | null> {
		const userTokens = await this.repository.findOneBy({ refresh_token });

		return userTokens;
	}
}
