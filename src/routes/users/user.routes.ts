import { Router } from "express";
import multer from "multer";
import type { UsersControllers } from "../../app/user/controller/user.controller";

export class UsersRoutes {
	private routes: Router;
	private storage = multer.memoryStorage();
	private upload = multer({ storage: this.storage });
	constructor(private userController: UsersControllers) {
		this.routes = Router();
		this.setupRoutes();
	}

	private setupRoutes() {
		this.routes.get(
			"/users",
			this.userController.findAllUsers.bind(this.userController),
		);
		this.routes.get(
			"/users/:id",
			this.userController.findUsersById.bind(this.userController),
		);
		this.routes.post(
			"/users",
			this.upload.single("image_perfil"),
			this.userController.create.bind(this.userController),
		);
		this.routes.put(
			"/users/:id",
			this.upload.single("image_perfil"),
			this.userController.update.bind(this.userController),
		);
		this.routes.delete(
			"/users/:id",
			this.userController.delete.bind(this.userController),
		);
	}

	public getRoutes() {
		return this.routes;
	}
}
