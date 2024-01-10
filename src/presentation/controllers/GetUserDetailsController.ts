import { Request, Response } from 'express';
import { GetUserDetails } from '../../application/use-cases/GetUserDetails';
import { IController } from '../../shared/interfaces/IController';

export class GetUserDetailsController implements IController {
  public constructor(private readonly _useCase: GetUserDetails) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const userId = req.user.userId;
    const result = await this._useCase.execute({ userId });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: result.message });
      return;
    }

    res.status(200).json(result);
  }
}
