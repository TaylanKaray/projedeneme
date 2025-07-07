import { rabbitMQService } from '../services/rabbitmq.js';
import { emailService } from '../services/emailService.js';

export const startEmailWorker = async () => {
  try {
    await rabbitMQService.connect();
    
    // Consume password reset messages
    await rabbitMQService.consume('password_reset', async (message) => {
      try {
        const { email, resetToken } = message;
        await emailService.sendResetPasswordEmail(email, resetToken);
        console.log('Password reset email sent successfully');
      } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error;
      }
    });

    // Consume other email types
    // await rabbitMQService.consume('user_registration', async (message) => {
    //   // Handle user registration emails
    // });

    console.log('Email worker started');
  } catch (error) {
    console.error('Error starting email worker:', error);
    process.exit(1);
  }
};
