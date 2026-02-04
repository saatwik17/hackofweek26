export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  description: string;
  image: string;
  tags: string[];
  rating: number;
  reviews: number;
  badge?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface SearchState {
  query: string;
  isSearching: boolean;
  results: string[] | null; // null means showing all, empty array means no matches
  aiMessage?: string;
}

export enum ViewMode {
  GRID = 'GRID',
  LIST = 'LIST'
}

export type PageView = 'HOME' | 'CHECKOUT' | 'SUCCESS';