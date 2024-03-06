import { Request, Response } from 'express';
import { IController } from '../../shared/interfaces/IController';
import { UpdateUser } from '../../application/use-cases/UpdateUser';

export class UpdateUserController implements IController {
  public constructor(private readonly _useCase: UpdateUser) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const { file } = req;

    const result = await this._useCase.execute({
      userId: req.user.userId,
      name: req.body.name,
      email: req.body.email,
      profile: file ? file : req.body.profile,
      username: req.body.username,
      website: req.body.website,
      location: req.body.location,
      bio: req.body.bio,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
      linkedin: req.body.linkedin,
    });

    if (result instanceof Error) {
      console.error(result);
      res.status(400).json({ error: result.message });
      return;
    }

    res.status(200).json({ message: 'User updated successfully' });
  }
}
