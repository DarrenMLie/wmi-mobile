import { createSlice } from '@reduxjs/toolkit';
import { updateLoginState, signIn, signOut } from './actions';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateLoginState.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
    })
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isAuthenticated = true;
    })
    builder.addCase(signOut.fulfilled, (state, action) => {
      state.isAuthenticated = false;
    })
    builder.addDefaultCase((state) => {
      return state;
    })
  },
})

const { reducer } = authSlice;

export default reducer;
