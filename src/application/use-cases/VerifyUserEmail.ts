import { IUserRepository } from "../interfaces/IUserRepository";
import { IUseCase } from "../../shared/IUseCase";

interface IVerifyUserEmailDTO {
  email: string;
  otp: string;
}

export class VerifyUserEmail implements IUseCase<IVerifyUserEmailDTO, void> {
  public constructor(private readonly _userRepo: IUserRepository) {}

  public async execute(input: IVerifyUserEmailDTO): Promise<void | Error> {
    const result = await this._userRepo.verifyUserEmail(input.email);

    if (result instanceof Error) {
      return result;
    }
  }
}
