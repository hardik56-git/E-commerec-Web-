export type Language = 'en' | 'ja';

export type Category = 'all' | 'apparel' | 'timepieces' | 'leather' | 'interior' | 'ceremony';

export interface Product {
  id: string;
  nameEn: string;
  nameJa: string;
  category: Category;
  priceJpy: number;
  rating: number;
  reviewsCount: number;
  image: string;
  secondaryImage: string;
  descriptionEn: string;
  descriptionJa: string;
  detailsEn: string[];
  detailsJa: string[];
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  materialEn: string;
  materialJa: string;
  originEn: string;
  originJa: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  totalJpy: number;
  customerName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'credit_card' | 'paypay' | 'konbini' | 'bank_transfer';
  status: 'processing' | 'shipped' | 'delivered';
}
