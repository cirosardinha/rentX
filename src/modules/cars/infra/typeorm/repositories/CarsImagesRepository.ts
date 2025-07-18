import { Repository } from "typeorm";
import { AppDataSource } from "@shared/infra/typeorm/data-source";

import { CarImage } from "../entities/CarImage";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

//TODO: - Criar método para deletar imagens
// 		- verificar se a imagem existe no car

export class CarsImagesRepository implements ICarsImagesRepository {
	private repository: Repository<CarImage>;

	constructor() {
		this.repository = AppDataSource.getRepository(CarImage);
	}
	async create(car_id: string, image_name: string): Promise<CarImage> {
		const carImage = this.repository.create({
			car_id,
			image_name,
		});

		await this.repository.save(carImage);

		return carImage;
	}
}
