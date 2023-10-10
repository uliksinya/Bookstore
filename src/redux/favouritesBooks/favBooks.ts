import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { favBookType } from '../../api/types';
  
const initialState: favBookType[] = [];
  
export const favBookSlice = createSlice({
    name: 'favBooks',
    initialState,
    reducers: {
      addFavouriteBook: (state, action: PayloadAction<favBookType>) => {
        console.log('добавить книгу');
        state.push(action.payload);
      },
      removeFavouriteBook: (state, action: PayloadAction<string>) => {
        const index = state.findIndex(book => book.isbn13 === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }    
        }    
    }       
});
  
export const { addFavouriteBook, removeFavouriteBook } = favBookSlice.actions;
export const selectFavouriteBooks = (state: RootState) => state.favBooks;
  
export default favBookSlice.reducer;
  