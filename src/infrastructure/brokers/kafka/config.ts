import { Kafka } from 'kafkajs';

export const createKafkaProducer = () => {
  const kafka = new Kafka({
    clientId: 'user-service',
    brokers: ['kafka:9092'],
  });

  return kafka.producer();
};
