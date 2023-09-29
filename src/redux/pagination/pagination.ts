import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface PaginationState {
    pagesArray: number[];
}

const initialState: PaginationState = {
    pagesArray: [],
};

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setPagesArray: (state, action: PayloadAction<number[]>) => {
            state.pagesArray = action.payload;
        },
    },    
  })  

  export const selectPagesArray = (state: RootState) => state.pagination.pagesArray;
  export const { setPagesArray } = paginationSlice.actions; 

  export default paginationSlice.reducer;