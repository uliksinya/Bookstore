import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isNewPasswordChanged: false,
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setNewPasswordChanged: (state, action) => {
      state.isNewPasswordChanged = action.payload;
    },
  },
});

export const { setNewPasswordChanged } = passwordSlice.actions;
export default passwordSlice.reducer;
