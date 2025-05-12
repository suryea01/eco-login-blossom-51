
import { ProductType } from "./productTypes";

export interface CartItemType {
  productId: string;
  id: string; // Unique identifier for the cart item
  name: string;
  price: number;
  image: string; // Main product image
  images?: string[]; // All product images
  quantity: number;
  ecoPoints: number;
  sellerId: string;
  sellerName: string;
  seller?: { // Optional seller object for compatibility
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
