import { UserReport } from '../../domain/entities/UserReport';
import { IUserReportRepository } from '../../domain/interfaces/IUserReportRepository';
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
  public constructor(private readonly _userReportRepo: IUserReportRepository) {}

  public async execute(input: ISaveUserReportDTO): Promise<void | Error> {
    const userReport = new UserReport({
      reportedUserId: input.reportedUserId,
      reporterUserId: input.reporterUserId,
      reason: input.reason,
      isOtherReason: input.reason === 'other',
      otherDetails: input.otherDetails,
    });

    return this._userReportRepo.save(userReport);
  }
}
