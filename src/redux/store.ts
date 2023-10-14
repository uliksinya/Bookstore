import { configureStore } from '@reduxjs/toolkit'
import book from "./books/books";
import pagination from './pagination/pagination';
import favBooks from './favouritesBooks/favBooks';
import booksInCart from './cart/booksincart';
import authentificationUser from './authentificationUser/authentificationUser';

export const store = configureStore({
  reducer: {book, pagination, favBooks, booksInCart, authentificationUser}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;