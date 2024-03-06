import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { GetRegistrationAnalytics } from '../../application/use-cases/GetRegistrationAnalytics';

export class GetRegistrationAnalyticsController implements IController {
  public constructor(private readonly _useCase: GetRegistrationAnalytics) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute();

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    res.status(200).send({
      message: 'Registration analytics retrieved successfully',
      registrationAnalytics: result,
    });
  }
}
