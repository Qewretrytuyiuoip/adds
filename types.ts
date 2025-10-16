
export interface Comment {
  id: number;
  itemId: number;
  author: string;
  text: string;
  timestamp: string;
}

export interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  isFavorite: boolean;
}
