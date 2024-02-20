import { UserReport } from '../../domain/entities/UserReport';
import { IUserReportRepository } from '../../domain/interfaces/IUserReportRepository';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';
import { z } from 'zod';

export const ISaveUserReportDTOSchema = z.object({
  reportedUserId: z.string(),
  reporterUserId: z.string(),
  reason: z.enum([
    'spam',
    'inappropriate',
    'hate-speech',
    'harassment',
    'other',
  ]),
  otherDetails: z.string().optional(),
});

type ISaveUserReportDTO = z.infer<typeof ISaveUserReportDTOSchema>;

export class SaveUserReport implements IUseCase<ISaveUserReportDTO, void> {
  public constructor(
    private readonly _userReportRepo: IUserReportRepository,
    private readonly _userRepo: IUserRepository,
  ) {}

  public async execute(input: ISaveUserReportDTO): Promise<void | Error> {
    const reportedUser = await this._userRepo.getMongoIdFromUserId(
      input.reportedUserId,
    );

    if (reportedUser instanceof Error) {
      return reportedUser;
    }

    const reporterUser = await this._userRepo.getMongoIdFromUserId(
      input.reporterUserId,
    );

    if (reporterUser instanceof Error) {
      return reporterUser;
    }

    const userReport = new UserReport({
      reportedUserId: input.reportedUserId,
      reporterUserId: input.reporterUserId,
      reportedUser: reportedUser,
      reporterUser: reporterUser,
      reason: input.reason,
      isOtherReason: input.reason === 'other',
      otherDetails: input.otherDetails,
    });

    return this._userReportRepo.save(userReport);
  }
}
