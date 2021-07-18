import { ITEM_SERVICE_PROTOCOL, ITEM_SERVICE_HOST, ITEM_SERVICE_PORT } from '@env'
import * as HttpHelper from 'utils/httpHelper';
import axios, { AxiosResponse } from 'axios';
import { MetaItems, Item } from 'models/item';
import { getStore } from 'reduxActions/store';
import { receiveItems, updateItem } from 'reduxActions/item/itemActions';

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
      const store = getStore();
      store.dispatch(receiveItems(response.data.results));
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

  async createItem(form: { name: string, notes: string }): Promise<Item> {
    const request = await HttpHelper.makeRequest('POST', `${this.baseUrl}/item`, form);

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

  async updateItem(id: number, form: { name: string, notes: string }): Promise<void> {
    const request = await HttpHelper.makeRequest('PUT', `${this.baseUrl}/item/${id}`, form);

    try {
      const response: AxiosResponse<{ item: Item }> = await axios(request);
      const store = getStore();
      store.dispatch(updateItem(response.data.item));
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw 'Unknown error';
      }
    }
  }

  async deleteItem(id: number): Promise<Item> {
    const request = await HttpHelper.makeRequest('DELETE', `${this.baseUrl}/item/${id}`, {});

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
