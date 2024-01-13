import { IUserRepository } from '../interfaces/IUserRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IVerifyPasswordResetCodeDTO {
  email: string;
  otp: string;
}

export class VerifyPasswordResetCode
  implements IUseCase<IVerifyPasswordResetCodeDTO, void>
{
  public constructor(private readonly _userRepo: IUserRepository) {}

  public async execute(
    input: IVerifyPasswordResetCodeDTO,
  ): Promise<void | Error> {
    const result = await this._userRepo.verifyPasswordResetCode(
      input.email,
      input.otp,
    );

    if (result instanceof Error) {
      return result;
    }
  }
}
