import type { IUserOutputDTO } from "../../../../../app/user/dtos/user.dto";

export const userMockedReturn: IUserOutputDTO = {
	id: 1,
	name: "fake",
	email: "fake@email.com",
	admin: false,
	password: "password",
	created_at: new Date(),
	bio: "bio",
	image_perfil: "image_path",
};
