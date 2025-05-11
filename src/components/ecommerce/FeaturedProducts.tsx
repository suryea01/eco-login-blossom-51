
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Leaf, Star } from "lucide-react";
import { mockProducts } from "@/data/mockProducts";

export const FeaturedProducts = () => {
  const navigate = useNavigate();
  const featuredProducts = mockProducts.slice(0, 3);
  
  return (
    <div className="py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Featured Eco Products</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover sustainable products that help reduce environmental impact while supporting ethical businesses.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {featuredProducts.map((product) => (
          <Card 
            key={product.id} 
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="aspect-square bg-muted/30 relative">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 left-2 bg-eco-primary hover:bg-eco-primary/90">
                {product.category}
              </Badge>
              <div className="absolute bottom-2 left-2 bg-green-100 dark:bg-green-900/70 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full flex items-center">
                <Leaf size={12} className="mr-1" />
                +{product.ecoPoints} pts
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium truncate">{product.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 truncate">{product.seller.name}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="font-bold">${product.price.toFixed(2)}</p>
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-amber-500 text-amber-500" />
                  <span className="text-sm">{product.rating}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button 
          onClick={() => navigate('/products')} 
          variant="outline" 
          className="gap-1"
        >
          Browse All Products <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};
