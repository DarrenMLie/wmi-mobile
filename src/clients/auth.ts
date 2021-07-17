import { ITEM_SERVICE_PROTOCOL, ITEM_SERVICE_HOST, ITEM_SERVICE_PORT } from '@env'
import * as HttpHelper from 'utils/httpHelper';
import axios from 'axios';
import { SignInForm } from 'models/auth';
import SecureStore from 'utils/secureStore';
import { getStore } from 'reduxActions/store';
import { updateLoginState } from 'reduxActions/auth/authActions';

class AuthClient {
  baseUrl: string;

  constructor() {
    if (ITEM_SERVICE_PORT) {
      this.baseUrl = `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}:${ITEM_SERVICE_PORT}`;
    } else {
      this.baseUrl = `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}`;
    }
  }

  async signIn(form: SignInForm): Promise<void> {
    const request = await HttpHelper.makeRequest('POST', `${this.baseUrl}/user/sign-in`, form);

    try {
      const response = await axios(request);
      SecureStore.setItem('jwt', response.data.token)

      const store = getStore();
      store.dispatch(updateLoginState(true));
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error.response.data);
      }
    }
  }
}

export default AuthClient;
