import { IUserRepository } from '../interfaces/IUserRepository';
import { hashPassword } from '../../shared/utils/hashPassword';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IResetPasswordDTO {
  otp: string;
  email: string;
  password: string;
}
export class ResetPassword implements IUseCase<IResetPasswordDTO, void> {
  public constructor(private readonly _userRepo: IUserRepository) {}

  public async execute(input: IResetPasswordDTO): Promise<Error | void> {
        const verifyOTPResult = await this._userRepo.verifyPasswordResetCode(
      input.email,
      input.otp,
    );

    if (verifyOTPResult instanceof Error) {
      return verifyOTPResult;
    }

    const hashPasswordResult = await hashPassword(input.password);

    if (hashPasswordResult instanceof Error) {
      return hashPasswordResult;
    }

    const resetPasswordResult = await this._userRepo.resetPassword(
      input.email,
      hashPasswordResult,
    );

    if (resetPasswordResult instanceof Error) {
      return resetPasswordResult;
    }
  }
}
