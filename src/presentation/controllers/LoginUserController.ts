import { Request, Response } from 'express';
import {
  LoginUser,
  ILoginUserResult,
} from '../../application/use-cases/LoginUser';
import { IController } from '../../shared/interfaces/IController';

export class LoginUserDTO implements ILoginUserResult {
  public readonly userId: string;
  public readonly token: string;

  public constructor(id: string) {
    this.userId = id;
  }
}

export class LoginUserController implements IController {
  public constructor(private readonly _useCase: LoginUser) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute({
      emailOrUsername: req.body.emailOrUsername,
      password: req.body.password,
    });

    if (result instanceof Error) {
      if (result.message === 'Email not verified') {
        res
          .status(401)
          .json({ error: result.message, email: req.body.emailOrUsername });
        return;
      }

      console.error(result);
      res.status(400).json({ error: 'Something went wrong' });
      return;
    }

    const response: LoginUserDTO = new LoginUserDTO(result.userId);

    res
      .cookie('userToken', result.token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .status(200)
      .json(response);
  }
}
