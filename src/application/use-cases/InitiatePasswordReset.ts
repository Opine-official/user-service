import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';
import { EmailService } from '../../infrastructure/email/EmailService';
import { generateOTP } from '../../shared/utils/generateOTP';

interface IInitiatePasswordResetDTO {
  email: string;
}

export class InitiatePasswordReset
  implements IUseCase<IInitiatePasswordResetDTO, void>
{
  public constructor(
    private readonly _userRepo: IUserRepository,
    private readonly _emailService: EmailService,
  ) {}

  public async execute(
    input: IInitiatePasswordResetDTO,
  ): Promise<void | Error> {
    const otp = generateOTP();

    const result = await this._userRepo.savePasswordResetCode(input.email, otp);

    if (result instanceof Error) {
      return result;
    }

    const emailResult = await this._emailService.send(input.email, otp);

    if (emailResult instanceof Error) {
      return emailResult;
    }
  }
}
