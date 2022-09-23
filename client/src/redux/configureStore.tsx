import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./books";

const store = configureStore({
  reducer: booksReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
