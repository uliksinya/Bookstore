import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SearchInputValueState {
  value: string;
}

const initialState: SearchInputValueState = {
  value: '',
};

const searchInputSlice = createSlice({
  name: 'searchInputValue',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = searchInputSlice.actions;
export const selectSearchInputValue = (state: RootState) => state.searchInputValue.value;

export default searchInputSlice.reducer;
