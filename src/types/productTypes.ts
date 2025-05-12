
export interface SellerType {
  id: string;
  name: string;
  avatar?: string;
  rating?: number;
  verified?: boolean;
}

export interface ProductSpecificationsType {
  material: string;
  weight: string;
  dimensions: string;
  manufacturing: string;
}

export interface ProductType {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  ecoPoints: number;
  co2Impact: number;
  inStock: boolean;
  materialSource: string;
  seller: SellerType;
  specifications: ProductSpecificationsType;
  createdAt?: string;
}

export interface ProductReviewType {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}
