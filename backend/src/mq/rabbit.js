import amqp from 'amqplib';

let channel;
export const connectRabbit = async () => {
  try {
    const connection = await amqp.connect('amqp://rabbitmq');
    channel = await connection.createChannel();
    await channel.assertQueue('book_created');
    console.log('RabbitMQ connected');

    // Consumer example
    channel.consume('book_created', (msg) => {
      if (msg !== null) {
        console.log('Notification Service - New book:', msg.content.toString());
        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error('RabbitMQ error', err);
  }
};

export const publishBookCreated = (book) => {
  if (!channel) return;
  channel.sendToQueue('book_created', Buffer.from(JSON.stringify(book)));
};
