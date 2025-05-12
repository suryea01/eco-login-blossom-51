
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogoIcon } from "@/components/LogoIcon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LogOut, User, Menu, X, Bell, ShoppingCart
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { RoleSelector } from "@/components/RoleSelector";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedProducts } from "@/components/ecommerce/FeaturedProducts";
import { useCart } from "@/contexts/CartContext";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const Home = () => {
  const { user, signOut } = useAuth();
  const { cart, setIsCartOpen } = useCart();
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

  const openCart = () => {
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <LogoIcon />
              <span className="font-bold text-lg hidden sm:block">ECONIZHAI</span>
            </Link>
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
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/home" className={navigationMenuTriggerStyle()}>
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/products" className={navigationMenuTriggerStyle()}>
                  Marketplace
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/challenges" className={navigationMenuTriggerStyle()}>
                  Challenges
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" className={navigationMenuTriggerStyle()}>
                  About
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className={navigationMenuTriggerStyle()}>
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* User controls */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate('/cart')} 
              className="relative"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              size="icon"
              className="relative hidden md:flex"
            >
              <Bell size={20} />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                2
              </span>
            </Button>
            
            <ThemeToggle />
            
            {user ? (
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
            ) : (
              <Button 
                variant="default" 
                size="sm"
                onClick={() => navigate('/auth')}
              >
                Sign In
              </Button>
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
              Home
            </Link>
            <Link 
              to="/products" 
              className="flex items-center gap-2 text-lg font-medium"
              onClick={() => setIsNavOpen(false)}
            >
              Marketplace
            </Link>
            <Link 
              to="/challenges" 
              className="flex items-center gap-2 text-lg font-medium"
              onClick={() => setIsNavOpen(false)}
            >
              Challenges
            </Link>
            <Link 
              to="/about" 
              className="flex items-center gap-2 text-lg font-medium"
              onClick={() => setIsNavOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="flex items-center gap-2 text-lg font-medium"
              onClick={() => setIsNavOpen(false)}
            >
              Contact
            </Link>
            <Button 
              onClick={() => {
                setShowRoleSelector(true);
                setIsNavOpen(false);
              }} 
              className="mt-4"
            >
              Choose Role
            </Button>
            {user && (
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
            )}
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow">
        {/* Hero section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-[fadeIn_0.5s_ease-out] bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
              Turning Waste into Wealth
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground animate-[fadeIn_0.5s_ease-out]" style={{ animationDelay: "200ms" }}>
              Join ECONIZHAI to make a positive impact on the environment while creating economic opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeIn_0.5s_ease-out]" style={{ animationDelay: "400ms" }}>
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => navigate('/products')}
              >
                Shop Products
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setShowRoleSelector(true)}
              >
                Join Ecosystem
              </Button>
            </div>
          </div>
        </section>
        
        {/* How it works section */}
        <HowItWorks />
        
        {/* Featured Products */}
        <FeaturedProducts />
        
        {/* Sustainability Impact */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Environmental Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 border-green-200 dark:border-green-800">
                <div className="p-6 text-center">
                  <h3 className="text-4xl font-bold text-green-600 dark:text-green-500">500+</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">Tons of Waste Recycled</p>
                </div>
              </Card>
              
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 border-blue-200 dark:border-blue-800">
                <div className="p-6 text-center">
                  <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-500">1,200+</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">CO₂ Emissions Saved (tons)</p>
                </div>
              </Card>
              
              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 border-amber-200 dark:border-amber-800">
                <div className="p-6 text-center">
                  <h3 className="text-4xl font-bold text-amber-600 dark:text-amber-500">5,000+</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">Community Members</p>
                </div>
              </Card>
            </div>
            
            <div className="mt-12 text-center">
              <Button onClick={() => navigate('/about')} variant="outline">
                Learn More About Our Mission
              </Button>
            </div>
          </div>
        </section>
        
        {/* Call to action */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our growing community of eco-conscious individuals and businesses making the world a better place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-green-600"
                onClick={() => navigate('/auth')}
              >
                Create Account
              </Button>
              <Button 
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100"
                onClick={() => navigate('/products')}
              >
                Browse Marketplace
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <LogoIcon />
                <span className="font-bold text-white">ECONIZHAI</span>
              </div>
              <p className="text-sm">
                Turning waste into wealth through a sustainable ecosystem that benefits everyone.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/home" className="hover:text-white">Home</Link></li>
                <li><Link to="/products" className="hover:text-white">Marketplace</Link></li>
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Sustainability Guide</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Recycling Tips</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm">
                <li>info@econizhai.com</li>
                <li>(123) 456-7890</li>
                <li>123 Green Street, Eco City</li>
              </ul>
              <div className="flex gap-4 mt-4">
                <a href="#" className="hover:text-white" aria-label="Twitter">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                </a>
                <a href="#" className="hover:text-white" aria-label="Facebook">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
                </a>
                <a href="#" className="hover:text-white" aria-label="Instagram">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2025 ECONIZHAI. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0 text-sm">
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Cookie Policy</a>
            </div>
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
