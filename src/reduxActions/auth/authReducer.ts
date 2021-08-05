import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn as signInApi } from 'clients/auth';
import { SignInForm, SignUpForm } from 'models/auth';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (form: SignInForm, thunkAPI) => {
    try {
      await signInApi(form);
    } catch (e) {
      throw e;
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isAuthenticated = true;
    })
  },
})

const { actions, reducer } = authSlice;

export const { logout } = actions;

export default reducer;
