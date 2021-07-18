import {
  RECEIVE_ITEMS,
  ReceiveItemsAction,
  UPDATE_ITEM,
  UpdateItemAction,
} from './itemTypes';
import { Item } from 'models/item';

export function receiveItems(items: Item[]): ReceiveItemsAction {
  return {
    type: RECEIVE_ITEMS,
    items,
  };
}

export function updateItem(item: Item): UpdateItemAction {
  return {
    type: UPDATE_ITEM,
    item,
  };
}
