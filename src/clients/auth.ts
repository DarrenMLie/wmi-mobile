import { ITEM_SERVICE_PROTOCOL, ITEM_SERVICE_HOST, ITEM_SERVICE_PORT } from '@env'
import * as HttpHelper from 'utils/httpHelper';
import axios, { AxiosResponse } from 'axios';
import { SignInForm, SignUpForm } from 'models/auth';
import SecureStore from 'utils/secureStore';

const baseUrl = (ITEM_SERVICE_PORT) ? `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}:${ITEM_SERVICE_PORT}`
  : `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}`;

export async function signIn(form: SignInForm): Promise<void> {
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

export async function signUp(form: SignUpForm): Promise<void> {
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

export async function createAccessToken(): Promise<string> {
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
