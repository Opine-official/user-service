import mongoose, { Schema, InferSchemaType } from 'mongoose';

const UserAnalyticsSchema = new Schema({
  userAnalyticsId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  username: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    required: true,
  },
  lastLogout: {
    type: Date,
    required: true,
  },
  loginCount: {
    type: Number,
    required: true,
  },
  logoutCount: {
    type: Number,
    required: true,
  },
});

export type UserAnalytics = InferSchemaType<typeof UserAnalyticsSchema>;

export const UserAnalyticsModel = mongoose.model(
  'UserAnalytics',
  UserAnalyticsSchema,
);
