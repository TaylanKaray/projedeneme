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

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
    connectRabbit();
  })
  .catch((err) => console.error(err));
