
import { createContext, useContext, useState } from "react";
import { CartItemType, CartContextType } from "@/types/cartTypes";
import { ProductType } from "@/types/productTypes";

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
  totalEcoPoints: 0,
  isCartOpen: false,
  setIsCartOpen: () => {}
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const addToCart = (product: ProductType, quantity: number) => {
    setCart(prev => {
      // Check if item already exists in cart
      const existingItemIndex = prev.findIndex(cartItem => cartItem.productId === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Add new item to cart
        const newCartItem: CartItemType = {
          id: product.id,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0] || "",
          images: product.images,
          quantity: quantity,
          ecoPoints: product.ecoPoints,
          sellerId: product.seller.id,
          sellerName: product.seller.name,
          seller: {
            id: product.seller.id,
            name: product.seller.name
          }
        };
        return [...prev, newCartItem];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prev => 
      prev.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  const totalEcoPoints = cart.reduce(
    (sum, item) => sum + item.ecoPoints * item.quantity,
    0
  );
  
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        totalEcoPoints,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
