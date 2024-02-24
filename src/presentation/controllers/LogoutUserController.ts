import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { LogoutUser } from '../../application/use-cases/LogoutUser';

export class LogoutUserController implements IController {
  public constructor(private readonly _useCase: LogoutUser) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute({
      userId: req.user,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.send({ message: 'Logged out' });
  }
}
