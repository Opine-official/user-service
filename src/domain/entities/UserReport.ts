import { randomUUID } from 'crypto';
type Reason = 'spam' | 'inappropriate' | 'hate-speech' | 'harassment' | 'other';

type UserReportParams = {
  userReportId?: string;
  reportedUserId: string;
  reporterUserId: string;
  reason: Reason;
  isOtherReason: boolean;
  otherDetails?: string;
};

export class UserReport {
  userReportId: string;
  reportedUserId: string;
  reporterUserId: string;
  reason: Reason;
  isOtherReason: boolean;
  otherDetails?: string;

  constructor({
    reportedUserId,
    reporterUserId,
    reason,
    isOtherReason,
    otherDetails,
    userReportId = randomUUID(),
  }: UserReportParams) {
    this.userReportId = userReportId;
    this.reportedUserId = reportedUserId;
    this.reporterUserId = reporterUserId;
    this.reason = reason;
    this.isOtherReason = isOtherReason;
    this.otherDetails = otherDetails;
  }
}
