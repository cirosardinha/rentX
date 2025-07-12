import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameCarsImagesTable1752349701782 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable("cars_images", "cars_image");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable("cars_image", "cars_images");
    }

}
