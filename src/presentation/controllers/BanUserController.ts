import { Request, Response } from 'express';
import { BanUser } from '../../application/use-cases/BanUser';
import { IController } from '../../shared/interfaces/IController';

export class BanUserController implements IController {
  public constructor(private readonly _useCase: BanUser) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute({
      username: req.body.username,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: result.message });
      return;
    }

    res.status(204).json();
  }
}
