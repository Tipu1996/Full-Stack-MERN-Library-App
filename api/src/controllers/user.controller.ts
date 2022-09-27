import { Request, Response, NextFunction } from 'express'
import userServices from '../services/user.service'
import { BadRequestError } from '../helpers/apiError'
import User from '../models/User'

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const exists = await User.findOne({ email: req.body.email })
    if (exists) {
      return res
        .status(400)
        .send(`user with email: ${req.body.email} already registered`)
    }
    const { firstName, lastName, email, borrowedBooks } = req.body
    const user = new User({
      firstName,
      lastName,
      email,
      borrowedBooks,
    })
    await userServices.addUser(user)
    res.send(user)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
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
