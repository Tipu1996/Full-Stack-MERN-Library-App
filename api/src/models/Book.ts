import mongoose from 'mongoose'
import { BookDocument, statusType } from '../types'

const bookSchema = new mongoose.Schema<BookDocument>({
  title: {
    type: String,
    required: true,
    unique: true,
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
    enum: Object.values(statusType),
    required: true,
    default: statusType.available,
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
