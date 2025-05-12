
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockProducts } from "@/data/mockProducts";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

export const ProductGrid = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = (event: React.MouseEvent, productId: string) => {
    event.stopPropagation();
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      addToCart(product, 1);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
        duration: 3000,
      });
    }
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {mockProducts.map((product) => (
        <Card 
          key={product.id} 
          className="overflow-hidden cursor-pointer hover:shadow-md transition-all border-gray-200 dark:border-gray-800 h-full flex flex-col"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <div className="aspect-square bg-muted/30 relative overflow-hidden group">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute top-2 left-2 flex gap-2 flex-wrap">
              <Badge className="bg-green-600 hover:bg-green-700">
                {product.category}
              </Badge>
              {product.ecoPoints > 10 && (
                <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                  <Leaf size={12} className="mr-1 text-green-500" />
                  High Impact
                </Badge>
              )}
            </div>
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button 
                onClick={(e) => handleAddToCart(e, product.id)} 
                className="bg-white text-black hover:bg-gray-100"
              >
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
          
          <CardContent className="p-4 flex-grow flex flex-col">
            <div className="flex justify-between items-start">
              <h3 className="font-medium line-clamp-2 flex-grow">{product.name}</h3>
              <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                <Star size={14} className="fill-amber-500 text-amber-500" />
                <span className="text-sm">{product.rating}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">by {product.seller.name}</p>
            
            <div className="mt-2 flex items-center gap-2">
              <div className="text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400 px-2 py-0.5 rounded-full flex items-center">
                <Leaf size={10} className="mr-1" />
                +{product.ecoPoints} pts
              </div>
              <div className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-400 px-2 py-0.5 rounded-full">
                CO₂: -{product.co2Impact}kg
              </div>
            </div>
            
            <div className="mt-auto pt-4 flex justify-between items-baseline">
              <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
              {product.inStock ? (
                <span className="text-xs text-green-600">In Stock</span>
              ) : (
                <span className="text-xs text-red-600">Out of Stock</span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
