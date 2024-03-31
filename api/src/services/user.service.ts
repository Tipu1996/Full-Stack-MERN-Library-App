import User from '../models/User'
import { BadRequestError, NotFoundError } from '../helpers/apiError'
import { UserDocument } from '../types'

const addUser = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const getUsers = async (): Promise<UserDocument[]> => {
  return await User.find({}, { password: 0 })
    .sort({ firstName: 1 })
    .populate('borrowedBooks')
}

const lendBook = async (
  bookId: string,
  userId: string
): Promise<UserDocument> => {
  const foundUser = await User.findOneAndUpdate(
    { _id: userId, borrowedBooks: { $nin: [bookId] } },
    { $push: { borrowedBooks: bookId } },
    { new: true }
  )
  if (!foundUser) {
    throw new NotFoundError('Book has already been borrowed by the user')
  }
  return foundUser
}

const returnBook = async (
  bookId: string,
  userId: string
): Promise<UserDocument> => {
  const foundUser = await User.findOneAndUpdate(
    { _id: userId, borrowedBooks: { $in: [bookId] } },
    { $pull: { borrowedBooks: bookId } },
    { new: true }
  )
  if (!foundUser) {
    throw new NotFoundError('Book is not in your borrowed list')
  }
  return foundUser
}

const getUser = async (userId: string): Promise<UserDocument | null> => {
  return await User.findOne({ _id: userId }, { password: 0 }).populate(
    'borrowedBooks'
  )
}

const signUp = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const verifyUser = async (email: string): Promise<UserDocument> => {
  const foundUser = await User.findOneAndUpdate(
    { email },
    { $set: { code: null, isVerified: true } },
    { new: true }
  )
  if (!foundUser) {
    throw new BadRequestError('Cannot Find a user with the email')
  }
  return foundUser
}

const setCodeForPasswordReset = async (
  email: string,
  code: string
): Promise<UserDocument> => {
  const foundUser = await User.findOneAndUpdate(
    { email },
    { $set: { code, isVerified: true } }
  )
  if (!foundUser) {
    throw new BadRequestError('Cannot Find a user with the email')
  }
  return foundUser
}

const resetPassword = async (
  email: string,
  password: string
): Promise<UserDocument> => {
  const foundUser = await User.findOneAndUpdate(
    { email },
    { $set: { code: null, password } }
  )
  if (!foundUser) {
    throw new BadRequestError('Cannot Find a user with the email')
  }
  return foundUser
}

const removeUser = async (userId: string): Promise<UserDocument> => {
  const success = await User.findByIdAndRemove(userId)
  if (!success) throw new NotFoundError('user not found in DB')
  return success
}

export default {
  addUser,
  getUsers,
  lendBook,
  returnBook,
  getUser,
  signUp,
  verifyUser,
  setCodeForPasswordReset,
  resetPassword,
  removeUser,
}
