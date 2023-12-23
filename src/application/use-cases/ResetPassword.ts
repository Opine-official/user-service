import { IUserRepository } from "../interfaces/IUserRepository";
import { hashPassword } from "../../shared/utils/hashPassword";
import { IUseCase } from "../../shared/interfaces/IUseCase";

interface IResetPasswordDTO {
  emailOrUsername: string;
  password: string;
}

export class ResetPassword implements IUseCase<IResetPasswordDTO, void> {
  public constructor(private readonly _userRepo: IUserRepository) {}

  public async execute(input: IResetPasswordDTO): Promise<Error | void> {
    const hashedPassword = await hashPassword(input.password);

    const resetPasswordResult = await this._userRepo.resetPassword(
      input.emailOrUsername,
      hashedPassword
    );

    if (resetPasswordResult instanceof Error) {
      return resetPasswordResult;
    }
  }
}