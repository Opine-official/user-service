import { IUserRepository } from '../interfaces/IUserRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IUpdateUserDTO {
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

export class UpdateUser implements IUseCase<IUpdateUserDTO, void> {
  public constructor(private readonly _userRepo: IUserRepository) {}

  public async execute(input: IUpdateUserDTO): Promise<void | Error> {
    const user = await this._userRepo.findById(input.userId);

    if (!user) {
      return new Error('User not found');
    }

    user.name = input.name;
    user.email = input.email;
    user.profile = input.profile;
    user.username = input.username;
    user.website = input.website;
    user.location = input.location;
    user.bio = input.bio;
    user.twitter = input.twitter;
    user.instagram = input.instagram;
    user.linkedin = input.linkedin;

    return await this._userRepo.update(user);
  }
}
