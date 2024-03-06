import { Request, Response } from 'express';
import { GetUserByUsername } from '../../application/use-cases/GetUserByUsername';
import { IController } from '../../shared/interfaces/IController';

export class GetUserByUsernameController implements IController {
  public constructor(private readonly _useCase: GetUserByUsername) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const username = req.params.username;
    const result = await this._useCase.execute({ username });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: result.message });
      return;
    }

    res.status(200).json(result);
  }
}
