import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerification: {
      type: {
        code: {
          type: String,
          required: true,
        },
        expiry: {
          type: Date,
          required: true,
        },
        isVerified: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
      required: true,
    },
    passwordResetCode: {
      type: String,
      required: false,
    },
    profile: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    twitter: {
      type: String,
      required: false,
    },
    instagram: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
    isBanned: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model('User', UserSchema);
