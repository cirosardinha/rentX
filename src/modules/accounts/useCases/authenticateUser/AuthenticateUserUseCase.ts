import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { sign, SignOptions } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: {
		name: string;
		email: string;
	};
	token: string;
	refresh_token: string;
}
@injectable()
export class AuthenticateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository,
		@inject("UsersTokensRepository")
		private usersTokensRepository: IUsersTokensRepository,
		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider
	) {}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError("Email or password incorrect!");
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new AppError("Email or password incorrect!");
		}

		const token = sign({}, auth.secret_token, {
			subject: user.id,
			expiresIn: `${auth.expires_in_token}m`,
		});

		const refresh_token = sign({ email }, auth.secret_refresh_token, {
			subject: user.id,
			expiresIn: `${auth.expires_in_refresh_token}d`,
		});

		const expires_date = this.dateProvider.addDays(
			auth.expires_refresh_token_days
		);

		await this.usersTokensRepository.create({
			user_id: user!.id!,
			expires_date,
			refresh_token,
		});

		const tokenResponse: IResponse = {
			user: {
				name: user.name,
				email: user.email,
			},
			token,
			refresh_token,
		};

		return tokenResponse;
	}
}
