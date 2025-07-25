import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { ProfileUserUseCase } from "./ProfileUserUseCase";

export class ProfileUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.user;

            const profileUserUseCase = container.resolve(ProfileUserUseCase);

            const user = await profileUserUseCase.execute(id);

            return response.status(200).json(user);
        } catch (error) {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({ message: error.message });
            }
            return response.status(500).json({ message: "Internal server error" });
        }
    }
}