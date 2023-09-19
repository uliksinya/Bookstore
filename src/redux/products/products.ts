import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

export interface BookState {
  title: string,
  subtitle?: string,
  isbn13: string,
  price: string,
  image: string,
  url?: string,
  authors?: string,
  publisher?: string;
  language?: string;
  pages?: string;
  year?: string;
  desc?: string;
}

const initialState:{
    releasedBooks: BookState[];
    foundedBooks: BookState[];
    selectedBook: BookState;
  } = {
    releasedBooks: [],
    foundedBooks: [],
    selectedBook: {
      title: "",
      isbn13: "",
      price: "",
      image: "",
    },
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

export const fetchSelectedBook = createAsyncThunk("book/fetchSelectedBook", async(bookID: string) => {
  const response = await axios.get(`https://api.itbook.store/1.0/books/${bookID || ""}`);
  console.log(response.data);
  return response.data;
})

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
      
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
        })
        .addCase(fetchSelectedBook.fulfilled, (state, action) => {
          state.selectedBook = action.payload;
        })
    }
  })  

  export const selectReleasedBooks = (state: RootState) => state.book.releasedBooks;
  export const selectFoundedBooks = (state: RootState) => state.book.foundedBooks;  
  export const selectSelectedBook = (state: RootState) => state.book.selectedBook;  
 

export default bookSlice.reducer