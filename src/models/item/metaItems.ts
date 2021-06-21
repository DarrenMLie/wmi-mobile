import { Item } from 'models/item/item';

export interface MetaItems {
  meta: {
    perPage: number,
  },
  results: Item[],
}