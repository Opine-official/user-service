import { MessageProducer } from '../../../domain/interfaces/MessageProducer';
import producer from './config';

export class KafkaMessageProducer implements MessageProducer {
  async sendToTopic(topic: string, message: string): Promise<void> {
    const kafkaMessage = {
      key: 'user_registered',
      value: JSON.stringify(message),
    };

    await producer.send({
      topic: topic,
      messages: [kafkaMessage],
    });
  }
}
