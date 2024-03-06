import { Request, Response } from 'express';
import {
  CreateUser,
  ICreateUserDTOSchema,
  ICreateUserResult,
} from '../../application/use-cases/CreateUser';
import { IController } from '../../shared/interfaces/IController';

export class CreatedUserDTO implements ICreateUserResult {
  public readonly userId: string;
  public readonly email: string;

  public constructor(id: string, email: string) {
    this.userId = id;
    this.email = email;
  }
}

export class CreateUserController implements IController {
  public constructor(private readonly _useCase: CreateUser) {}

  public async handle(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = ICreateUserDTOSchema.parse(req.body);
      req.body = validatedData;
    } catch (e: unknown) {
      res.status(400).json({ error: 'validation failed' });
      return;
    }

    const result = await this._useCase.execute({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: result.message });
      return;
    }

    const response: CreatedUserDTO = new CreatedUserDTO(
      result.userId,
      result.email,
    );

    res.status(201).json(response);
  }
}
