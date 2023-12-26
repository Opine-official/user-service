import { IUserRepository } from '../interfaces/IUserRepository';
import { hashPassword } from '../../shared/utils/hashPassword';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IResetPasswordDTO {
  email: string;
  password: string;
}
export class ResetPassword implements IUseCase<IResetPasswordDTO, void> {
  public constructor(private readonly _userRepo: IUserRepository) {}

  public async execute(input: IResetPasswordDTO): Promise<Error | void> {
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
