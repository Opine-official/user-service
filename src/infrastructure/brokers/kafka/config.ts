import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'user-service',
  brokers: ['kafka:9092'],
});

const producer = kafka.producer();
producer.connect();

export default producer;
