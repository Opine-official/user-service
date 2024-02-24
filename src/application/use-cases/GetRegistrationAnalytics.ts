import { IUserAnalyticsRepository } from '../../domain/interfaces/IUserAnalyticsRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IGetRegistrationAnalyticsResult {
  count: number;
  values: {
    date: Date;
    username: string;
    userId: string;
  }[];
}

export class GetRegistrationAnalytics
  implements IUseCase<null, IGetRegistrationAnalyticsResult>
{
  public constructor(
    private readonly _userAnalyticsRepo: IUserAnalyticsRepository,
  ) {}

  public async execute(): Promise<IGetRegistrationAnalyticsResult | Error> {
    const registrationAnalytics =
      await this._userAnalyticsRepo.getRegistrationAnalytics();

    if (registrationAnalytics instanceof Error) {
      return new Error(registrationAnalytics.message);
    }

    return registrationAnalytics;
  }
}
