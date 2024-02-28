import { randomUUID } from 'crypto';
import { generateOTP } from '../../shared/utils/generateOTP';

type emailVerification = {
  code: string;
  expiry: Date;
  isVerified: boolean;
};

type UserParams = {
  name: string;
  email: string;
  username: string;
  password: string;
  userId?: string;
  emailVerification?: emailVerification;
  profile?: string | null;
  website?: string | null;
  location?: string | null;
  bio?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  isBanned?: boolean;
};

export class User {
  name: string;
  email: string;
  username: string;
  password: string;
  userId: string;
  emailVerification: emailVerification;
  profile: string | null;
  website: string | null;
  location: string | null;
  bio: string | null;
  twitter: string | null;
  instagram: string | null;
  linkedin: string | null;
  isBanned: boolean;

  constructor({
    name,
    email,
    username,
    password,
    userId = randomUUID(),
    emailVerification = {
      code: generateOTP(),
      expiry: new Date(Date.now() + 1000 * 60 * 5),
      isVerified: false,
    },
    profile = null,
    website = null,
    location = null,
    bio = null,
    twitter = null,
    instagram = null,
    linkedin = null,
    isBanned = false,
  }: UserParams) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
    this.userId = userId;
    this.emailVerification = emailVerification;
    this.profile = profile;
    this.website = website;
    this.location = location;
    this.bio = bio;
    this.twitter = twitter;
    this.instagram = instagram;
    this.linkedin = linkedin;
    this.isBanned = isBanned;
  }
}
