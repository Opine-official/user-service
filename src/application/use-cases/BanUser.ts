import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

export interface BanUserDTO {
  username: string;
}

export class BanUser implements IUseCase<BanUserDTO, void> {
  public constructor(private readonly _userRepo: IUserRepository) {}

  public async execute(input: BanUserDTO): Promise<void | Error> {
    const result = await this._userRepo.banUser(input.username);

    if (result instanceof Error) {
      return result;
    }
  }
}
