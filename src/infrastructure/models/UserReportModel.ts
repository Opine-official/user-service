import mongoose, { InferSchemaType } from 'mongoose';

const UserReportSchema = new mongoose.Schema(
  {
    userReportId: {
      type: String,
      required: true,
    },
    reportedUserId: {
      type: String,
      required: true,
    },
    reporterUserId: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      enum: ['spam', 'inappropriate', 'hate-speech', 'harassment', 'other'],
      required: true,
    },
    isOtherReason: {
      type: Boolean,
      required: true,
    },
    otherDetails: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export type UserReport = InferSchemaType<typeof UserReportSchema>;

export const UserReportModel = mongoose.model('UserReport', UserReportSchema);
