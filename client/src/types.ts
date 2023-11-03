import mongoose from "mongoose";

export enum statusType {
  available = "available",
  borrowed = "borrowed",
}

export type Book = {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  isbn: string;
  description: string;
  publisher: string;
  authors: string[];
  categories: string[];
  status: statusType;
  borrower: null | User;
  publishDate: Date;
  borrowDate: Date | null;
  returnDate: Date | null;
};

export type TokenObject = {
  userId: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
};

type Column = {
  id:
    | "title"
    | "isbn"
    | "description"
    | "publisher"
    | "authors"
    | "categories"
    | "status"
    | "borrower"
    | "publishDate"
    | "borrowDate"
    | "returnDate";
  label: string;
  minWidth?: number;
  align?: string;
};

export const columns: readonly Column[] = [
  { id: "title", label: "Title", minWidth: 170 },
  {
    id: "isbn",
    label: "ISBN",
    minWidth: 170,
    align: "left",
  },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "left",
  },
  {
    id: "publisher",
    label: "Publisher",
    minWidth: 170,
    align: "left",
  },
  { id: "authors", label: "Authors", minWidth: 170 },
  {
    id: "categories",
    label: "Categories",
    minWidth: 170,
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "left",
  },
  {
    id: "borrower",
    label: "Borrower",
    minWidth: 170,
    align: "left",
  },
  {
    id: "publishDate",
    label: "Publish Date",
    minWidth: 170,
    align: "left",
  },
  {
    id: "borrowDate",
    label: "Borrow Date",
    minWidth: 170,
    align: "left",
  },
  {
    id: "returnDate",
    label: "Return Date",
    minWidth: 170,
    align: "left",
  },
];

export type User = {
  _id: mongoose.Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  borrowedBooks: mongoose.Schema.Types.ObjectId[] | Book[];
};
