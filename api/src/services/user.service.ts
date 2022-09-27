import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'
import { response } from 'express'

const addUser = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const getUsers = async (): Promise<UserDocument[]> => {
  return User.find()
    .sort({ firstName: 1 /*publishedYear: -1*/ })
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

export default { addUser, getUsers, lendBook, returnBook }
