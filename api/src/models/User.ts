import mongoose, { Model, Document } from 'mongoose'

export type UserDocument = Document & {
  _id?: mongoose.Schema.Types.ObjectId
  firstName: string
  lastName: string
  email: string
  picture: string
  isAdmin: boolean
  borrowedBooks: mongoose.Schema.Types.ObjectId[]
}

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
