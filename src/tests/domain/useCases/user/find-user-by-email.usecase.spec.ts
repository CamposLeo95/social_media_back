import type { IUserOutputDTO } from "../../../../app/user/dtos/user.dto";
import type { UserRepository } from "../../../../app/user/repositories/user.repository";
import { FindUserByEmailUseCase } from "../../../../domain/useCases/user/find-user-by-email.usecase";
import { AppError } from "../../../../shared/exceptions/AppError";

describe("find-user-by-email", () => {
	let userRepo: jest.Mocked<UserRepository>;
	let findUserByEmail: FindUserByEmailUseCase;

	beforeEach(() => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		userRepo = { findByEmail: jest.fn() } as any;
		findUserByEmail = new FindUserByEmailUseCase(userRepo);
	});

	it("should return user correctly", async () => {
		const mockedEmail = "mocked@email.com";
		const usersReturn: IUserOutputDTO = {
			id: 1,
			name: "fake",
			email: mockedEmail,
			admin: false,
			password: "@fsda#@",
			created_at: new Date(),
		};

		userRepo.findByEmail.mockResolvedValue(usersReturn);
		const result = await findUserByEmail.execute(mockedEmail);

		expect(userRepo.findByEmail).toHaveBeenCalledWith(mockedEmail);
		expect(result).toEqual(usersReturn);
	});

	it("should return 404 when user not exists", async () => {
		const appError = new AppError("Usuário não encontrado", 404);
		userRepo.findByEmail.mockRejectedValue(appError);

		await expect(
			findUserByEmail.execute("UserNotFound@email.com"),
		).rejects.toThrow(appError);
	});
});
