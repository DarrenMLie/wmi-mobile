export interface Item {
  id: string;
  name: string;
  notes: string;
  isFavorite: boolean;
  createdAt: Date;
  position: {
    name: string;
  }
}