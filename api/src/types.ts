import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  password: string | null
  isAdmin: boolean
  isVerified: boolean
  code: string | null
  picture: string
  borrowedBooks: mongoose.Schema.Types.ObjectId[]
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

export enum statusType {
  available = 'available',
  borrowed = 'borrowed',
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
