import mongoose, { Document } from 'mongoose'
import { statusType } from '../types'

export type BookDocument = Document & {
  title: string
  isbn: string
  description: string
  publisher: string
  authors: string[]
  status: statusType
  borrowerID: mongoose.Schema.Types.ObjectId | null
  publishDate: string
  borrowDate: string | null
  returnDate: string | null
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  borrowerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  publishDate: {
    type: String,
    required: true,
  },
  borrowDate: {
    type: String,
    default: null,
  },
  returnDate: {
    type: String,
    default: null,
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
