import { ITEM_SERVICE_PROTOCOL, ITEM_SERVICE_HOST, ITEM_SERVICE_PORT } from '@env'
import * as HttpHelper from 'utils/httpHelper';
import axios from 'axios';
import { SignInForm, SignUpForm } from 'models/auth';
import SecureStore from 'utils/secureStore';

const baseUrl = (ITEM_SERVICE_PORT) ? `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}:${ITEM_SERVICE_PORT}`
  : `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}`;

export async function signIn(form: SignInForm): Promise<void> {
  const request = await HttpHelper.makeRequest('POST', `${baseUrl}/user/sign-in`, form);

  try {
    const response = await axios(request);
    SecureStore.setItem('jwt', response.data.token)

  } catch (error) {
    if (error.response) {
      throw error.response.data.details || error.response.data.message;
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
      throw error.response.data.details || error.response.data.message;
    }
    throw 'Service unavailable';
  }
}
