import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, (request, response) => {
	createRentalController.handle(request, response);
});

rentalRoutes.post(
	"/devolution/:id",
	ensureAuthenticated,
	(request, response) => {
		devolutionRentalController.handle(request, response);
	}
);

rentalRoutes.get("/user", ensureAuthenticated, (request, response) => {
	listRentalsByUserController.handle(request, response);
});

export { rentalRoutes };
