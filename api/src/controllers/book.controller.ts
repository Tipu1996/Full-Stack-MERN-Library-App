import { Request, Response, NextFunction } from 'express'
import bookServices from '../services/book.services'
import { BadRequestError } from '../helpers/apiError'

export const getByTitle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookServices.getByTitle(req.body.title))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
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

// export const addBook = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const {
//       title,
//       isbn,
//       description,
//       publisher,
//       authors,
//       status,
//       borrowerID,
//       publishDate,
//       borrowDate,
//       returnDate,
//     } = req.body

//     const book = new Book({
//       title,
//       isbn,
//       description,
//       publisher,
//       authors,
//       status,
//       borrowerID,
//       publishDate,
//       borrowDate,
//       returnDate,
//     })

//     await bookServices.addBook(book)
//     res.json(book)
//   } catch (error) {
//     if (error instanceof Error && error.name == 'ValidationError') {
//       next(new BadRequestError('Invalid Request', 400, error))
//     } else {
//       next(error)
//     }
//   }
// }
