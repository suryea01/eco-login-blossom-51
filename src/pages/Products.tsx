
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoIcon } from "@/components/LogoIcon";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LogOut, User, Menu, X, Home as HomeIcon, Filter, Search
} from "lucide-react";
import { ProductGrid } from "@/components/ecommerce/ProductGrid";
import { ProductFilters } from "@/components/ecommerce/ProductFilters";
import { Pagination } from "@/components/ui/pagination";

const Products = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
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
            <button onClick={() => navigate('/products')} className="text-sm font-medium transition-colors text-primary">
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
              className="flex items-center gap-2 text-lg font-medium text-primary"
              onClick={() => {
                navigate('/products');
                setIsNavOpen(false);
              }}
            >
              <Search size={20} />
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
            {user && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    navigate('/profile');
                    setIsNavOpen(false);
                  }}
                  className="flex items-center gap-2 mt-4"
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
        {/* Page header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Eco Products</h1>
            <p className="text-muted-foreground mt-1">Sustainable products for a better future</p>
          </div>
          
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="sm:hidden"
            >
              <Filter size={16} className="mr-2" />
              Filters
            </Button>
            <div className="relative">
              <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm">
                <option value="popular">Most Popular</option>
                <option value="recent">Recently Added</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="eco-impact">Best Eco Impact</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar - desktop */}
          <div className="hidden sm:block w-64 flex-shrink-0">
            <ProductFilters />
          </div>
          
          {/* Mobile filters */}
          {filtersOpen && (
            <div className="sm:hidden bg-background border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Filters</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setFiltersOpen(false)}
                >
                  <X size={16} />
                </Button>
              </div>
              <ProductFilters />
            </div>
          )}
          
          {/* Product grid */}
          <div className="flex-grow">
            <ProductGrid />
            
            {/* Pagination */}
            <div className="mt-8">
              <Pagination>
                <div className="flex justify-center">
                  <Pagination.Content>
                    <Pagination.Item>
                      <Pagination.Link isActive href="#">1</Pagination.Link>
                    </Pagination.Item>
                    <Pagination.Item>
                      <Pagination.Link href="#">2</Pagination.Link>
                    </Pagination.Item>
                    <Pagination.Item>
                      <Pagination.Link href="#">3</Pagination.Link>
                    </Pagination.Item>
                    <Pagination.Item>
                      <Pagination.Ellipsis />
                    </Pagination.Item>
                    <Pagination.Item>
                      <Pagination.Link href="#">8</Pagination.Link>
                    </Pagination.Item>
                    <Pagination.Item>
                      <Pagination.Next href="#" />
                    </Pagination.Item>
                  </Pagination.Content>
                </div>
              </Pagination>
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default Products;
