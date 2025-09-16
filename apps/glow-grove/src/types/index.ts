export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  image?: string;
};

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  image?: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image?: string;
};

export type Cart = {
  items: CartItem[];
  total: number;
  itemCount: number;
};

export type ShippingAddress = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
};
