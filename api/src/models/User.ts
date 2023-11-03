import mongoose from 'mongoose'
import { UserDocument } from '../types'

const userSchema = new mongoose.Schema<UserDocument>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  picture: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  borrowedBooks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Book',
    default: [],
  },
})

const User = mongoose.model<UserDocument>('User', userSchema)

export default User
