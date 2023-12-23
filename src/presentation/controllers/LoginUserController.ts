import { Request, Response } from "express";
import {
  LoginUser,
  ILoginUserResult,
} from "../../application/use-cases/LoginUser";
import { IController } from "../../shared/interfaces/IController";

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
      res.status(400).json({ error: "Something went wrong" });
      return;
    }

    res.cookie('token', result.token, { httpOnly: true });

    const response: LoginUserDTO = new LoginUserDTO(result.userId);

    res.status(200).json(response);
  }
}