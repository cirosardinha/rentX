import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";

const categoriesRoutes = Router();

const upload = multer({
	dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post(
	"/",
	ensureAuthenticated,
	ensureAdmin,
	(request, response) => {
		createCategoryController.handle(request, response);
	}
);

categoriesRoutes.get("/", (request, response) => {
	listCategoriesController.handle(request, response);
});

categoriesRoutes.post(
	"/import",
	ensureAuthenticated,
	ensureAdmin,
	upload.single("file"),
	(request, response) => {
		importCategoryController.handle(request, response);
	}
);

export { categoriesRoutes };
