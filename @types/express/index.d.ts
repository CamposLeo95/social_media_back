import * as express from "express";
import type { JwtPayload } from "jsonwebtoken";

declare global {
	namespace Express {
		interface Request {
			user?: string | JwtPayload;
		}
	}
}
