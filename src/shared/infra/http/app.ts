import "reflect-metadata";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
dotenv.config();
import upload from "@config/upload";

import { AppError } from "@shared/errors/AppError";

import "@shared/infra/typeorm/data-source";

import "@shared/container";

import swaggerFile from "../../../swagger.json";

import { router } from "./routes";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use(
	(
		err: AppError,
		request: Request,
		response: Response,
		next: NextFunction
	): void => {
		if (err instanceof AppError) {
			response.status(err.statusCode).json({ message: err.message });
		}

		response.status(500).json({
			status: "error",
			message: `Internal server error - ${err.message}`,
		});
	}
);

export { app };
