import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { ICreateUsersTokenDTO } from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
	usersTokens: UserTokens[] = [];

	async create({
		user_id,
		expires_date,
		refresh_token,
	}: ICreateUsersTokenDTO): Promise<UserTokens> {
		const userToken = new UserTokens();

		Object.assign(userToken, {
			expires_date,
			refresh_token,
			user_id,
		});

		this.usersTokens.push(userToken);

		return userToken;
	}
	async findByUserIdAndRefreshToken(
		user_id: string,
		refresh_token: string
	): Promise<UserTokens | null> {
		const userToken = this.usersTokens.find(
			(ut) => ut.user_id === user_id && ut.refresh_token === refresh_token
		);

		return userToken || null;
	}
	async deleteById(id: string): Promise<void> {
		const userTokenIndex = this.usersTokens.findIndex((ut) => ut.id === id);

		this.usersTokens.splice(userTokenIndex, 1);
	}

	async findByRefreshToken(refresh_token: string): Promise<UserTokens | null> {
		const userToken = this.usersTokens.find(
			(ut) => ut.refresh_token === refresh_token
		);

		return userToken || null;
	}
}
