
import { LogoIcon } from "@/components/LogoIcon";
import { LoginForm } from "@/components/LoginForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const { user, signOut, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background font-inter flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ThemeToggle />
        {!isLoading && user && (
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/profile')}
              className="flex items-center gap-1"
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
              Sign Out
            </Button>
          </div>
        )}
      </div>
      
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center animate-[fadeIn_0.5s_ease-out]">
          <LogoIcon />
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-eco-primary to-eco-accent bg-clip-text text-transparent">
            ECOGREEN
          </h1>
          <p className="text-muted-foreground text-sm">Turning Waste into Wealth</p>
        </div>

        {!isLoading && !user ? (
          <div className="space-y-4">
            <Button asChild className="w-full" size="lg">
              <Link to="/auth">Login / Sign Up</Link>
            </Button>
            <p className="text-center text-muted-foreground text-sm">
              Join us in creating a sustainable future
            </p>
          </div>
        ) : !isLoading && user ? (
          <div className="space-y-4">
            <LoginForm />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-8 animate-[fadeIn_0.5s_ease-out]" style={{ animationDelay: "500ms" }}>
          By continuing, you agree to our{" "}
          <a href="#" className="text-primary hover:text-primary/80 transition-colors underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 rounded">
            Terms
          </a>{" "}
          &{" "}
          <a href="#" className="text-primary hover:text-primary/80 transition-colors underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 rounded">
            Privacy Policy
          </a>
        </p>
      </div>
      
      <footer className="absolute bottom-4 text-center text-xs text-muted-foreground">
        <p>© 2025 EcoLogin Blossom. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
