import type { User as UserRaw } from "@prisma/client";
import type { IUserOutputDTO } from "../../../../app/user/dtos/user.dto";
import type { User } from "../../../../domain/entities/user/user.entity";

interface IPrismaCreate {
	name: string;
	email: string;
	admin: boolean;
	password: string;
	image_perfil: string | null;
	bio: string | null;
}
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class PrismaUserMapper {
	static toPrisma(props: Omit<User, "id" | "created_at">): IPrismaCreate {
		return {
			name: props.getName,
			email: props.getEmail,
			admin: props.getAdmin,
			password: props.getPassword,
			image_perfil: props.getImage_perfil,
			bio: props.getBio,
		};
	}

	static toDomain(props: UserRaw): IUserOutputDTO {
		return {
			id: props.id,
			name: props.name,
			email: props.email,
			admin: props.admin || false,
			password: props.password || "",
			image_perfil: props.image_perfil ?? "",
			created_at: props.created_at || new Date(),
			bio: props.bio ?? "",
		};
	}
}
