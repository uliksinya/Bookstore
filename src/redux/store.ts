import { configureStore } from '@reduxjs/toolkit'
import book from "./books/books"
import searchInputValue from "./searchValue/searchValue"

export const store = configureStore({
  reducer: {book, searchInputValue}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;