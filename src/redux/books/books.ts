import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import { PayloadAction } from '@reduxjs/toolkit';

export interface BookState {
  title: string;
  subtitle?: string;
  isbn13: string;
  price: string;
  image: string;
  url?: string;
  authors?: string;
  publisher?: string;
  language?: string;
  pages?: string;
  year?: string;
  desc?: string;
}

export interface FetchFoundedState {
  foundedParam: string | "";
  pageParam: string | "";
}

export interface BookSliceState {
  releasedBooks: BookState[];
  foundedBooks: BookState[];
  selectedBook: BookState;
  value: string;
  totalReleasedBooks: string; 
  totalSearchedBooks: string;
}

const initialState: BookSliceState = {
  releasedBooks: [],
  foundedBooks: [],
  selectedBook: {
    title: "",
    isbn13: "",
    price: "",
    image: "",
  },
  value: "",
  totalReleasedBooks: "", 
  totalSearchedBooks: "",
};

export const fetchBooks = createAsyncThunk("book/fetchBooks", async () => {
  const response = await axios.get("https://api.itbook.store/1.0/new");
  console.log(response);
  return {
    books: response.data.books,
    total: response.data.total
  };
}); 

export const fetchFoundedBooks = createAsyncThunk("book/fetchFoundedBooks", async({foundedParam, pageParam}: FetchFoundedState) => {
  console.log(foundedParam, pageParam);  
  const response = await axios.get(`https://api.itbook.store/1.0/search/${foundedParam}/${pageParam}`);
  console.log(response.data);
  console.log(response.data.total);
  return {
    booksSearch: response.data.books,
    totalSearch: response.data.total
  };
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
        setValue: (state, action: PayloadAction<string>) => {
          state.value = action.payload;
        },
        setTotalReleasedBooks: (state, action: PayloadAction<string>) => {
          state.totalReleasedBooks = action.payload;
        },
        // setTotalSearchedBooks: (state, action: PayloadAction<string>) => {
        //   state.totalSearchedBooks = action.payload;
        // },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBooks.fulfilled, (state, action) => {          
          state.releasedBooks = [...action.payload.books];
          state.totalReleasedBooks = action.payload.total;
        })  
        .addCase(fetchFoundedBooks.fulfilled, (state, action) => {
          if(action.payload.booksSearch !== undefined){
            state.foundedBooks = [...action.payload.booksSearch];
            state.totalSearchedBooks = action.payload.totalSearch;
          }
        })
        .addCase(fetchSelectedBook.fulfilled, (state, action) => {
          state.selectedBook = action.payload;
        })
    }
  })  

  export const selectReleasedBooks = (state: RootState) => state.book.releasedBooks;
  export const selectTotalReleasedBooks = (state: RootState) => state.book.totalReleasedBooks;
  export const selectTotalSearchedBooks = (state: RootState) => state.book.totalSearchedBooks;
  export const selectFoundedBooks = (state: RootState) => state.book.foundedBooks;  
  export const selectSelectedBook = (state: RootState) => state.book.selectedBook;  
  export const { setValue } = bookSlice.actions;
  export const selectSearchInputValue = (state: RootState) => state.book.value;

  export default bookSlice.reducer