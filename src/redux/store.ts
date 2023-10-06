import { configureStore } from '@reduxjs/toolkit'
import book from "./books/books";
import pagination from './pagination/pagination';
import favBooks from './favouritesBooks/favBooks';

export const store = configureStore({
  reducer: {book, pagination, favBooks}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;