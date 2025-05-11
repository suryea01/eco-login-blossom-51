
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogoIcon } from "@/components/LogoIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Recycle, ShoppingBag, Truck, Bot, BadgeDollarSign, Leaf, 
  LogOut, User, Menu, X, Home as HomeIcon, Users, Info, MessageSquare
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { RoleSelector } from "@/components/RoleSelector";

const Home = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleRoleSelect = (role: string) => {
    localStorage.setItem('userRole', role);
    navigate(`/dashboard/${role}`);
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
            <Link to="/home" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <a href="#marketplace" className="text-sm font-medium transition-colors hover:text-primary">
              Marketplace
            </a>
            <a href="#about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </a>
            <a href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </a>
            <Button onClick={() => setShowRoleSelector(true)} variant="outline">
              Choose Role
            </Button>
          </nav>
          
          {/* User controls */}
          <div className="flex items-center gap-2">
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
            <Link 
              to="/home" 
              className="flex items-center gap-2 text-lg font-medium"
              onClick={() => setIsNavOpen(false)}
            >
              <HomeIcon size={20} />
              Home
            </Link>
            <a 
              href="#marketplace" 
              className="flex items-center gap-2 text-lg font-medium"
              onClick={() => setIsNavOpen(false)}
            >
              <ShoppingBag size={20} />
              Marketplace
            </a>
            <a 
              href="#about" 
              className="flex items-center gap-2 text-lg font-medium"
              onClick={() => setIsNavOpen(false)}
            >
              <Info size={20} />
              About
            </a>
            <a 
              href="#contact" 
              className="flex items-center gap-2 text-lg font-medium"
              onClick={() => setIsNavOpen(false)}
            >
              <MessageSquare size={20} />
              Contact
            </a>
            <Button 
              onClick={() => {
                setShowRoleSelector(true);
                setIsNavOpen(false);
              }} 
              className="mt-4"
            >
              <Users size={20} className="mr-2" />
              Choose Role
            </Button>
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
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow">
        {/* Hero section */}
        <section className="py-12 md:py-24 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-[fadeIn_0.5s_ease-out] bg-gradient-to-r from-eco-primary to-eco-accent bg-clip-text text-transparent">
              Turning Waste into Wealth
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground animate-[fadeIn_0.5s_ease-out]" style={{ animationDelay: "200ms" }}>
              Join ECONIZHAI to make a positive impact on the environment while creating economic opportunities.
            </p>
            <Button 
              size="lg" 
              className="animate-[fadeIn_0.5s_ease-out]"
              style={{ animationDelay: "400ms" }}
              onClick={() => setShowRoleSelector(true)}
            >
              Get Started
            </Button>
          </div>
        </section>
        
        {/* Marketplace Section */}
        <section id="marketplace" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Marketplace</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Waste Trading</h3>
                <p className="text-muted-foreground">
                  Buy and sell recyclable waste materials. Connect directly with waste collectors and recycling facilities.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Recycle className="text-eco-primary" size={20} />
                  <span>Plastics, Paper, Metal, E-waste & more</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Eco Products</h3>
                <p className="text-muted-foreground">
                  Discover sustainable products made from recycled materials. Support local artisans and eco-friendly businesses.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Leaf className="text-eco-primary" size={20} />
                  <span>Home goods, Accessories, Fashion & more</span>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-background rounded-lg p-6 shadow-sm border">
              <h3 className="font-semibold mb-4">Featured Items</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <Card key={item} className="overflow-hidden">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <Leaf size={32} className="text-muted-foreground/50" />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-medium">Eco Product #{item}</h4>
                      <p className="text-sm text-muted-foreground mt-1">Made from recycled materials</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">About ECONIZHAI</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <LogoIcon />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Our Mission</h3>
                <p className="text-muted-foreground">
                  ECONIZHAI is dedicated to creating a circular economy where waste is transformed into valuable resources. 
                  We connect waste producers with recyclers, upcyclers with consumers, and volunteers with communities to 
                  create a sustainable ecosystem that benefits everyone involved.
                </p>
                
                <h3 className="text-xl font-semibold pt-4">Our Impact</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-eco-primary">500+</p>
                    <p className="text-sm">Tons of waste recycled</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-eco-primary">1000+</p>
                    <p className="text-sm">Active users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="outline" className="flex items-center gap-2">
                <MessageSquare size={16} />
                Send a Message
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Info size={16} />
                Help Center
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Email: info@econizhai.com | Phone: (123) 456-7890
            </p>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-muted py-8 border-t">
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
      
      {/* Role selector modal */}
      {showRoleSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Choose Your Role</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowRoleSelector(false)}
              >
                <X size={20} />
              </Button>
            </div>
            <RoleSelector onRoleSelect={handleRoleSelect} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
