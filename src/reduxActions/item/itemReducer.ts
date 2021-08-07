import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Item } from 'models/item';
import { getItemList, updateItem as updateItemApi, deleteItem as deleteItemApi } from 'clients/itemService';

export const getItems = createAsyncThunk('item/getItems', getItemList);
export const updateItem = createAsyncThunk(
  'item/updateItem',
  async (form: { id: number, name: string, notes: string }, thunkAPI) => {
    return updateItemApi(form.id, form);
  }
);
export const deleteItem = createAsyncThunk('item/deleteItem',
  async(id: number) => {
    await deleteItemApi(id);
    return id;
  }
);

interface ItemState {
  items: {
    [index: string]: Item,
  }
}

const initialState: ItemState = {
  items: {},
}

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.items = action.payload.results.reduce(function(map: { [index: string]: Item }, item) {
        map[item.id] = item;
        return map;
      }, {});
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
