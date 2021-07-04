import { ITEM_SERVICE_PROTOCOL, ITEM_SERVICE_HOST, ITEM_SERVICE_PORT } from '@env'
import * as HttpHelper from 'utils/httpHelper';
import axios, { AxiosResponse } from 'axios';
import { MetaItems, Item } from 'models/item';

class ItemServiceClient {
  baseUrl: string;

  constructor() {
    if (ITEM_SERVICE_PORT) {
      this.baseUrl = `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}:${ITEM_SERVICE_PORT}`;
    } else {
      this.baseUrl = `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}`;
    }
  }

  async getItemList(): Promise<MetaItems> {
    const request = await HttpHelper.makeRequest('GET', `${this.baseUrl}/item`, null);

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

  async getItem(id: number): Promise<Item> {
    const request = await HttpHelper.makeRequest('GET', `${this.baseUrl}/item/${id}`, null);

    try {
      const response: AxiosResponse<{ item: Item }> = await axios(request);
      return response.data.item;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw 'Unknown error';
      }
    }
  }
}

export default ItemServiceClient;
