import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Book } from "types";

const url = "http://localhost:4000/api/v1";

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("jwtToken");
    if (token) config.headers!["Authorization"] = "Bearer " + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export interface booksState {
  list: Book[];
  cartList: Book[];
  book: Book | null;
  numberInCart: number;
  status: string;
}

const initialState: booksState = {
  list: [],
  cartList: [],
  book: null,
  numberInCart: 0,
  status: "",
};

interface asyncObject {
  searchBy?: string;
  search?: string;
  bookToAdd?: Book | null;
  bookId?: string | null;
}

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async ({ search, searchBy }: asyncObject) => {
    if (searchBy === "getAll") {
      return axios.get(`${url}/books/`).then((response) => response.data);
    } else if (searchBy === "getByTitle") {
      return axios
        .get(`${url}/books/title/${search}`)
        .then((response) => response.data);
    } else if (searchBy === "getByIsbn") {
      return axios
        .get(`${url}/books/isbn/${search}`)
        .then((response) => response.data);
    } else if (searchBy === "getByAuthor") {
      return axios
        .get(`${url}/books/author/${search}`)
        .then((response) => response.data);
    } else if (searchBy === "getByStatus") {
      return axios
        .get(`${url}/books/status/${search}`)
        .then((response) => response.data);
    } else if (searchBy === "getByCategory") {
      return axios
        .get(`${url}/books/category/${search}`)
        .then((response) => response.data);
    }
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async ({ bookToAdd }: asyncObject, { rejectWithValue }) => {
    return axios
      .post(`${url}/books/`, bookToAdd)
      .then((response) => response.data)
      .catch((error) => {
        return rejectWithValue(error.response.data);
      });
  }
);

export const removeBook = createAsyncThunk(
  "books/removeBook",
  async ({ bookId }: asyncObject) => {
    return axios
      .delete(`${url}/books/${bookId}`, {})
      .then((response) => response.data);
  }
);

export const addAuthor = createAsyncThunk(
  "books/addAuthor",
  async ({ bookId, author }: { bookId: string; author: string }) => {
    return axios
      .post(`${url}/books/authors/${bookId}`, { author })
      .then((response) => response.data);
  }
);

export const getBook = createAsyncThunk(
  "books/getBook",
  async ({ bookId }: { bookId: string }) => {
    return axios
      .get(`${url}/books/${bookId}`)
      .then((response) => response.data);
  }
);

export const removeAuthor = createAsyncThunk(
  "books/removeAuthor",
  async ({ bookId, author }: { bookId: string; author: string }) => {
    return axios
      .put(`${url}/books/author/${bookId}`, { author })
      .then((response) => response.data);
  }
);

export const lendBook = createAsyncThunk(
  "books/lendBook",
  async ({ bookId, userId }: { bookId: string; userId: string }) => {
    return axios
      .get(`${url}/books/lend/${bookId}/user/${userId}`)
      .then((response) => response.data);
  }
);

export const returnBook = createAsyncThunk(
  "books/returnBook",
  async ({ bookId, userId }: { bookId: string; userId: string }) => {
    return axios
      .get(`${url}/books/return/${bookId}/user/${userId}`)
      .then((response) => response.data);
  }
);

const slice = createSlice({
  name: "books",
  initialState,
  reducers: {
    reduxInitialState: (state) => {
      state.list = [];
      state.status = "";
    },
    addedToCart: (state, action) => {
      state.cartList.push(action.payload);
      state.numberInCart++;
    },
    removedFromCart: (state, action) => {
      const index = state.cartList.indexOf(action.payload);
      state.cartList.splice(index, 1);
      state.numberInCart--;
    },
    clearedCart: (state) => {
      state.cartList = [];
      state.numberInCart = 0;
    },
  },
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
    builder.addCase(addBook.rejected, (state, action) => {
      console.log("Something went wrong", action.payload);
      state.status = "failed";
    });
    builder.addCase(getBook.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getBook.fulfilled, (state, action) => {
      state.book = action.payload;
      state.status = "success";
    });
    builder.addCase(getBook.rejected, (state) => {
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
    builder.addCase(addAuthor.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addAuthor.fulfilled, (state, action) => {
      const index = state.list.findIndex(
        (object) => object._id === action.payload._id
      );
      if (index !== -1) {
        state.list.splice(index, 1, action.payload);
      }
      state.status = "success";
    });
    builder.addCase(addAuthor.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
    builder.addCase(removeAuthor.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(removeAuthor.fulfilled, (state, action) => {
      const index = state.list.findIndex(
        (object) => object._id === action.payload._id
      );
      if (index !== -1) {
        state.list.splice(index, 1, action.payload);
      }
      state.status = "success";
    });
    builder.addCase(removeAuthor.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
    builder.addCase(lendBook.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(lendBook.fulfilled, (state, action) => {
      const index = state.list.findIndex(
        (object) => object._id === action.payload[0]._id
      );
      if (index !== -1) {
        state.list.splice(index, 1, action.payload[0]);
      }
      state.status = "success";
    });
    builder.addCase(lendBook.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
    builder.addCase(returnBook.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(returnBook.fulfilled, (state, action) => {
      const index = state.list.findIndex(
        (object) => object._id === action.payload[0]._id
      );
      if (index !== -1) {
        state.list.splice(index, 1, action.payload[0]);
      }
      state.status = "success";
    });
    builder.addCase(returnBook.rejected, (state) => {
      console.log("Something went wrong");
      state.status = "failed";
    });
  },
});

export default slice.reducer;

export const { reduxInitialState, addedToCart, removedFromCart, clearedCart } =
  slice.actions;
