import { IUserReportRepository } from '../../domain/interfaces/IUserReportRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IGetReportedUsersResult {
  userReportId: string;
  reportedUserId: string;
  reporterUserId: string;
  reason: string;
  isOtherReason: boolean;
  otherDetails: string;
}

export class GetReportedUsers
  implements IUseCase<null, IGetReportedUsersResult[]>
{
  public constructor(private readonly _userReportRepo: IUserReportRepository) {}

  public async execute(): Promise<IGetReportedUsersResult[] | Error> {
    const userReports = await this._userReportRepo.getReportedUsers();

    if (userReports instanceof Error) {
      return new Error(userReports.message);
    }

    return userReports.map((userReport) => ({
      userReportId: userReport.userReportId,
      reportedUserId: userReport.reportedUserId,
      reporterUserId: userReport.reporterUserId,
      reportedUser: userReport.reportedUser,
      reporterUser: userReport.reporterUser,
      reason: userReport.reason,
      isOtherReason: userReport.isOtherReason,
      otherDetails: userReport.otherDetails ?? '',
      createdAt: userReport.createdAt,
      updatedAt: userReport.updatedAt,
    }));
  }
}
