import { v4 as uuid } from "uuid";

import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
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

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}
