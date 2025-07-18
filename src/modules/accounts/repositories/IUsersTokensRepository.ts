import { ICreateUsersTokenDTO } from "../dtos/ICreateUsersTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface IUsersTokensRepository {
	create({
		user_id,
		expires_date,
		refresh_token,
	}: ICreateUsersTokenDTO): Promise<UserTokens>;

	findByUserIdAndRefreshToken(
		user_id: string,
		refresh_token: string
	): Promise<UserTokens | null>;

	findByRefreshToken(refresh_token: string): Promise<UserTokens | null>;

	deleteById(id: string): Promise<void>;
}
