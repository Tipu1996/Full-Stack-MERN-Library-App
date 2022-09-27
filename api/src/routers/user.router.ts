import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import { addUser, getUsers } from '../controllers/user.controller'
import User, { UserDocument } from '../models/User'
import { JWT_SECRET } from '../util/secrets'

const router = express.Router()

router.post('/', addUser)
router.post(
  '/login',
  passport.authenticate('google-id-token', { session: false }),
  (req, res) => {
    // let user = req.user as any
    const user = req.user as any
    const token = jwt.sign(
      { userId: user._id, role: user.isAdmin },
      JWT_SECRET,
      { expiresIn: '1h' }
    )
    res.header('x-authentication-token', token).json({ msg: 'done' })
  }
)
router.get('/', getUsers)
export default router
