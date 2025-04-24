import type { UserRepository } from "../../../../app/user/repositories/user.repository";
import { CreateUserUseCase } from "../../../../domain/useCases/user/create-user.usecase";
import { AppError } from "../../../../shared/exceptions/AppError";
import { hashPassword } from "../../../../shared/utils/bcryptPassword";

jest.mock("../../../../shared/utils/bcryptPassword", () => ({
	// Tipando corretamente como jest.MockedFunction
	hashPassword: jest.fn() as jest.MockedFunction<typeof hashPassword>,
}));

describe("create-user-usecase", () => {
	let userRepo: jest.Mocked<UserRepository>;
	let createUserUseCase: CreateUserUseCase;

	beforeEach(() => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		userRepo = { create: jest.fn() } as any;
		createUserUseCase = new CreateUserUseCase(userRepo);
	});

	it("should be create a new user with a hash password", async () => {
		jest.mocked(hashPassword).mockResolvedValue("hashed_password");

		const userInputDTO = {
			name: "Leonardo Campos",
			email: "leocampos@email.com",
			password: "123456",
			admin: false,
			image_perfil: "url_da_imagem_perfil",
			image_cover: "url_da_imagem_cover",
			bio: "Bio do usuário",
		};

		await createUserUseCase.execute(userInputDTO);

		expect(hashPassword).toHaveBeenCalledWith("123456");
		expect(userRepo.create).toHaveBeenCalledWith({
			...userInputDTO,
			password: "hashed_password",
		});
	});

	it("should be return a error if something is wrong", async () => {
		jest
			.mocked(hashPassword)
			.mockRejectedValueOnce(new Error("Erro ao criptografar"));

		const userInputDTO = {
			name: "John Doe",
			email: "johndoe@email.com",
			password: "123456",
			admin: false,
			image_perfil: "url_da_imagem_perfil",
			image_cover: "url_da_imagem_cover",
			bio: "Bio do usuário",
		};

		await expect(createUserUseCase.execute(userInputDTO)).rejects.toThrow(
			new AppError("Erro interno no servidor", 500),
		);
	});
});
