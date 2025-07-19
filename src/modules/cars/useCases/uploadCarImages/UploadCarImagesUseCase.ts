import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import upload from "@config/upload";
import path from "path";
import fs from "fs";

interface IRequest {
	car_id: string;
	images_name: string[];
}

@injectable()
export class UploadCarImagesUseCase {
	constructor(
		@inject("CarsImagesRepository")
		private carsImagesRepository: ICarsImagesRepository,
		@inject("StorageProvider")
		private storageProvider: IStorageProvider
	) { }

	async execute({ car_id, images_name }: IRequest): Promise<void> {
		for (const image of images_name) {
			const localFilePath = path.resolve(upload.tmpFolder, image);
			await this.carsImagesRepository.create(car_id, image);
			await this.storageProvider.saveFile(localFilePath, "cars");
		}
	}
}
