import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Item } from 'models/item';
import {
  getItemList,
  updateItem as updateItemApi,
  deleteItem as deleteItemApi,
  createItem as createItemApi,
} from 'clients/itemService';
import { execute } from 'utils/jwtExpiryHelper';

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

export const deleteItem = createAsyncThunk('item/deleteItem',
  async(id: string, api) => {
    await execute(api, () => deleteItemApi(id));
    return id;
  }
);

interface ItemState {
  items: {
    [index: string]: Item,
  }
  itemIds: string[],
}

const initialState: ItemState = {
  items: {},
  itemIds: [],
}

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createItem.fulfilled, (state, action) => {
      state.items[action.payload.id] = action.payload;
      state.itemIds.unshift(action.payload.id);
    })
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.items = action.payload.results.reduce(function(map: { [index: string]: Item }, item: Item) {
        map[item.id] = item;
        return map;
      }, {});
      state.itemIds = action.payload.results.map((item: Item) => item.id);
    })
    builder.addCase(updateItem.fulfilled, (state, action) => {
      state.items[action.payload.id] = action.payload;
    })
    builder.addCase(deleteItem.fulfilled, (state, action) => {
      delete state.items[action.payload];
    })
  },
})

const { actions, reducer } = itemSlice;

export default reducer;
