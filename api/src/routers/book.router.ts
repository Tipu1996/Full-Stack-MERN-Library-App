import express from 'express'
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
  removeBook,
  addAuthor,
  removeAuthor,
  getBook,
} from '../controllers/book.controller'
import adminCheck from '../middlewares/adminCheck'
import passport from 'passport'

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), getAll)

router.get(
  '/title/:title',
  passport.authenticate('jwt', { session: false }),
  getByTitle
)

router.get(
  '/author/:author',
  passport.authenticate('jwt', { session: false }),
  getByAuthor
)
router.get(
  '/category/:category',
  passport.authenticate('jwt', { session: false }),
  getByCategory
)
router.get(
  '/isbn/:isbn',
  passport.authenticate('jwt', { session: false }),
  getByIsbn
)
router.get(
  '/status/:status',
  passport.authenticate('jwt', { session: false }),
  getByStatus
)
router.get(
  '/lend/:bookId/user/:userId',
  passport.authenticate('jwt', { session: false }),
  lendBook
)
router.get(
  '/return/:bookId/user/:userId',
  passport.authenticate('jwt', { session: false }),
  returnBook
)
router.get(
  '/:bookId',
  passport.authenticate('jwt', { session: false }),
  getBook
)
router.delete(
  '/:bookId',
  passport.authenticate('jwt', { session: false }),
  removeBook
)
router.post(
  '/',
  adminCheck,
  passport.authenticate('jwt', { session: false }),
  addBook
)
router.post(
  '/authors/:bookId',
  adminCheck,
  passport.authenticate('jwt', { session: false }),
  addAuthor
)
router.put(
  '/author/:bookId',
  adminCheck,
  passport.authenticate('jwt', { session: false }),
  removeAuthor
)

export default router
