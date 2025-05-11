
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, Leaf } from "lucide-react";
import { CartItemType } from "@/types/cartTypes";

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

export const CartItem = ({ item, onRemove, onUpdateQuantity }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  
  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onUpdateQuantity(newQuantity);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onUpdateQuantity(newQuantity);
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row p-4">
        <div className="w-full sm:w-24 h-24 bg-muted/30 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={item.images[0]} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-grow flex flex-col sm:flex-row justify-between sm:items-center mt-4 sm:mt-0 sm:ml-4">
          <div className="sm:pr-6">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-muted-foreground">Seller: {item.seller.name}</p>
            
            <div className="flex items-center mt-1">
              <div className="text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400 px-2 py-0.5 rounded-full flex items-center">
                <Leaf size={10} className="mr-1" />
                +{item.ecoPoints * quantity} pts
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 sm:mt-0">
            {/* Quantity controls */}
            <div className="flex items-center border rounded-md">
              <button 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-8 w-8 flex items-center justify-center border-r text-muted-foreground hover:bg-muted/50 disabled:opacity-50"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <div className="h-8 w-10 flex items-center justify-center">
                {quantity}
              </div>
              <button 
                onClick={incrementQuantity}
                className="h-8 w-8 flex items-center justify-center border-l text-muted-foreground hover:bg-muted/50"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
            
            {/* Price */}
            <div className="font-medium">
              ${(item.price * quantity).toFixed(2)}
            </div>
            
            {/* Remove button */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onRemove}
              aria-label="Remove item"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
