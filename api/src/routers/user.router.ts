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
    const info: any = req.authInfo
    // console.log('reached this stage: ', user._id)
    const id = user._id.toString()
    const isAdmin = user.isAdmin
    const token = jwt.sign({ userId: id, isAdmin }, JWT_SECRET, {
      expiresIn: '10m',
    })

    res.json({ token, id, isAdmin, info })
  }
)
router.get('/', authCheck, getUsers)
export default router
