import { IUseCase } from '../../shared/interfaces/IUseCase';
import { IUserRepository } from '../interfaces/IUserRepository';
import { generateOTP } from '../../shared/utils/generateOTP';
import { EmailService } from '../../infrastructure/email/EmailService';

interface IResendOtpDTO {
  email: string;
}

interface IResendOTPResult {
  success: boolean;
}

export class ResendOTP implements IUseCase<IResendOtpDTO, IResendOTPResult> {
  public constructor(
    private _userRepo: IUserRepository,
    private _emailService: EmailService,
  ) {}

  public async execute(
    input: IResendOtpDTO,
  ): Promise<IResendOTPResult | Error> {
    const otp = generateOTP();

    const saveEmailVerificationCodeResult =
      await this._userRepo.saveEmailVerificationCode(input.email, otp);

    if (saveEmailVerificationCodeResult instanceof Error) {
      return saveEmailVerificationCodeResult;
    }

    const emailResult = await this._emailService.send(input.email, otp);

    if (emailResult instanceof Error) {
      return emailResult;
    }

    return { success: true };
  }
}
