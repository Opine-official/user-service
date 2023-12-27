import { Request, Response } from 'express';
import { ResendOTP } from '../../application/use-cases/ResendOTP';
import { IController } from '../../shared/interfaces/IController';

export class ResendOTPController implements IController {
  public constructor(private readonly _useCase: ResendOTP) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute({
      email: req.body.email,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: result.message });
      return;
    }

    res.status(200).json({ success: true });
  }
}