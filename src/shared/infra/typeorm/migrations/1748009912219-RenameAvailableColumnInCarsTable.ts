import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameAvailableColumnInCarsTable1748009912219
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.renameColumn("cars", "avilable", "available");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.renameColumn("cars", "available", "avilable");
	}
}
