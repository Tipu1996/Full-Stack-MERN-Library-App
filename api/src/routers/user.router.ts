import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { getUser, getUsers } from '../controllers/user.controller'
import { JWT_SECRET } from '../util/secrets'
import adminCheck from '../middlewares/adminCheck'
import authCheck from '../middlewares/authCheck'
import { UserDocument } from '../types'

const router = express.Router()

router.post(
  '/login',
  passport.authenticate('google-id-token', { session: false }),
  (req, res) => {
    const user = req.user as UserDocument
    const info = req.authInfo
    const picture = user.picture
    const id = user._id.toString()
    const isAdmin = user.isAdmin
    const token = jwt.sign({ userId: id, isAdmin }, JWT_SECRET, {
      expiresIn: '10m',
    })

    res.json({ token, id, isAdmin, info, picture, user })
  }
)
router.get('/', adminCheck, getUsers)
router.get('/user/:userId', authCheck, getUser)
export default router
