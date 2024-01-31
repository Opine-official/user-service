import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IGetUserByUsernameDTO {
  username: string;
}

interface IGetUserByUsernameResult {
  userId: string;
  name: string;
  email: string;
  profile: string | null;
  username: string;
  website: string | null;
  location: string | null;
  bio: string | null;
  twitter: string | null;
  instagram: string | null;
  linkedin: string | null;
}

export class GetUserByUsername
  implements IUseCase<IGetUserByUsernameDTO, IGetUserByUsernameResult>
{
  public constructor(private readonly _userRepo: IUserRepository) {}

  public async execute(
    input: IGetUserByUsernameDTO,
  ): Promise<IGetUserByUsernameResult | Error> {
    const user = await this._userRepo.getUserByUsername(input.username);

    if (user instanceof Error) {
      return user;
    }

    if (!user) {
      return new Error('User not found');
    }

    return {
      userId: user.userId,
      name: user.name,
      email: user.email,
      profile: user.profile,
      username: user.username,
      website: user.website,
      location: user.location,
      bio: user.bio,
      twitter: user.twitter,
      instagram: user.instagram,
      linkedin: user.linkedin,
    };
  }
}
