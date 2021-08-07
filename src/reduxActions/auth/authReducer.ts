import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn as signInApi } from 'clients/auth';
import { SignInForm } from 'src/models/auth';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (form: SignInForm, api) => {
    try {
      await signInApi(form);
    } catch(e) {
      return api.rejectWithValue(e);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    updateLoginState(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isAuthenticated = true;
    })
  },
})

const { actions, reducer } = authSlice;

export const { updateLoginState } = actions;

export default reducer;
