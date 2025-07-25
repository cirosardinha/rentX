import { v4 as uuid } from "uuid";
import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";
@Entity("specifications")
export class Specification {
	@PrimaryColumn()
	id!: string;

	@Column()
	name!: string;

	@Column()
	description!: string;

	@CreateDateColumn()
	created_at!: Date;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}
