import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import mongoose from "mongoose";
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
  bookToAdd?: object | null;
  jwtToken?: string | null;
  bookId?: mongoose.Schema.Types.ObjectId | null;
}

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async ({ searchBy, url, jwtToken }: asyncObject) => {
    if (searchBy === "getAll") {
      return axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((response) => response.data);
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
  async ({ searchBy, url, bookId, bookToAdd }: asyncObject) => {
    if (searchBy === "addBook") {
      return axios.post(url, bookToAdd).then((response) => response.data);
    } else if (searchBy === "removeBook") {
      console.log(`${url}removebook/${bookId}`);
      return axios
        .post(`url/removebook/${bookId}`, {})
        .then((response) => response.data);
    }
  }
);

export const removeBook = createAsyncThunk(
  "books/removeBook",
  async ({ searchBy, url, bookId }: asyncObject) => {
    if (searchBy === "removeBook") {
      return axios
        .post(`${url}/removebook/${bookId}`, {})
        .then((response) => response.data);
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
    builder.addCase(removeBook.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(removeBook.fulfilled, (state, action) => {
      let index = state.list.indexOf(action.payload);
      if (index !== -1) {
        state.list.splice(index, 1);
      }
      state.status = "success";
    });
    builder.addCase(removeBook.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
  },
});

export default slice.reducer;
