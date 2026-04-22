export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  subcategoryId: number;
  inStock: boolean;
  image: string;
  unit: string;
  description?: string;
}

export interface StoreData {
  store: {
    name: string;
    tagline: string;
    location: string;
    currency: string;
  };
  products: Product[];
}

export interface CartItem extends Product {
  quantity: number;
}
