import Book, { BookDocument } from '../models/Book'
import { NotFoundError } from '../helpers/apiError'

const getAll = async (): Promise<BookDocument[]> => {
  return Book.find().sort({ name: 1 /*publishedYear: -1*/ })
}

const getByTitle = async (title: string): Promise<BookDocument[]> => {
  return Book.find({ title: title }).sort({ name: 1 /*publishedYear: -1*/ })
}

// const addBook = async (book: BookDocument): Promise<BookDocument> => {
//   return book.save()
// }

export default { getAll, getByTitle }
