import { Request, Response } from 'express';
import { InitiatePasswordReset } from '../../application/use-cases/InitiatePasswordReset';
import { IController } from '../../shared/interfaces/IController';

export class InitiatePasswordResetController implements IController {
  public constructor(private readonly _useCase: InitiatePasswordReset) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute({
      email: req.body.email,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: result.message });
      return;
    }

    res.status(200).json({ message: 'OTP sent successfully' });
  }
}
