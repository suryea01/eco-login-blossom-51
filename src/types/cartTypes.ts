
import { ProductType } from "./productTypes";

export interface CartItemType {
  productId: string;
  id: string; // Added id property for consistent referencing
  name: string;
  price: number;
  image: string;
  images?: string[]; // Added images array as optional for compatibility
  quantity: number;
  ecoPoints: number;
  sellerId: string;
  sellerName: string;
  seller?: { // Added optional seller object for compatibility
    name: string;
    id: string;
  }
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
