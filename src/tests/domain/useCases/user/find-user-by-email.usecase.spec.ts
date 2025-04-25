import type { UserRepository } from "../../../../app/user/repositories/user.repository";
import { FindUserByEmailUseCase } from "../../../../domain/useCases/user/find-user-by-email.usecase";
import { AppError } from "../../../../shared/exceptions/AppError";
import { userMockedReturn } from "./mocks/user.mocks";

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
		const userReturn = userMockedReturn;
		userReturn.email = mockedEmail;

		userRepo.findByEmail.mockResolvedValue(userReturn);
		const result = await findUserByEmail.execute(mockedEmail);

		expect(userRepo.findByEmail).toHaveBeenCalledWith(mockedEmail);
		expect(result).toEqual(userReturn);
	});

	it("should return 404 when user not exists", async () => {
		const appError = new AppError("Usuário não encontrado", 404);
		userRepo.findByEmail.mockRejectedValue(appError);

		await expect(
			findUserByEmail.execute("UserNotFound@email.com"),
		).rejects.toThrow(appError);
	});
});
