import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

export interface BookState {
    title: string,
    subtitle?: string,
    isbn13?: string,
    price: string,
    image: string,
    url?: string,
}

const initialState:{
    releasedBooks: BookState[];
    foundedBooks: BookState[];
  } = {
    releasedBooks: [],
    foundedBooks: [],
  };

export const fetchBooks = createAsyncThunk("book/fetchBooks", async () => {
    const response = await axios.get("https://api.itbook.store/1.0/new");
    // console.log(response.data.books);
    return response.data.books;
}); 

export const fetchFoundedBooks = createAsyncThunk("book/fetchFoundedBooks", async(params: string|undefined) => {
    const response = await axios.get(`https://api.itbook.store/1.0/search/${params || ""}`);
    console.log(response.data.books);
    return response.data;
})

// ... (ваш импорт и начальные настройки)

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
      // Здесь вы можете добавить свои дополнительные редукторы, если они понадобятся в будущем.
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBooks.fulfilled, (state, action) => {
          state.releasedBooks = [...action.payload];
        })
        .addCase(fetchFoundedBooks.fulfilled, (state, action) => {
            if(action.payload.books !== undefined){
                state.foundedBooks = [...action.payload.books];
            }
        });
    }
  })
  
  export const selectReleasedBooks = (state: RootState) => state.book.releasedBooks;
  export const selectFoundedBooks = (state: RootState) => state.book.foundedBooks;  

export default bookSlice.reducer