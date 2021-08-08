import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn as signInApi } from 'clients/auth';
import { SignInForm } from 'src/models/auth';
import SecureStore from 'utils/secureStore';

export const updateLoginState = createAsyncThunk(
  'auth/updateLoginState',
  async () => {
    const token = await SecureStore.getItem('access-token');
    return { isAuthenticated: token !== null };
  }
);

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

export const signOut = createAsyncThunk(
  'auth/signOut',
  async () => {
    await SecureStore.deleteItem('access-token');
    await SecureStore.deleteItem('refresh-token');
  }
);

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
  },
})

const { reducer } = authSlice;

export default reducer;
