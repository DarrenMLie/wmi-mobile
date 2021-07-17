import { ITEM_SERVICE_PROTOCOL, ITEM_SERVICE_HOST, ITEM_SERVICE_PORT } from '@env'
import * as HttpHelper from 'utils/httpHelper';
import axios, { AxiosResponse } from 'axios';
import { Profile } from 'models/user';

class UserClient {
  baseUrl: string;

  constructor() {
    if (ITEM_SERVICE_PORT) {
      this.baseUrl = `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}:${ITEM_SERVICE_PORT}`;
    } else {
      this.baseUrl = `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}`;
    }
  }

  async getMyProfile(): Promise<Profile> {
    const request = await HttpHelper.makeRequest('GET', `${this.baseUrl}/user/my-profile`, {});

    try {
      const response: AxiosResponse<{ profile: Profile }> = await axios(request);
      return response.data.profile;
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error.response.data);
        throw error.response.data;
      } else {
        throw 'Unknown error'
      }
    }
  }

  async updateMyProfile(form: { bio: string, firstName: string, lastName: string }): Promise<Profile> {
    const request = await HttpHelper.makeRequest('PUT', `${this.baseUrl}/user/my-profile`, form);

    try {
      const response: AxiosResponse<{ profile: Profile }> = await axios(request);
      return response.data.profile;
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error.response.data);
        throw error.response.data;
      } else {
        throw 'Unknown error'
      }
    }
  }
}

export default UserClient;
