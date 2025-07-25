import { inject, injectable } from "tsyringe";
import path from "path";
import fs from "fs";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import upload from "@config/upload";

interface IRequest {
	user_id: string;
	avatar_file: string;
}
@injectable()
export class UpdateUserAvatarUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository,
		@inject("StorageProvider")
		private storageProvider: IStorageProvider
	) { }

	async execute({ user_id, avatar_file }: IRequest): Promise<void> {
		const user = await this.usersRepository.findById(user_id);

		if (user!.avatar) {
			await this.storageProvider.deleteFile(user!.avatar, "avatar");
		}

		const savedFile = await this.storageProvider.saveFile(avatar_file, "avatar");

		user!.avatar = savedFile;

		await this.usersRepository.create(user!);

	}
}
