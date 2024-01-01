import { IMessageProducer } from '../../../domain/interfaces/IMessageProducer';
import { createKafkaProducer } from './config';

export class KafkaMessageProducer implements IMessageProducer {
  constructor(private producer = createKafkaProducer()) {
    this.producer.connect();
  }

  async sendToTopic(
    topic: string,
    key: string,
    message: string,
  ): Promise<void | Error> {
    const kafkaMessage = {
      key: key,
      value: JSON.stringify(message),
    };

    try {
      await this.producer.send({
        topic: topic,
        messages: [kafkaMessage],
      });
    } catch (error) {
      return new Error(`Failed to send message to Kafka: ${error}`);
    }
  }
}
