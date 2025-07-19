import { ResetPasswordUserController } from "@modules/accounts/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", (request, response) => {
	sendForgotPasswordMailController.handle(request, response);
});

passwordRoutes.post("/reset", (request, response) => {
	resetPasswordUserController.handle(request, response);
});

export { passwordRoutes };
