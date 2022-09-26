import mongoose, { Document } from 'mongoose'
import { statusType } from '../types'

export type BookDocument = Document & {
  title: string
  isbn: string
  description: string
  publisher: string
  authors: string[]
  categories: string[]
  status: statusType
  borrower: mongoose.Schema.Types.ObjectId | null
  publishDate: Date
  borrowDate: Date | null
  returnDate: Date | null
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
  categories: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'available',
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  borrowDate: {
    type: Date,
    default: null,
  },
  returnDate: {
    type: Date,
    default: null,
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
