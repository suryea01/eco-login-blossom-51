import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LogoIcon } from "@/components/LogoIcon";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LogOut, User, Menu, X, Home as HomeIcon, 
  ChevronLeft, ShoppingCart, Leaf, Plus, Minus, 
  Info, MessageSquare, Star
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { ProductImageGallery } from "@/components/ecommerce/ProductImageGallery";
import { useToast } from "@/hooks/use-toast";
import { mockProducts } from "@/data/mockProducts";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, signOut } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  // Find the product by ID (in a real app, this would be a database query)
  const product = mockProducts.find(p => p.id === id) || mockProducts[0];
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    
    toast({
      title: "Product added to cart",
      description: `${quantity} × ${product.name} added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <LogoIcon />
            <span className="font-bold text-lg hidden sm:block">ECONIZHAI</span>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {isNavOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate('/home')} className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </button>
            <button onClick={() => navigate('/products')} className="text-sm font-medium transition-colors hover:text-primary">
              Products
            </button>
            <button onClick={() => navigate('/home#about')} className="text-sm font-medium transition-colors hover:text-primary">
              About
            </button>
            <button onClick={() => navigate('/home#contact')} className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </button>
          </nav>
          
          {/* User controls */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/cart')}
              className="relative"
            >
              <ShoppingCart size={16} />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                3
              </span>
            </Button>
            <ThemeToggle />
            {user && (
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-1 hidden sm:flex"
                >
                  <User size={16} />
                  Profile
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="flex items-center gap-1"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      {isNavOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background border-t p-6 md:hidden">
          <nav className="flex flex-col gap-6">
            <button 
              className="flex items-center gap-2 text-lg font-medium"
              onClick={() => {
                navigate('/home');
                setIsNavOpen(false);
              }}
            >
              <HomeIcon size={20} />
              Home
            </button>
            <button 
              className="flex items-center gap-2 text-lg font-medium"
              onClick={() => {
                navigate('/products');
                setIsNavOpen(false);
              }}
            >
              Products
            </button>
            <button 
              className="flex items-center gap-2 text-lg font-medium"
              onClick={() => {
                navigate('/home#about');
                setIsNavOpen(false);
              }}
            >
              About
            </button>
            <button 
              className="flex items-center gap-2 text-lg font-medium"
              onClick={() => {
                navigate('/home#contact');
                setIsNavOpen(false);
              }}
            >
              Contact
            </button>
            <Button 
              variant="outline" 
              onClick={() => {
                navigate('/cart');
                setIsNavOpen(false);
              }}
              className="flex items-center gap-2 mt-4"
            >
              <ShoppingCart size={20} />
              Cart (3)
            </Button>
            {user && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    navigate('/profile');
                    setIsNavOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <User size={20} />
                  Profile
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    handleSignOut();
                    setIsNavOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <LogOut size={20} />
                  Sign Out
                </Button>
              </>
            )}
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <button 
            onClick={() => navigate('/products')} 
            className="flex items-center hover:text-primary transition-colors"
          >
            <ChevronLeft size={14} className="mr-1" /> Back to Products
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product images */}
          <div className="bg-muted/30 rounded-lg overflow-hidden">
            <ProductImageGallery 
              images={product.images} 
              name={product.name} 
            />
          </div>
          
          {/* Product details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <Badge className="bg-eco-primary hover:bg-eco-primary/90">{product.category}</Badge>
                {product.inStock ? (
                  <Badge variant="outline" className="text-green-600 border-green-600">In Stock</Badge>
                ) : (
                  <Badge variant="outline" className="text-red-600 border-red-600">Out of Stock</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
              <div className="flex items-center gap-1 mt-2">
                {Array.from({length: 5}).map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < product.rating ? "fill-amber-500 text-amber-500" : "text-gray-300"} 
                  />
                ))}
                <span className="text-sm ml-1 text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>
            
            <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
            
            <div className="bg-muted/30 p-3 rounded-lg flex items-center gap-2">
              <Leaf size={20} className="text-green-600" />
              <div className="text-sm">
                <p className="font-medium">Eco Impact: <span className="text-green-600">+{product.ecoPoints} Points</span></p>
                <p className="text-muted-foreground">CO₂ saved: {product.co2Impact} kg</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Material Source</h3>
              <p className="text-muted-foreground">{product.materialSource}</p>
            </div>
            
            {/* Quantity selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <button 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10 flex items-center justify-center border-r text-muted-foreground hover:bg-muted/50 disabled:opacity-50"
                >
                  <Minus size={16} />
                </button>
                <div className="h-10 w-10 flex items-center justify-center">
                  {quantity}
                </div>
                <button 
                  onClick={incrementQuantity}
                  className="h-10 w-10 flex items-center justify-center border-l text-muted-foreground hover:bg-muted/50"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Add to cart button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleAddToCart} className="flex-grow">
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline">
                <MessageSquare size={16} className="mr-2" />
                Ask Question
              </Button>
            </div>
            
            {/* Seller information */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center">
                    <User size={24} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">{product.seller.name}</h4>
                    <p className="text-sm text-muted-foreground">Eco Verified Seller</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="mt-12 border-t pt-8">
          <div className="flex border-b">
            <button className="px-4 py-2 border-b-2 border-primary font-medium text-primary">
              Details
            </button>
            <button className="px-4 py-2 text-muted-foreground">
              Reviews ({product.reviews})
            </button>
            <button className="px-4 py-2 text-muted-foreground">
              Environmental Impact
            </button>
          </div>
          <div className="py-6">
            <h3 className="font-medium mb-2">Product Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between p-2 border-b">
                <span className="text-muted-foreground">Material</span>
                <span>{product.specifications.material}</span>
              </div>
              <div className="flex justify-between p-2 border-b">
                <span className="text-muted-foreground">Weight</span>
                <span>{product.specifications.weight}</span>
              </div>
              <div className="flex justify-between p-2 border-b">
                <span className="text-muted-foreground">Dimensions</span>
                <span>{product.specifications.dimensions}</span>
              </div>
              <div className="flex justify-between p-2 border-b">
                <span className="text-muted-foreground">Manufacturing</span>
                <span>{product.specifications.manufacturing}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {mockProducts.slice(0, 4).map((relatedProduct) => (
              <Card key={relatedProduct.id} className="overflow-hidden">
                <div className="aspect-square bg-muted/30 relative">
                  <img 
                    src={relatedProduct.images[0]} 
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-eco-primary hover:bg-eco-primary/90">
                    {relatedProduct.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium truncate">{relatedProduct.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 truncate">{relatedProduct.seller.name}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="font-bold">${relatedProduct.price.toFixed(2)}</p>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-amber-500 text-amber-500" />
                      <span className="text-sm">{relatedProduct.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-muted py-8 border-t mt-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <LogoIcon />
              <span className="font-bold">ECONIZHAI</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">FAQ</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 ECONIZHAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
