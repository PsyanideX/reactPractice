import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    userLogged: '',
  },
  reducers: {
    loggedIn: (state, action) => {
      state.userLogged = action.payload;
    },
    loggedOut: state => {
      state.userLogged = '';
    },
  },
});

export const { loggedIn, loggedOut } = loginSlice.actions;
export const selectLogin = state => state.login.userLogged;
export default loginSlice.reducer;
