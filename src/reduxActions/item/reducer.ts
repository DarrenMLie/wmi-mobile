import { createSlice } from '@reduxjs/toolkit';
import { Item } from 'models/item';
import { createItem, getItems, updateItem, deleteItem } from './actions';

interface ItemState {
  items: {
    [index: string]: Item,
  }
  itemIds: string[],
  offlineItems: {
    [index: string]: Item,
  },
  lastOfflineItemId: string,
}

const initialState: ItemState = {
  items: {},
  itemIds: [],
  offlineItems: {},
  lastOfflineItemId: '0',
}

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    createOfflineItem(state, action) {
      const id = (parseInt(state.lastOfflineItemId)+1).toString();
      const item = {
        "id": id,
        "createdAt": Date.now(),
      }
      state.offlineItems[id] = { ...item, ...action.payload };
      state.lastOfflineItemId = id;
    },
    toggleOfflineIsFavorite(state, action) {
      state.offlineItems[action.payload.id].isFavorite = action.payload.isFavorite;
    },
    editOfflineItem(state, action) {
      state.offlineItems[action.payload.id] = {
        ...state.offlineItems[action.payload.id],
        ...action.payload,
      };
    },
    deleteOfflineItem(state, action) {
      delete state.offlineItems[action.payload];
    }
  },
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
      state.itemIds = state.itemIds.filter(id => id != action.payload);
      delete state.items[action.payload];
    })
  },
})

const { actions, reducer } = itemSlice;
export const { createOfflineItem, toggleOfflineIsFavorite, editOfflineItem, deleteOfflineItem } = actions;

export default reducer;
