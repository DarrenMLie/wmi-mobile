import { ITEM_SERVICE_PROTOCOL, ITEM_SERVICE_HOST, ITEM_SERVICE_PORT } from '@env'
import * as HttpHelper from 'utils/httpHelper';
import axios from 'axios';
import { SignInForm } from 'models/auth';
import SecureStore from 'utils/secureStore';

class AuthClient {
  baseUrl: string;

  constructor() {
    if (ITEM_SERVICE_PORT) {
      this.baseUrl = `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}:${ITEM_SERVICE_PORT}`;
    } else {
      this.baseUrl = `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}`;
    }
  }

  signInUrl(): string {
    return `${this.baseUrl}/user/sign-in`;
  }

  async signIn(form: SignInForm): Promise<void> {
    const request = HttpHelper.makeRequest('POST', this.signInUrl(), form);

    try {
      const response = await axios(request); 
      SecureStore.setItem('jwt', response.data.token)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  }
}

export default AuthClient;
