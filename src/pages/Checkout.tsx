import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoIcon } from "@/components/LogoIcon";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LogOut, User, Menu, X, ChevronLeft, 
  ShoppingCart, CreditCard, Truck, Check
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { user, signOut } = useAuth();
  const { cart, totalPrice, totalEcoPoints, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    saveInfo: true
  });
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process order
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase. Your eco-friendly products are on the way!",
      duration: 5000,
    });
    
    // Clear cart and redirect to order confirmation
    clearCart();
    navigate('/order-confirmation');
  };
  
  // Redirect to cart if empty
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

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
                {cart.length}
              </span>
            </Button>
            <ThemeToggle />
            {user && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="flex items-center gap-1"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            )}
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      {isNavOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background border-t p-6 md:hidden">
          <nav className="flex flex-col gap-6">
            <Button 
              variant="outline" 
              onClick={() => {
                navigate('/cart');
                setIsNavOpen(false);
              }}
              className="flex items-center gap-2 mt-4"
            >
              <ShoppingCart size={20} />
              Cart ({cart.length})
            </Button>
            {user && (
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
            )}
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <button 
            onClick={() => navigate('/cart')} 
            className="flex items-center text-sm text-primary hover:underline"
          >
            <ChevronLeft size={14} className="mr-1" /> Back to Cart
          </button>
          <h1 className="text-3xl font-bold mt-4">Checkout</h1>
        </div>
        
        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input 
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Input 
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      <Input 
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input 
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-6">
                    <Switch 
                      id="saveInfo" 
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, saveInfo: checked }))
                      }
                    />
                    <Label htmlFor="saveInfo">Save this information for next time</Label>
                  </div>
                </CardContent>
              </Card>
              
              {/* Delivery Options */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Delivery Options</h2>
                  
                  <RadioGroup 
                    value={deliveryMethod} 
                    onValueChange={setDeliveryMethod}
                  >
                    <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label 
                        htmlFor="standard" 
                        className="flex-grow flex justify-between items-center cursor-pointer"
                      >
                        <div>
                          <p className="font-medium">Standard Delivery</p>
                          <p className="text-sm text-muted-foreground">3-5 business days</p>
                        </div>
                        <span className="font-medium">$4.99</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-muted/50 mt-3">
                      <RadioGroupItem value="express" id="express" />
                      <Label 
                        htmlFor="express" 
                        className="flex-grow flex justify-between items-center cursor-pointer"
                      >
                        <div>
                          <p className="font-medium">Express Delivery</p>
                          <p className="text-sm text-muted-foreground">1-2 business days</p>
                        </div>
                        <span className="font-medium">$9.99</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-muted/50 mt-3">
                      <RadioGroupItem value="eco-volunteer" id="eco-volunteer" />
                      <Label 
                        htmlFor="eco-volunteer" 
                        className="flex-grow flex justify-between items-center cursor-pointer"
                      >
                        <div>
                          <p className="font-medium">Eco-Volunteer Delivery</p>
                          <p className="text-sm text-muted-foreground">4-7 business days (carbon-neutral)</p>
                        </div>
                        <div>
                          <span className="font-medium">$2.99</span>
                          <span className="block text-xs text-green-600">+5 Eco Points</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
              
              {/* Payment Method */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                  
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label 
                        htmlFor="credit-card" 
                        className="flex-grow flex items-center cursor-pointer"
                      >
                        <CreditCard size={20} className="mr-2" />
                        <span className="font-medium">Credit/Debit Card</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 border p-4 rounded-md cursor-pointer hover:bg-muted/50 mt-3">
                      <RadioGroupItem value="eco-pay" id="eco-pay" />
                      <Label 
                        htmlFor="eco-pay" 
                        className="flex-grow flex items-center cursor-pointer"
                      >
                        <Truck size={20} className="mr-2" />
                        <span className="font-medium">EcoPay (Get 2x Eco Points)</span>
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === 'credit-card' && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input id="expiryDate" placeholder="MM/YY" required />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input id="nameOnCard" required />
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'eco-pay' && (
                    <div className="mt-4 p-4 bg-muted/30 rounded-md">
                      <p className="text-sm">
                        EcoPay is our eco-friendly payment system that donates 1% of your purchase to environmental causes and gives you 2x Eco Points.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  {/* Cart items summary */}
                  <div className="space-y-3">
                    {cart.slice(0, 3).map((item) => (
                      <div key={item.productId} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-sm truncate">
                            {item.name} x{item.quantity}
                          </span>
                        </div>
                        <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    
                    {cart.length > 3 && (
                      <div className="text-sm text-muted-foreground italic">
                        +{cart.length - 3} more items
                      </div>
                    )}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {deliveryMethod === 'standard' ? '$4.99' : 
                         deliveryMethod === 'express' ? '$9.99' : '$2.99'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${(totalPrice * 0.08).toFixed(2)}</span>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>
                        ${(
                          totalPrice + 
                          (deliveryMethod === 'standard' ? 4.99 : 
                           deliveryMethod === 'express' ? 9.99 : 2.99) + 
                          (totalPrice * 0.08)
                        ).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Eco Points Earned</span>
                      <span className="text-green-600">
                        +{deliveryMethod === 'eco-volunteer' ? 
                          totalEcoPoints + 5 : 
                          paymentMethod === 'eco-pay' ? 
                          totalEcoPoints * 2 : 
                          totalEcoPoints} pts
                      </span>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full mt-6">Place Order</Button>
                  
                  <div className="flex items-center justify-center gap-1 mt-4 text-xs text-muted-foreground">
                    <Check size={12} />
                    <span>100% Secure Checkout</span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    By placing your order, you agree to our Terms of Service and Privacy Policy
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
      
      {/* Footer */}
      <footer className="bg-muted py-6 border-t mt-12">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 ECONIZHAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;
