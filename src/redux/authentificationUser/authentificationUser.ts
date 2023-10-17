import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store'

const initialState = {
  user: null, 
};

const userSlice = createSlice({
  name: 'authentificationUser',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectAuthUser = (state: RootState) => state.authentificationUser;

export default userSlice.reducer;
