export interface MessageProducer {
  sendToTopic(topic: string, message: string): Promise<void>;
}
