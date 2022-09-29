import express from 'express'
import authCheck from '../middlewares/authCheck'

import {
  getByTitle,
  getAll,
  addBook,
  getByStatus,
  getByAuthor,
  getByCategory,
  getByIsbn,
  lendBook,
  returnBook,
} from '../controllers/book.controller'

const router = express.Router()

router.get('/', authCheck, getAll)
router.get('/title/:title', getByTitle)
router.get('/author/:author', getByAuthor)
router.get('/category/:category', getByCategory)
router.get('/isbn/:isbn', getByIsbn)
router.get('/status/:status', getByStatus)
router.get('/lend/:bookId/users/:userId', lendBook)
router.get('/return/:bookId/users/:userId', returnBook)
router.post('/', addBook)

export default router
