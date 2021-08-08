import SecureStore from 'utils/secureStore';
import { signOut } from 'reduxActions/auth/authReducer';
import { createAccessToken } from 'clients/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

type ThunkAPI = Parameters<Parameters<typeof createAsyncThunk>[1]>[1]

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