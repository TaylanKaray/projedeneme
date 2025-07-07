import express from 'express';
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getBooks).post(protect, createBook);
router.route('/:id').get(getBook).put(protect, updateBook).delete(protect, deleteBook);

export default router;
