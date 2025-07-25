import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken";

import auth from "@config/auth";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IPayload {
	sub: string;
	email: string;
}

interface ITokenResponse {
	token: string;
	refresh_token: string;
}

@injectable()
export class RefreshTokenUseCase {
	constructor(
		@inject("UsersTokensRepository")
		private usersTokensRepository: IUsersTokensRepository,
		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider
	) {}

	async execute(token: string): Promise<ITokenResponse> {
		const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

		const user_id = sub;

		const userToken =
			await this.usersTokensRepository.findByUserIdAndRefreshToken(
				user_id,
				token
			);

		if (!userToken) {
			throw new AppError("Refresh token does not exists!");
		}

		await this.usersTokensRepository.deleteById(userToken.id);

		const refresh_token = sign({ email }, auth.secret_refresh_token, {
			expiresIn: `${auth.expires_in_refresh_token}d`,
			subject: user_id,
		});

		const expires_date = this.dateProvider.addDays(
			auth.expires_refresh_token_days
		);

		await this.usersTokensRepository.create({
			expires_date,
			refresh_token,
			user_id,
		});

		const newToken = sign({}, auth.secret_token, {
			subject: user_id,
			expiresIn: `${auth.expires_in_token}m`,
		});

		return {
			token: newToken,
			refresh_token,
		};
	}
}
