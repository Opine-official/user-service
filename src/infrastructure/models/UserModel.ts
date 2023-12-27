import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
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
});

export const UserModel = mongoose.model('User', UserSchema);
