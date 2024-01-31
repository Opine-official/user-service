import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { S3UploadService } from '../../infrastructure/s3/S3UploadService';
import { IUseCase } from '../../shared/interfaces/IUseCase';

interface IUpdateUserDTO {
  userId: string;
  name: string;
  email: string;
  profile: string | Express.Multer.File;
  username: string;
  website: string | null;
  location: string | null;
  bio: string | null;
  twitter: string | null;
  instagram: string | null;
  linkedin: string | null;
}

export class UpdateUser implements IUseCase<IUpdateUserDTO, void> {
  public constructor(
    private readonly _userRepo: IUserRepository,
    private readonly _s3UploadService: S3UploadService,
  ) {}

  public async execute(input: IUpdateUserDTO): Promise<void | Error> {
    const user = await this._userRepo.findById(input.userId);

    if (!user) {
      return new Error('User not found');
    }

    let profile;

    if (typeof input.profile === 'string') {
      profile = input.profile;
    } else {
      profile = await this._s3UploadService.uploadProfilePicture(input.profile);
    }

    if (profile instanceof Error) {
      return profile;
    }

    user.name = input.name;
    user.email = input.email;
    user.profile = profile;
    user.username = input.username;
    user.website = input.website;
    user.location = input.location;
    user.bio = input.bio;
    user.twitter = input.twitter;
    user.instagram = input.instagram;
    user.linkedin = input.linkedin;

    const result = await this._userRepo.update(user);

    if (result instanceof Error) {
      return result;
    }

    return result;
  }
}
