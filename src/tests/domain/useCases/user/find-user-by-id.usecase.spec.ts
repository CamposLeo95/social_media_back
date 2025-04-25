import type { IUserOutputDTO } from "../../../../app/user/dtos/user.dto";
import type { UserRepository } from "../../../../app/user/repositories/user.repository";
import { FindUserByIdUseCase } from "../../../../domain/useCases/user/find-user-by-id.usecase";
import { AppError } from "../../../../shared/exceptions/AppError";
import { userMockedReturn } from "./mocks/user.mocks";

describe("find-user-by-id", () => {
	let userRepo: jest.Mocked<UserRepository>;
	let findUserByIdUseCase: FindUserByIdUseCase;

	beforeEach(() => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		userRepo = { findById: jest.fn() } as any;
		findUserByIdUseCase = new FindUserByIdUseCase(userRepo);
	});

	it("should return the correctly user by id", async () => {
		const userReturn: IUserOutputDTO = userMockedReturn;

		userRepo.findById.mockResolvedValue(userReturn);

		const result = await findUserByIdUseCase.execute(userReturn.id);

		expect(userRepo.findById).toHaveBeenCalledWith(1);
		expect(result).toEqual(userReturn);
	});

	it("should return 404 when user not exists", async () => {
		const appError = new AppError("Usuário não encontrado", 404);
		userRepo.findById.mockRejectedValue(appError);

		await expect(findUserByIdUseCase.execute(3872)).rejects.toThrow(
			"Usuário não encontrado",
		);
	});
});
