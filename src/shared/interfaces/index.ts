export interface ProductName {
  toLowerCase(): unknown;
  short: string;
  full: string;
}

export interface Product {
  map(arg0: (product: any) => any): unknown;
  _id: string;
  name: ProductName;
  price: number;
  photo: string;
  path: string;
  isFavorite?: boolean;
  orderCount?: number; 
}

export interface BasketItem {
  product: Product;
  quantity: number;
  isPurchased?: boolean;
  orderId: string;
}

export interface State {
  products: Product[];
  favouriteProducts: Product[];
  basket: BasketItem[];
  amountPage: number;
  isBasketCheckedOut: boolean;
  totalAmount: number;
  loading: boolean;
  searchQuery: string;
}
