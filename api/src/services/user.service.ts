import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const addUser = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const getUsers = async (): Promise<UserDocument[]> => {
  return User.find()
    .sort({ name: 1 /*publishedYear: -1*/ })
    .populate('borrowedBooks')
}

const lendBook = async (
  bookId: string,
  userId: string
): Promise<UserDocument[]> => {
  const foundUser: any = User.findOneAndUpdate(
    { _id: userId, borrowedBooks: { $nin: [bookId] } },
    { $push: { borrowedBooks: bookId } },
    { new: true }
  )
  if (!foundUser) {
    throw new NotFoundError('Book not found')
  }
  return foundUser
}

const returnBook = async (
  bookId: string,
  userId: string
): Promise<UserDocument[]> => {
  const foundUser: any = User.findOneAndUpdate(
    { _id: userId },
    { $pull: { borrowedBooks: bookId } },
    { new: true }
  )
  if (!foundUser) {
    throw new NotFoundError('Book not found')
  }
  return foundUser
}

export default { addUser, getUsers, lendBook, returnBook }
