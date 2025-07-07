import Book from '../models/Book.js';
import { redisClient } from '../cache/redis.js';
import { publishBookCreated } from '../mq/rabbit.js';

export const getBooks = async (req, res) => {
  try {
    const cached = await redisClient.get('books');
    if (cached) return res.json(JSON.parse(cached));

    const books = await Book.find();
    await redisClient.set('books', JSON.stringify(books), 'EX', 60);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const book = await Book.create({ ...req.body, createdBy: req.user._id });
    await redisClient.del('books');
    publishBookCreated(book);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Not found' });
    await redisClient.del('books');
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Not found' });
    await redisClient.del('books');
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
