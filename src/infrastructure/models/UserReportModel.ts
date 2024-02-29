import mongoose, { InferSchemaType, Schema } from 'mongoose';

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
    reportedUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reporterUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
    isUserBanned: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export type UserReport = InferSchemaType<typeof UserReportSchema>;

export const UserReportModel = mongoose.model('UserReport', UserReportSchema);
