import { ITEM_SERVICE_PROTOCOL, ITEM_SERVICE_HOST, ITEM_SERVICE_PORT } from '@env'
import * as HttpHelper from 'utils/httpHelper';
import axios, { AxiosResponse } from 'axios';
import { MetaItems } from 'models/item';

class ItemServiceClient {
  baseUrl: string;

  constructor() {
    if (ITEM_SERVICE_PORT) {
      this.baseUrl = `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}:${ITEM_SERVICE_PORT}`;
    } else {
      this.baseUrl = `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}`;
    }
  }

  getItemListUrl(): string {
    return `${this.baseUrl}/item`;
  }

  async getItemList(): Promise<MetaItems> {
    const request = await HttpHelper.makeRequest('GET', this.getItemListUrl(), null);

    try {
      const response: AxiosResponse<MetaItems> = await axios(request);

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error.response.data);
        throw error.response.data;
      } else {
        throw 'Unknown error';
      }
    }
  }
}

export default ItemServiceClient;
