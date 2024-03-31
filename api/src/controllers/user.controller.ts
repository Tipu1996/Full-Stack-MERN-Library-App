import { Request, Response, NextFunction } from 'express'
import userServices from '../services/user.service'
import bcrypt from 'bcrypt'
import {
  BadRequestError,
  ConflictError,
  TemporaryRedirect,
} from '../helpers/apiError'
import jwt from 'jsonwebtoken'
import { UserDocument } from '../types'
import { JWT_SECRET } from '../util/secrets'
import User from '../models/User'
import { z, ZodError } from 'zod'

export const login = (req: Request, res: Response) => {
  const user = req.user as UserDocument
  const info = req.authInfo
  const picture = user.picture
  const id = user._id.toString()
  const isAdmin = user.isAdmin
  jwt.sign(
    { userId: id, isAdmin },
    JWT_SECRET,
    {
      expiresIn: '1h',
    },
    (err, token) => {
      if (err) throw err
      res.json({ token, id, isAdmin, info, picture, user })
    }
  )
}

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await userServices.getUsers())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await userServices.getUser(req.params.userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password, code } = req.body
    if (password.length < 5) {
      throw new BadRequestError('Password must be at least 5 characters')
    }
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      code,
    })
    console.log(
      `new password: ${user.password}, verification code: ${user.code}`
    )
    const foundUser = await User.findOne({ email: user.email })
    if (foundUser)
      throw new ConflictError('Account with this email address already exists')

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(
      user.password ? user.password : '',
      salt
    )
    const hashCode = await bcrypt.hash(user.code ? user.code : '', salt)

    user.password = hashPassword
    user.code = hashCode
    // console.log(`password: ${user.password}, code: ${user.code}`)
    res.json(await userServices.signUp(user))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

const UserSignInZod = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    UserSignInZod.parse({ email, password })

    if (email.split('@')[1].split('.')[0] === 'gmail')
      throw new Error('you are signing in with gmail')

    //
    const passwordUser = await User.findOne(
      { email },
      {
        password: 1,
      }
    )
    const foundUser = await User.findOne(
      { email },
      {
        password: 0,
      }
    )
    if (!passwordUser)
      throw new ConflictError('Account with this email address does not exist')
    if (!foundUser)
      throw new ConflictError('Account with this email address does not exist')

    const check = await bcrypt.compare(
      password,
      passwordUser.password ? passwordUser.password : ''
    )
    if (!check) throw new BadRequestError('wrong email or password', 400)
    else {
      if (!foundUser.isVerified) {
        throw new TemporaryRedirect('Please Verify your Account', 307)
      }
      jwt.sign(
        { userId: foundUser._id, isAdmin: foundUser.isAdmin },
        JWT_SECRET,
        {
          expiresIn: '1h',
        },
        (err, token) => {
          if (err) throw err
          res.json({
            token,
            user: foundUser,
          })
        }
      )
    }
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ success: false, error: error.flatten() })
    } else if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, code } = req.body
    const foundUser = await User.findOne(
      { email },
      {
        email: 1,
        code: 1,
      }
    )
    if (!foundUser) {
      throw new BadRequestError('Entered Email Address is not Registered', 400)
    }
    // console.log(`email : ${email}, code: ${code}, foundUser: ${foundUser}`)

    const check = await bcrypt.compare(
      code,
      foundUser?.code ? foundUser.code : ''
    )
    if (check) res.json(await userServices.verifyUser(req.body.email))
    else throw new BadRequestError('Wrong Verification Code', 400)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const setCodeForPasswordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body
    let { code } = req.body
    const salt = await bcrypt.genSalt(10)
    code = await bcrypt.hash(code ? code : '', salt)
    res.json(await userServices.setCodeForPasswordReset(email, code))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, code } = req.body
    let { password } = req.body
    const foundUser = await User.findOne(
      { email },
      {
        email: 1,
        code: 1,
      }
    )
    if (!foundUser) {
      throw new BadRequestError('Entered Email Address is not Registered', 400)
    }

    const check = await bcrypt.compare(
      code,
      foundUser?.code ? foundUser.code : ''
    )
    if (check) {
      const salt = await bcrypt.genSalt(10)
      password = await bcrypt.hash(password ? password : '', salt)
      res.json(await userServices.resetPassword(email, password))
    } else throw new BadRequestError('Wrong Verification Code', 400)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const removeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userServices.removeUser(req.params.userId)
    if (result) res.send('user removed from DB')
    else throw new BadRequestError('Invalid Request', 400)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
