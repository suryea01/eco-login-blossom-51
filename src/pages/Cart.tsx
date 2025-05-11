
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoIcon } from "@/components/LogoIcon";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LogOut, User, Menu, X, Home as HomeIcon, 
  ShoppingCart, Trash2, ChevronLeft, ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { CartItem } from "@/components/ecommerce/CartItem";

const Cart = () => {
  const { user, signOut } = useAuth();
  const { cart, totalPrice, totalEcoPoints, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
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
              className="relative text-primary"
            >
              <ShoppingCart size={16} />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
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
              className="flex items-center gap-2 mt-4 text-primary"
            >
              <ShoppingCart size={20} />
              Cart ({cart.length})
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
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart size={48} className="mx-auto text-muted-foreground" />
            <h2 className="text-xl font-medium mt-4">Your cart is empty</h2>
            <p className="text-muted-foreground mt-2">Browse our eco-friendly products and add some items to your cart!</p>
            <Button onClick={() => navigate('/products')} className="mt-6">
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {/* Cart items */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartItem 
                    key={item.id}
                    item={item}
                    onRemove={() => removeFromCart(item.id)}
                    onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                  />
                ))}
              </div>
              
              <div className="mt-6">
                <button 
                  onClick={() => navigate('/products')} 
                  className="flex items-center text-sm text-primary hover:underline"
                >
                  <ChevronLeft size={14} className="mr-1" /> Continue Shopping
                </button>
              </div>
            </div>
            
            {/* Order summary */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>Calculated at checkout</span>
                    </div>
                    
                    <div className="pt-2">
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Promo code" 
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-grow"
                        />
                        <Button variant="outline">Apply</Button>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Eco Points Earned</span>
                      <span className="text-green-600">+{totalEcoPoints} pts</span>
                    </div>
                    
                    <Button onClick={() => navigate('/checkout')} className="w-full mt-4">
                      Checkout <ArrowRight size={16} className="ml-2" />
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Secure payment. By proceeding, you agree to our Terms & Conditions
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
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

export default Cart;
