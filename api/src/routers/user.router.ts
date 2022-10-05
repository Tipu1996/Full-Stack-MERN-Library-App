import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import { getUsers } from '../controllers/user.controller'
import { JWT_SECRET } from '../util/secrets'
import adminCheck from '../middlewares/adminCheck'

const router = express.Router()

router.post(
  '/login',
  passport.authenticate('google-id-token', { session: false }),
  (req, res) => {
    const user: any = req.user
    const info: any = req.authInfo
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
export default router
