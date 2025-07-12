import { Router } from "express";

import { AuthenticateController } from "@modules/accounts/useCases/authenticateUser/AuthenticateController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();

const authenticateController = new AuthenticateController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", (request, response) => {
	authenticateController.handle(request, response);
});

authenticateRoutes.post("/refresh-token", (request, response) => {
	refreshTokenController.handle(request, response);
});

export { authenticateRoutes };
