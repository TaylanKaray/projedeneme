import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import bookRoutes from './src/routes/bookRoutes.js';
import { connectRabbit } from './src/mq/rabbit.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'Backend running' }));
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 5000;

const startServer = () => {
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
};

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB connected');
      connectRabbit();
      startServer();
    })
    .catch((err) => {
      console.error('MongoDB connection failed', err);
      startServer(); // continue to serve API endpoints that don't need DB
    });
} else {
  console.warn('MONGO_URI not set — starting server without DB');
  startServer();
}
