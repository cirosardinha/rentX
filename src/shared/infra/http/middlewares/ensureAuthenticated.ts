import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import auth from "@config/auth";

interface IPayload {
	sub: string;
}

export async function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void> {
	const authHeader: string = request.headers.authorization!;

	if (!authHeader) {
		throw new AppError("Token missing", 401);
	}

	const [, token] = authHeader!.split(" ");

	try {
		const { sub: user_id } = verify(token, auth.secret_token!) as IPayload;

		request.user = {
			id: user_id,
		};

		next();
	} catch {
		throw new AppError("Invalid token", 401);
	}
}
