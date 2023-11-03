import Book, { BookDocument } from '../models/Book'
import { NotFoundError } from '../helpers/apiError'

const getAll = async (): Promise<BookDocument[]> => {
  return Book.find().sort({ title: 1 }).populate('borrower')
}

const getByTitle = async (title: string): Promise<BookDocument[]> => {
  const foundBook = Book.find({ title: title }).sort({
    name: 1 /*publishedYear: -1*/,
  })
  if (!foundBook) {
    throw new NotFoundError(`Book titled: ${title} not found`)
  }

  return foundBook
}

const getByAuthor = async (author: string): Promise<BookDocument[]> => {
  const foundBook = Book.find({ authors: { $all: [author] } }).sort({
    name: 1 /*publishedYear: -1*/,
  })
  if (!foundBook) {
    throw new NotFoundError(`Books authored: ${author} not found`)
  }

  return foundBook
}

const getByCategory = async (category: string): Promise<BookDocument[]> => {
  const foundBook = Book.find({ categories: { $all: [category] } }).sort({
    name: 1 /*publishedYear: -1*/,
  })
  if (!foundBook) {
    throw new NotFoundError(`Books of category: ${category} not found`)
  }

  return foundBook
}

const getByIsbn = async (isbn: string): Promise<BookDocument[]> => {
  const foundBook = Book.find({ isbn: isbn }).sort({
    name: 1 /*publishedYear: -1*/,
  })
  if (!foundBook) {
    throw new NotFoundError(`Book with ISBN: ${isbn} not found`)
  }

  return foundBook
}

const getByStatus = async (status: string): Promise<BookDocument[]> => {
  const foundBook = Book.find({ status: status }).sort({
    name: 1 /*publishedYear: -1*/,
  })
  if (!foundBook && status === 'borrowed') {
    throw new NotFoundError('There are no Books that are available')
  } else if (!foundBook && status === 'available') {
    throw new NotFoundError('There are no Books that are borrowed')
  }
  return foundBook
}

const lendBook = async (
  bookId: string,
  userId: string
): Promise<BookDocument> => {
  const foundBook = await Book.findOneAndUpdate(
    { _id: bookId, status: { $eq: 'available' } },
    {
      $set: {
        borrower: userId,
        status: 'borrowed',
        borrowDate: new Date(),
        returnDate: null,
      },
    },
    { new: true }
  )
  if (!foundBook) {
    throw new NotFoundError('Book not found')
  }
  return foundBook
}

const returnBook = async (bookId: string): Promise<BookDocument> => {
  const foundBook = await Book.findOneAndUpdate(
    { _id: bookId, status: { $eq: 'borrowed' } },
    {
      $set: {
        borrower: null,
        status: 'available',
        borrowDate: null,
        returnDate: new Date(),
      },
    },
    { new: true }
  )
  if (!foundBook) {
    throw new NotFoundError('Book not found')
  }
  return foundBook
}

const removeBook = async (bookId: string): Promise<BookDocument> => {
  const success = await Book.findByIdAndRemove(bookId)
  if (!success) throw new NotFoundError('Book not found')
  return success
}

const addBook = async (book: BookDocument): Promise<BookDocument> => {
  return book.save()
}

const addAuthor = async (
  bookId: string,
  authors: string
): Promise<BookDocument> => {
  const authorlist = authors.split('_')
  const updatedBook = await Book.findOneAndUpdate(
    { _id: bookId },
    {
      $addToSet: {
        authors: authorlist,
      },
    },
    { new: true }
  )
  if (!updatedBook) {
    throw new NotFoundError('Book not found')
  }
  return updatedBook
}

const removeAuthor = async (
  bookId: string,
  authors: string
): Promise<BookDocument> => {
  const authorlist = authors.split('_')
  const updatedBook = await Book.findOneAndUpdate(
    { _id: bookId },
    {
      $pull: {
        authors: { $in: authorlist },
      },
    },
    { new: true }
  )
  if (!updatedBook) {
    throw new NotFoundError('Book not found')
  }
  return updatedBook
}

export default {
  getAll,
  getByTitle,
  getByAuthor,
  getByCategory,
  getByIsbn,
  getByStatus,
  lendBook,
  returnBook,
  removeBook,
  addBook,
  addAuthor,
  removeAuthor,
}
