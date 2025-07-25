import { instanceToInstance } from "class-transformer";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
export class UserMap {
    static toDTO({
        id,
        name,
        email,
        driver_license,
        avatar,
        avatar_url

    }: User): IUserResponseDTO {
        const user = instanceToInstance({
            id: id!,
            name,
            email,
            driver_license,
            avatar: avatar!,
            avatar_url
        })

        return user

    }
}