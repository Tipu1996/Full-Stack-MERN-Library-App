import express from 'express'

import { addUser, getUsers, authUser } from '../controllers/user.controller'

const router = express.Router()

router.post('/', addUser)
router.post('/login', authUser)
router.get('/', getUsers)
export default router
