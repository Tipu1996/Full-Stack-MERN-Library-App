import { Request, Response, NextFunction } from 'express'
import userServices from '../services/user.service'
import bcrypt from 'bcrypt'
import { BadRequestError } from '../helpers/apiError'
import User from '../models/User'

// export const addUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const exists = await User.findOne({ email: req.body.email })
//     if (exists) {
//       return res
//         .status(400)
//         .send(`user with email: ${req.body.email} already registered`)
//     }
//     const { firstName, lastName, email, password, borrowedBooks } = req.body

//     const user = new User({
//       firstName,
//       lastName,
//       email,
//       password,
//       borrowedBooks,
//     })

//     await userServices.addUser(user)

//     res.send(user)
//   } catch (error) {
//     if (error instanceof Error && error.name == 'ValidationError') {
//       next(new BadRequestError('Invalid Request', 400, error))
//     } else {
//       next(error)
//     }
//   }
// }

// export const authUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // const { error } = validate(req.body)
//     // if (error) return res.status(400).send(error.details[0].message)

//     const existingUser = await User.findOne({
//       email: req.body.email,
//     })
//     if (!existingUser) return res.status(400).send('invalid email or password')

//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       existingUser.password
//     )

//     if (!validPassword) return res.status(400).send('invalid email or password')

//     // const token = existingUser.generateAuthToken()
//     // const token = jwt.sign({ _id: existingUser._id }, 'mySecret')

//     res.send()
//   } catch (error) {
//     if (error instanceof Error && error.name == 'ValidationError') {
//       next(new BadRequestError('Invalid Request', 400, error))
//     } else {
//       next(error)
//     }
//   }
// }

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

// function validate(req: Request) {
//   const schema = {
//     email: Joi.string().required.email(),
//     password: Joi.string().min(5).required.email(),
//   }
//   return Joi.validate(req, schema)
// }
