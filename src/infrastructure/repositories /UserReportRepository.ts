import { UserReportModel } from '../models/UserReportModel';
import { IUserReportRepository } from '../../domain/interfaces/IUserReportRepository';
import { UserReport } from '../../domain/entities/UserReport';

export class UserReportRepository implements IUserReportRepository {
  public async get(userReportId: string): Promise<UserReport | Error> {
    try {
      const userReportDocument = await UserReportModel.findById(userReportId);

      if (!userReportDocument) {
        throw new Error('UserReport not found');
      }

      const result = new UserReport({
        userReportId: userReportDocument.userReportId,
        reportedUserId: userReportDocument.reportedUserId,
        reporterUserId: userReportDocument.reporterUserId,
        reportedUser: userReportDocument.reportedUser as unknown as string,
        reporterUser: userReportDocument.reporterUser as unknown as string,
        reason: userReportDocument.reason,
        isOtherReason: userReportDocument.isOtherReason,
        otherDetails: userReportDocument.otherDetails ?? '',
      });

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async save(userReport: UserReport): Promise<void | Error> {
    try {
      const userReportDocument = new UserReportModel(userReport);
      await userReportDocument.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async update(userReport: UserReport): Promise<void | Error> {
    try {
      await UserReportModel.findByIdAndUpdate(
        userReport.userReportId,
        userReport,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async delete(userReportId: string): Promise<void | Error> {
    try {
      await UserReportModel.findByIdAndDelete(userReportId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async getReportedUsers(): Promise<UserReport[] | Error> {
    try {
      const userReportDocuments = await UserReportModel.find()
        .populate('reportedUser', 'username -_id')
        .populate('reporterUser', 'username -_id');

      const result = userReportDocuments.map(
        (userReportDocument) =>
          new UserReport({
            userReportId: userReportDocument.userReportId,
            reportedUserId: userReportDocument.reportedUserId,
            reporterUserId: userReportDocument.reporterUserId,
            reportedUser: userReportDocument.reportedUser as unknown as string,
            reporterUser: userReportDocument.reporterUser as unknown as string,
            reason: userReportDocument.reason,
            isOtherReason: userReportDocument.isOtherReason,
            otherDetails: userReportDocument.otherDetails ?? '',
          }),
      );

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }
}
