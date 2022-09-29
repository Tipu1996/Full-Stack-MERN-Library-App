import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import { getUsers } from '../controllers/user.controller'
import { JWT_SECRET } from '../util/secrets'
import authCheck from '../middlewares/authCheck'

const router = express.Router()

// router.post('/', addUser)
router.post(
  '/login',
  passport.authenticate('google-id-token', { session: false }),
  (req, res) => {
    const user: any = req.user
    console.log(
      'newly registered user from backend(if empty then the user is already registered): ',
      user
    )
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      JWT_SECRET,
      {
        expiresIn: '1h',
      }
    )
    res.json({ token })
  }
)
router.get('/', authCheck, getUsers)
export default router
