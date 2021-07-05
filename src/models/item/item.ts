export interface Item {
  id: number;
  name: string;
  notes: string;
  isFavorite: boolean;
  createdAt: Date;
  position: {
    name: string;
  }
}