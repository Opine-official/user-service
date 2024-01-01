import { IUserRepository } from '../interfaces/IUserRepository';
import { IUseCase } from '../../shared/interfaces/IUseCase';
import { IMessageProducer } from '../../domain/interfaces/IMessageProducer';

interface IVerifyUserEmailDTO {
  email: string;
  otp: string;
}

export class VerifyUserEmail implements IUseCase<IVerifyUserEmailDTO, void> {
  public constructor(
    private readonly _userRepo: IUserRepository,
    private readonly _messageProducer: IMessageProducer,
  ) {}

  public async execute(input: IVerifyUserEmailDTO): Promise<void | Error> {
    const result = await this._userRepo.verifyUserEmail(input.email);

    if (result instanceof Error) {
      return result;
    }

    const user = await this._userRepo.findByEmailOrUsername(input.email);

    if (!user) {
      return new Error('Kafka: user not found');
    }

    const postUser = {
      userId: user.userId,
      profile: null, // This should be user.profile in the future once we complete user profile feature.
      name: user.name,
      username: user.username,
      email: user.email,
    };

    const kafkaResult = await this._messageProducer.sendToTopic(
      'user-register-topic',
      'user-topic-1',
      JSON.stringify(postUser),
    );

    if (kafkaResult instanceof Error) {
      return kafkaResult;
    }
  }
}
