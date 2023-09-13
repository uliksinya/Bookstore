import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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

const initialState: BookState[] = [];

export const fetchBooks = createAsyncThunk("book/fetchBooks", async () => {
    const response = await axios.get("https://api.itbook.store/1.0/new");
    console.log(response.data.books);
    return response.data.books;
}); 

export const fetchFoundedBooks = createAsyncThunk("book/fetchFoundedBooks", async(searchParams: string|undefined) => {
    const response = await axios.get(`https://api.itbook.store/1.0/search/?${searchParams || ""}`);
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
        return [...action.payload];
    })
    .addCase(fetchFoundedBooks.fulfilled, (state, action) => {
        console.log(...action.payload);
        return [...action.payload];
    })
  }
})

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export const selectBooks = (state: RootState) => state.book; 

export default bookSlice.reducer