import { Router } from "express";
import multer from "multer";

import upload from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";

const usersRoutes = Router();

const uploadAvatar = multer(upload);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", (request, response) => {
	createUserController.handle(request, response);
});

usersRoutes.patch(
	"/avatar",
	ensureAuthenticated,
	uploadAvatar.single("avatar"),
	(request, response) => {
		updateUserAvatarController.handle(request, response);
	}
);

usersRoutes.get("/profile", ensureAuthenticated, (request, response) => {
	profileUserController.handle(request, response);
});

export { usersRoutes };
