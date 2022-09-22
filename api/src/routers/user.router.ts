import express from 'express'

import { addUser, getUsers } from '../controllers/user.controller'

const router = express.Router()

router.post('/', addUser)
router.get('/', getUsers)

export default router
