
import { ProductType } from "./productTypes";

export interface CartItemType {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  ecoPoints: number;
  sellerId: string;
  sellerName: string;
}

export interface CartContextType {
  cart: CartItemType[];
  addToCart: (product: ProductType, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalEcoPoints: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}
