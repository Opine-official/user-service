import { Request, Response } from 'express';
import { VerifyPasswordResetCode } from '../../application/use-cases/VerifyPasswordResetCode';
import { IController } from '../../shared/interfaces/IController';

export class VerifyPasswordResetCodeController implements IController {
  public constructor(private readonly _useCase: VerifyPasswordResetCode) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute({
      email: req.body.email,
      otp: req.body.otp,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: result.message });
      return;
    }

    res
      .status(200)
      .json({ message: 'OTP verified successfully', otp: req.body.otp });
  }
}
