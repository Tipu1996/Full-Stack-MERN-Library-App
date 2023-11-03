import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./books";
import userReducer from "./users";

const store = configureStore({
  reducer: { books: booksReducer, users: userReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
