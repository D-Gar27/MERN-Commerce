import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      admin: localStorage.getItem('dk') || null,
      token: localStorage.getItem('x_3') || null,
      userID: null,
    },
    fetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.fetching = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.fetching = false;
    },
    loginFailure: (state) => {
      state.error = true;
      state.fetching = false;
    },
  },
});

export const { loginFailure, loginStart, loginSuccess } = userSlice.actions;
export default userSlice.reducer;
