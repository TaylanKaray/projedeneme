import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email exists' });
    const user = await User.create({ email, password });
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Generate reset token
    const resetToken = user.generatePasswordResetToken();
    await user.save();
    
    // Store reset token in Redis with expiration
    const resetTokenKey = `passwordReset:${resetToken}`;
    await redisClient.set(resetTokenKey, user.id, 'EX', 3600); // 1 hour expiration
    
    // Publish message to RabbitMQ for email service
    await rabbitMQService.publish('password_reset', {
      type: 'reset_password',
      email: user.email,
      resetToken,
      userId: user._id
    });
    
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
