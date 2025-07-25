import { v4 as uuid } from "uuid";

import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import upload from "@config/upload";
import { Expose } from "class-transformer";

@Entity("users")
export class User {
	@PrimaryColumn()
	id?: string;

	@Column()
	name!: string;

	@Column()
	password!: string;

	@Column()
	email!: string;

	@Column()
	driver_license!: string;

	@Column()
	isAdmin!: boolean;

	@Column()
	avatar?: string;

	@CreateDateColumn()
	created_at!: Date;

	@Expose({ name: "avatar_url" })
	avatar_url(): string | null {
		switch (upload.driver) {
			case "local":
				return `${process.env.API_URL}/avatar/${this.avatar}`;
			case "cloudinary":
				return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${this.avatar}`;
			default:
				return null;
		}
	}

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}
