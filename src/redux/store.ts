import { configureStore } from '@reduxjs/toolkit'
import book from "./books/books";
import pagination from './pagination/pagination';

export const store = configureStore({
  reducer: {book, pagination}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;