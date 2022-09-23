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

export const getBooks = createAsyncThunk("books/getBooks", async () => {
  return axios
    .get("http://localhost:4000/api/v1/books/")
    .then((response) => response.data);
});

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
      // console.log(Object.values(state.list[0].currencies))
    });
    builder.addCase(getBooks.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
  },
});

export default slice.reducer;
