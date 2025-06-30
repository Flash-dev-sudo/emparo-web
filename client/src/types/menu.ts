export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  heatLevel: number;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export type MenuCategory = 'all' | 'chicken' | 'burgers' | 'sides' | 'drinks';
