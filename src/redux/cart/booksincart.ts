import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { favBookType } from '../../api/types';
  
const initialState: favBookType[] = [];
  
export const booksInCartSlice = createSlice({
    name: 'booksInCart',
    initialState,
    reducers: {
      addBookToCartStore: (state, action: PayloadAction<favBookType>) => {
        const { isbn13 } = action.payload;
        const isBookAlreadyAdded = state.some(book => book.isbn13 === isbn13);
        
        if (!isBookAlreadyAdded) {
            state.push(action.payload);
        }
      },  
      removeBooksFromCartStore: (state, action: PayloadAction<string>) => {
        const index = state.findIndex(book => book.isbn13 === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }    
        } 
    }       
});
  
export const { addBookToCartStore, removeBooksFromCartStore } = booksInCartSlice.actions;
export const selectBooksInCartStore = (state: RootState) => state.booksInCart;
  
export default booksInCartSlice.reducer;
  