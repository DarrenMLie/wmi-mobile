import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Item } from 'models/item';
import {
  getItemList,
  updateItem as updateItemApi,
  deleteItem as deleteItemApi,
  createItem as createItemApi,
} from 'clients/itemService';

export const createItem = createAsyncThunk('item/createItem', createItemApi);
export const getItems = createAsyncThunk('item/getItems', getItemList);
export const updateItem = createAsyncThunk(
  'item/updateItem',
  async (form: { id: string, name: string, notes: string }, thunkAPI) => {
    return updateItemApi(form.id, form);
  }
);
export const deleteItem = createAsyncThunk('item/deleteItem',
  async(id: string) => {
    await deleteItemApi(id);
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
      state.items = action.payload.results.reduce(function(map: { [index: string]: Item }, item) {
        map[item.id] = item;
        return map;
      }, {});
      state.itemIds = action.payload.results.map(item => item.id);
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
