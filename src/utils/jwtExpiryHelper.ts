import { ITEM_SERVICE_PROTOCOL, ITEM_SERVICE_HOST, ITEM_SERVICE_PORT } from '@env'
import * as HttpHelper from 'utils/httpHelper';
import axios, { AxiosResponse } from 'axios';
import SecureStore from 'utils/secureStore';
import { signOut } from 'reduxActions/auth/actions';
import { createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = (ITEM_SERVICE_PORT) ? `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}:${ITEM_SERVICE_PORT}`
  : `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}`;

type ThunkAPI = Parameters<Parameters<typeof createAsyncThunk>[1]>[1]

async function createAccessToken(): Promise<string> {
  const token = await SecureStore.getItem('refresh-token');
  const request = await HttpHelper.makeRequest('POST', `${baseUrl}/access-token`, { refreshToken: token });
  try {
    const res: AxiosResponse<{ accessToken: string }> = await axios(request);
    return res.data.accessToken;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw 'Service unavailable';
  }
}

export async function execute(api: ThunkAPI, callback: (...funcArgs: any) => Promise<any>): Promise<any> {
  try {
    return await callback();
  } catch(e) {
    if (e.code !== 'jwt-expired') {
      return api.rejectWithValue(e);
    }
  }

  try {
    const jwt = await createAccessToken();
    await SecureStore.setItem('access-token', jwt);
  } catch(e) {
    api.dispatch(signOut());
    throw e;
  }

  return callback();
}