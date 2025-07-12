import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { AppError } from "@shared/errors/AppError";

import { IUsersTokensRepository } from "../repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface IRequest {
	token: string;
	password: string;
}
@injectable()
export class ResetPasswordUserUseCase {
	constructor(
		@inject("UsersTokensRepository")
		private usersTokensRepository: IUsersTokensRepository,
		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider,
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}
	async execute({ token, password }: IRequest): Promise<void> {
		const userToken = await this.usersTokensRepository.findByRefreshToken(
			token
		);

		if (!userToken) {
			throw new AppError("Invalid token!", 400);
		}

		if (
			this.dateProvider.compareIfBefore(
				userToken.expires_date,
				this.dateProvider.dateNow()
			)
		) {
			throw new AppError("Token expired!", 400);
		}

		const user = await this.usersRepository.findById(userToken.user_id);

		user!.password = await hash(password, 8);

		await this.usersRepository.create(user!);

		await this.usersTokensRepository.deleteById(userToken.id);
	}
}
