import { Request, Response, NextFunction } from 'express'
import bookServices from '../services/book.service'
import userServices from '../services/user.service'
import { BadRequestError } from '../helpers/apiError'
import Book from '../models/Book'
import { z, ZodError } from 'zod'

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookServices.getAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const getByTitle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookServices.getByTitle(req.params.title))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const getByAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookServices.getByAuthor(req.params.author))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const getByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookServices.getByCategory(req.params.category))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const getByIsbn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookServices.getByIsbn(req.params.isbn))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const getByStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookServices.getByStatus(req.params.status))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const lendBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await bookServices.lendBook(
      req.params.bookId,
      req.params.userId
    )
    if (book !== null) {
      const user = await userServices.lendBook(
        req.params.bookId,
        req.params.userId
      )
      if (user === null) res.send('This books has already borrowed by the user')
      else {
        const return_statement = [book, user]

        res.send(return_statement)
      }
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await bookServices.returnBook(req.params.bookId)
    const user = await userServices.returnBook(
      req.params.bookId,
      req.params.userId
    )
    const return_statement = [book, user]
    res.send(return_statement)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookServices.getBook(req.params.bookId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const removeBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await bookServices.removeBook(req.params.bookId)
    if (result) res.send('book removed from DB')
    else throw new BadRequestError('Invalid Request', 400)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

const BookZod = z.object({
  title: z.string(),
  isbn: z.string(),
  description: z.string(),
  publisher: z.string(),
  authors: z.string().array(),
  categories: z.string().array(),
  status: z.enum(['borrowed', 'available']),
  borrower: z.null(),
  publishDate: z.date({
    required_error: 'Please enter a date',
    invalid_type_error: 'Invalid Date',
  }),
  borrowDate: z.null(),
  returnDate: z.null(),
})

export const addBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      isbn,
      description,
      publisher,
      authors,
      categories,
      status,
      borrower,
      borrowDate,
      returnDate,
    } = req.body
    let { publishDate } = req.body
    publishDate = new Date(Date.parse(publishDate))
    const book = new Book({
      title,
      isbn,
      description,
      publisher,
      authors,
      categories,
      status,
      borrower,
      publishDate,
      borrowDate,
      returnDate,
    })
    try {
      BookZod.parse(book)
      await bookServices.addBook(book)
      res.json(book)
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ success: false, error: error.flatten() })
      } else next(error)
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const addAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId
    const authors = req.body.author
    res.json(await bookServices.addAuthor(bookId, authors))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const removeAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId
    const authors = req.body.author
    res.json(await bookServices.removeAuthor(bookId, authors))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
