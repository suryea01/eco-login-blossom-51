
export interface SellerType {
  id: string;
  name: string;
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
}
