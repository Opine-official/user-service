import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';

export class LogoutController implements IController {
  public async handle(req: Request, res: Response): Promise<void> {
    res.clearCookie('token');
    res.send({ message: 'Logged out' });
  }
}
