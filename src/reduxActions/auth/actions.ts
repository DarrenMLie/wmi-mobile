import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignInForm, SignUpForm } from 'models/auth';
import SecureStore from 'utils/secureStore';
import { ITEM_SERVICE_PROTOCOL, ITEM_SERVICE_HOST, ITEM_SERVICE_PORT } from '@env'
import * as HttpHelper from 'utils/httpHelper';
import axios from 'axios';

const baseUrl = (ITEM_SERVICE_PORT) ? `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}:${ITEM_SERVICE_PORT}`
  : `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}`;

export async function signInApi(form: SignInForm): Promise<void> {
  const request = await HttpHelper.makeRequest('POST', `${baseUrl}/user/sign-in`, form);

  try {
    const response = await axios(request);
    SecureStore.setItem('access-token', response.data.accessToken);
    SecureStore.setItem('refresh-token', response.data.refreshToken);

  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw 'Service unavailable';
  }
}

export async function signUpApi(form: SignUpForm): Promise<void> {
  const request = await HttpHelper.makeRequest('POST', `${baseUrl}/user/sign-up`, form);
  try {
    await axios(request);
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw 'Service unavailable';
  }
}


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

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (form: SignUpForm, api) => {
    try {
      await signUpApi(form);
    } catch(e) {
      return api.rejectWithValue(e);
    }
  },
)

export const signOut = createAsyncThunk(
  'auth/signOut',
  async () => {
    await SecureStore.deleteItem('access-token');
    await SecureStore.deleteItem('refresh-token');
  }
);