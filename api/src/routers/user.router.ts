import express from 'express'
import passport from 'passport'
import verfCode from '../middlewares/verfCode'
import {
  getUser,
  getUsers,
  login,
  removeUser,
  resetPassword,
  setCodeForPasswordReset,
  signIn,
  signUp,
  verifyUser,
} from '../controllers/user.controller'
import adminCheck from '../middlewares/adminCheck'
import initialCheck from '../middlewares/initialCheck'

const router = express.Router()

router.get(
  '/',
  adminCheck,
  passport.authenticate('jwt', { session: false }),
  getUsers
)

router.get(
  '/user/:userId',
  passport.authenticate('jwt', { session: false }),
  getUser
)

router.post(
  '/login',
  passport.authenticate('google-id-token', { session: false }),
  login
)

router.post('/signup', initialCheck, verfCode, signUp)

router.post('/signin', signIn)

router.post('/user/setCodeForPasswordReset', verfCode, setCodeForPasswordReset)

router.post('/user/resetPassword', initialCheck, resetPassword)

router.post('/verify', initialCheck, verifyUser)

router.delete('/:userId', adminCheck, removeUser)

export default router
