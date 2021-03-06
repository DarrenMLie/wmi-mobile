import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITEM_SERVICE_PROTOCOL, ITEM_SERVICE_HOST, ITEM_SERVICE_PORT } from '@env'
import * as HttpHelper from 'utils/httpHelper';
import axios, { AxiosResponse } from 'axios';
import { execute } from 'utils/jwtExpiryHelper';
import { MetaItems, Item } from 'models/item';

const baseUrl = (ITEM_SERVICE_PORT) ? `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}:${ITEM_SERVICE_PORT}`
  : `${ITEM_SERVICE_PROTOCOL}://${ITEM_SERVICE_HOST}`;

export async function getItemList(): Promise<MetaItems> {
  const request = await HttpHelper.makeRequest('GET', `${baseUrl}/item`, null);

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

export async function getItem(id: string): Promise<Item> {
  const request = await HttpHelper.makeRequest('GET', `${baseUrl}/item/${id}`, null);

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

export async function createItemApi(form: { name: string, notes: string }): Promise<Item> {
  const request = await HttpHelper.makeRequest('POST', `${baseUrl}/item`, form);

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

export async function updateItemApi(id: string, form: { name: string, notes: string }): Promise<Item> {
  const request = await HttpHelper.makeRequest('PUT', `${baseUrl}/item/${id}`, form);

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

export async function deleteItemApi(id: string): Promise<void> {
  const request = await HttpHelper.makeRequest('DELETE', `${baseUrl}/item/${id}`, {});

  try {
    await axios(request);
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw 'Unknown error';
    }
  }
}
  
export const createItem = createAsyncThunk(
  'item/createItem',
  async(form: { name: string, notes: string }, api) => {
    return execute(api, () => createItemApi(form));
  }
);

export const getItems = createAsyncThunk(
  'item/getItems',
  async(undefined, api) => {
    return execute(api, getItemList);
  }
);

export const updateItem = createAsyncThunk(
  'item/updateItem',
  async (form: { id: string, name: string, notes: string }, api) => {
    return execute(api, () => updateItemApi(form.id, form));
  }
);

export const deleteItem = createAsyncThunk(
  'item/deleteItem',
  async(id: string, api) => {
    await execute(api, () => deleteItemApi(id));
    return id;
  }
);