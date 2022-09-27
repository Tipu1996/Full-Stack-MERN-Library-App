import mongoose, { Model, Document } from 'mongoose'
import jwt from 'jsonwebtoken'

export type UserDocument = Document & {
  _id?: mongoose.Schema.Types.ObjectId
  firstName: string
  lastName: string
  email: string
  isAdmin: boolean
  borrowedBooks: mongoose.Schema.Types.ObjectId[]
}

// interface UserToken extends Model<UserDocument> {
//   generateAuthToken(): string
// }

// type UserModel = Model<UserDocument, UserToken>

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

// userSchema.method('generateAuthToken', function generateAuthToken() {
//   return jwt.sign({ _id: this._id }, 'mySecret')
// })

const User = mongoose.model<UserDocument>('User', userSchema)

export default User
