import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "./../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, (request, response) => {
	createCarController.handle(request, response);
});

carsRoutes.get("/available", (request, response) => {
	listAvailableCarsController.handle(request, response);
});

carsRoutes.post(
	"/specifications/:id",
	ensureAuthenticated,
	ensureAdmin,
	(request, response) => {
		createCarSpecificationController.handle(request, response);
	}
);

carsRoutes.post(
	"/images/:id",
	ensureAuthenticated,
	ensureAdmin,
	upload.array("images"),
	(request, response) => {
		uploadCarImagesController.handle(request, response);
	}
);

export { carsRoutes };
