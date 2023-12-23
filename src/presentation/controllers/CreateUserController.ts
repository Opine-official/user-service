import { Request, Response } from "express";
import {
  CreateUser,
  ICreateUserResult,
} from "../../application/use-cases/CreateUser";
import { IController } from "../../shared/interfaces/IController";

export class CreatedUserDTO implements ICreateUserResult {
  public readonly userId: string;

  public constructor(id: string) {
    this.userId = id;
  }
}

export class CreateUserController implements IController {
  public constructor(private readonly _useCase: CreateUser) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    if (result instanceof Error) {
      res.status(400).json({ error: result.message });
      return;
    }

    const response: CreatedUserDTO = new CreatedUserDTO(result.userId);

    res.status(201).json(response);
  }
}