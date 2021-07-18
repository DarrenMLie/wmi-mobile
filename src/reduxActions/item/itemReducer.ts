import {
  ItemState,
  ItemActionTypes,
  RECEIVE_ITEMS,
  UPDATE_ITEM,
} from './itemTypes';
import { Item } from 'models/item';

const initialState = {
  items: {},
};

function combineItem(state: ItemState, item: Item): { [index: string]: Item } {
  const combinedItems = { ...state.items };

  combinedItems[item.id] = {
    ...state.items[item.id],
    ...item,
  };

  return combinedItems;
}

function itemReducer(
  state: ItemState = initialState,
  action: ItemActionTypes,
): ItemState {
  switch(action.type) {
    case RECEIVE_ITEMS:
      return {
        ...state,
        items: action.items.reduce(function(map: { [index: string]: Item }, item) {
          map[item.id] = item;
          return map;
        }, {}),
      };
    case UPDATE_ITEM: {
      return {
        ...state,
        items: combineItem(state, action.item),
      }
    }
    default:
      return state;
  }
}

export default itemReducer;
