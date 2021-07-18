import { Item } from 'models/item';

export interface ItemState {
  items: {
    [index: string]: Item,
  }
}

export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const UPDATE_ITEM = 'UPDATE_ITEM';

export interface ReceiveItemsAction {
  type: typeof RECEIVE_ITEMS;
  items: Item[];
}

export interface UpdateItemAction {
  type: typeof UPDATE_ITEM;
  item: Item;
}

export type ItemActionTypes = ReceiveItemsAction | UpdateItemAction;
