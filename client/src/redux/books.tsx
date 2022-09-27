import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Book } from "types";

export interface booksState {
  list: Book[];
  status: string;
}

const initialState: booksState = {
  list: [],
  status: "",
};

interface asyncObject {
  searchBy: string;
  url: string;
  bookToAdd: object | null;
}

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async ({ searchBy, url, bookToAdd }: asyncObject) => {
    if (searchBy === "getAll") {
      return axios.get(url).then((response) => response.data);
    } else if (searchBy === "getByTitle") {
      return axios.get(url).then((response) => response.data);
    } else if (searchBy === "getByAuthor") {
      return axios.get(url).then((response) => response.data);
    } else if (searchBy === "getByStatus") {
      return axios.get(url).then((response) => response.data);
    } else if (searchBy === "getByCategory") {
      return axios.get(url).then((response) => response.data);
    }
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async ({ searchBy, url, bookToAdd }: asyncObject) => {
    if (searchBy === "addBook") {
      return axios.post(url, bookToAdd).then((response) => response.data);
    }
  }
);

const slice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.list = action.payload;
      state.status = "success";
    });
    builder.addCase(getBooks.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
    builder.addCase(addBook.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.list.push(action.payload);
      state.status = "success";
    });
    builder.addCase(addBook.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
  },
});

export default slice.reducer;
