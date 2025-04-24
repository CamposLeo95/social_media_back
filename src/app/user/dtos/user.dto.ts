export type IUserInputCreateDTO = {
	name: string;
	email: string;
	password: string;
	admin: boolean;
	image_perfil: string;
	bio: string;
};

export type IUserInputUpdateDTO = {
	id: number;
	name?: string;
	email?: string;
	password?: string;
	admin?: boolean;
	image_perfil?: string;
	bio?: string;
};

export type IUserOutputDTO = {
	id: number;
	name: string;
	email: string;
	password: string;
	admin: boolean;
	created_at: Date;
	image_perfil?: string;
	bio?: string;
};
