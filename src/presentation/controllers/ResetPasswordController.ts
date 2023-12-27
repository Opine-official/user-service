import { Request, Response } from 'express';
import { ResetPassword } from '../../application/use-cases/ResetPassword';
import { IController } from '../../shared/interfaces/IController';

export class ResetPasswordController implements IController {
  public constructor(private readonly _useCase: ResetPassword) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute({
      email: req.body.email,
      password: req.body.password,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: result.message });
      return;
    }

    res.status(200).json({ message: 'Password changed successfully' });
  }
}
