import { IUserAnalyticsRepository } from '../../domain/interfaces/IUserAnalyticsRepository';

interface LogoutUserDTO {
  userId: string;
}

export class LogoutUser {
  constructor(
    private readonly userAnalyticsRepository: IUserAnalyticsRepository,
  ) {}

  async execute(input: LogoutUserDTO): Promise<void | Error> {
    const result = await this.userAnalyticsRepository.updateLogout(
      input.userId,
    );

    if (result instanceof Error) {
      return result;
    }
  }
}
