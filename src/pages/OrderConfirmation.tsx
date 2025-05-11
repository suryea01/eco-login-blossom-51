
import { useNavigate } from "react-router-dom";
import { LogoIcon } from "@/components/LogoIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Download, ShoppingBag, Leaf } from "lucide-react";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const orderNumber = `ECO-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderDate = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 py-4">
        <div className="container mx-auto px-4 flex items-center gap-2">
          <LogoIcon />
          <span className="font-bold text-lg">ECONIZHAI</span>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
            <Check size={32} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mt-4">Thank You for Your Order!</h1>
          <p className="text-muted-foreground mt-2">
            Your order has been confirmed and will be shipped soon.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div>
                  <h2 className="font-semibold">Order Number</h2>
                  <p className="text-muted-foreground">{orderNumber}</p>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download size={14} />
                  Invoice
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <h3 className="font-medium">Order Date</h3>
                  <p className="text-muted-foreground">{orderDate}</p>
                </div>
                <div>
                  <h3 className="font-medium">Payment Method</h3>
                  <p className="text-muted-foreground">Credit Card (•••• 4242)</p>
                </div>
                <div>
                  <h3 className="font-medium">Shipping Address</h3>
                  <p className="text-muted-foreground">
                    123 Eco Street<br />
                    Green City, CA 94103<br />
                    United States
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Shipping Method</h3>
                  <p className="text-muted-foreground">Eco-Volunteer Delivery (4-7 days)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-muted/30 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$145.80</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$2.99</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>$11.66</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t pt-2">
              <span>Total</span>
              <span>$160.45</span>
            </div>
            <div className="flex justify-between text-green-600 text-sm">
              <span>Eco Points Earned</span>
              <span>+45 pts</span>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-lg border border-green-200 dark:border-green-900/50 mb-8">
          <div className="flex items-start gap-3">
            <Leaf size={24} className="text-green-600 mt-1" />
            <div>
              <h3 className="font-medium text-green-800 dark:text-green-400">Environmental Impact</h3>
              <p className="text-green-700 dark:text-green-500 text-sm">
                Your eco-friendly purchase helps reduce carbon emissions by approximately 5.4 kg CO₂. 
                That's equivalent to planting a tree that will grow for 3 months!
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate('/products')}>
            <ShoppingBag size={16} className="mr-2" />
            Continue Shopping
          </Button>
          <Button variant="outline" onClick={() => navigate('/home')}>
            Back to Home
          </Button>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-muted py-6 border-t mt-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <LogoIcon />
              <span className="font-bold">ECONIZHAI</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>© 2025 ECONIZHAI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrderConfirmation;
