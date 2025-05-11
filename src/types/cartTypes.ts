
import { ProductType } from "./productTypes";

export interface CartItemType extends ProductType {
  quantity: number;
}

export interface CartContextType {
  cart: CartItemType[];
  addToCart: (item: CartItemType) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalEcoPoints: number;
}
