import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import { BadRequestError, ConflictError } from '../helpers/apiError'

const initialCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, code } = req.body
    if (!code) {
      if (password) {
        const foundUser = await User.findOne({ email })
        if (foundUser)
          if (foundUser.password)
            throw new ConflictError(
              'Account with this email address already exists'
            )
          else
            throw new ConflictError(
              'Account with this email address already exists through sign in with Google'
            )
      }
    }
    const regexExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi

    if (!regexExp.test(email)) {
      throw new BadRequestError('Enter an email address')
    }
    if (email.split('@')[1].split('.')[0] === 'gmail')
      throw new Error(
        'you are entering a gmail address; use sign in with google feature'
      )
    return next()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export default initialCheck
