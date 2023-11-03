import mongoose, { Document } from 'mongoose'

export enum statusType {
  available = 'available',
  borrowed = 'borrowed',
}

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

export interface TokenObject {
  userId: string
  isAdmin: boolean
  iat: number
  exp: number
}

export interface ParsedToken {
  payload: {
    email: string
    email_verified: string
    name: string
    picture: string
    given_name: string
    family_name: string
    locale: string
  }
}
export interface VerifiedCallback {
  (error: any, user?: any, info?: any): void
}

export type UserDocument = Document & {
  _id?: mongoose.Schema.Types.ObjectId
  firstName: string
  lastName: string
  email: string
  isAdmin: boolean
  picture: string
  borrowedBooks: mongoose.Schema.Types.ObjectId[]
}
