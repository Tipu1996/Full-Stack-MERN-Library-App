import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  // _id: mongoose.Schema.Types.ObjectId
  firstName: string
  lastName: string
  email: string
  borrowedBooks: mongoose.Schema.Types.ObjectId[]
}

const userSchema = new mongoose.Schema({
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
  borrowedBooks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Book',
    default: [],
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
