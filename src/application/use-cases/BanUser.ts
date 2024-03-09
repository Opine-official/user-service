import { IUserReportRepository } from '../../domain/interfaces/IUserReportRepository';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

export interface BanUserDTO {
  username: string;
}

export class BanUser implements IUseCase<BanUserDTO, void> {
  public constructor(
    private readonly _userRepo: IUserRepository,
    private readonly _userReportRepo: IUserReportRepository,
  ) {}

  public async execute(input: BanUserDTO): Promise<void | Error> {
    const result = await this._userRepo.banUser(input.username);

    if (result instanceof Error) {
      return result;
    }

    const userMongoId = await this._userRepo.getMongoIdFromUsername(
      input.username,
    );

    if (userMongoId instanceof Error) {
      return userMongoId;
    }

    const changeUserStatus =
      await this._userReportRepo.changeUserStatus(userMongoId);

    if (changeUserStatus instanceof Error) {
      return changeUserStatus;
    }

    const updateTokenVersion = await this._userRepo.updateTokenVersion(result);

    if (updateTokenVersion instanceof Error) {
      return updateTokenVersion;
    }
  }
}
