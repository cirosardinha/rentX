import { v4 as uuid } from "uuid";

import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity("users_tokens")
export class UserTokens {
	@PrimaryColumn()
	id!: string;

	@Column()
	refresh_token!: string;

	@Column()
	user_id!: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: "user_id" })
	user!: User;

	@Column()
	expires_date!: Date;

	@Column()
	created_at!: Date;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}
