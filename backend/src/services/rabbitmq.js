import amqp from 'amqplib/callback_api';

export const rabbitMQService = {
  connection: null,
  channel: null,

  async connect() {
    try {
      this.connection = await amqp.connect('amqp://rabbitmq');
      this.channel = await this.connection.createChannel();
      console.log('RabbitMQ connected successfully');
    } catch (error) {
      console.error('RabbitMQ connection error:', error);
      throw error;
    }
  },

  async publish(queue, message) {
    if (!this.channel) {
      await this.connect();
    }
    
    try {
      await this.channel.assertQueue(queue, { durable: true });
      await this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      console.log(`Message sent to ${queue}`);
    } catch (error) {
      console.error('Error publishing message:', error);
      throw error;
    }
  },

  async consume(queue, callback) {
    if (!this.channel) {
      await this.connect();
    }
    
    try {
      await this.channel.assertQueue(queue, { durable: true });
      await this.channel.consume(queue, async (msg) => {
        if (msg) {
          try {
            const content = JSON.parse(msg.content.toString());
            await callback(content);
            this.channel.ack(msg);
          } catch (error) {
            console.error('Error processing message:', error);
            this.channel.nack(msg);
          }
        }
      });
    } catch (error) {
      console.error('Error consuming messages:', error);
      throw error;
    }
  },

  async close() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }
};
