import { IUserRepository } from '../interfaces/IUserRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IGetUserDetailsDTO {
  userId: string;
}

interface IGetUserDetailsResult {
  userId: string;
  name: string;
  email: string;
  profile: string | null;
  username: string;
}

export class GetUserDetails
  implements IUseCase<IGetUserDetailsDTO, IGetUserDetailsResult>
{
  public constructor(private readonly _userRepo: IUserRepository) {}

  public async execute(
    input: IGetUserDetailsDTO,
  ): Promise<IGetUserDetailsResult | Error> {
    const user = await this._userRepo.findById(input.userId);

    if (!user) {
      return new Error('User not found');
    }

    return {
      userId: user.userId,
      name: user.name,
      email: user.email,
      profile: user.profile,
      username: user.username,
    };
  }
}
