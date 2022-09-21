import express from 'express'

import { getByTitle, getAll } from '../controllers/book.controller'

const router = express.Router()

router.get('/title', getByTitle)
router.get('/', getAll)
// router.post('/', addBook)

export default router
