
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { RoleSelector } from "@/components/RoleSelector";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError("");
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
    
    // Mock authentication - in a real app, this would call an API
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
      toast.success("Successfully logged in!", {
        description: "Welcome back to EcoLogin Blossom"
      });
    }, 1000);
  };
  
  const handleRoleSelect = (role: string) => {
    console.log(`Selected role: ${role}`);
    toast.success(`Role selected: ${role}`, {
      description: "Redirecting to your dashboard..."
    });
    // In a real app, this would navigate to the appropriate dashboard
    // or store the role in context/state management
  };
  
  return (
    <div className="space-y-4 w-full max-w-sm animate-[fadeIn_0.5s_ease-out]">
      {!isAuthenticated ? (
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="email"
                type="email"
                placeholder="Email or Phone"
                className="pl-10 h-12 bg-white border-gray-200 transition-all duration-300 focus:border-eco-primary focus:ring-eco-primary dark:bg-slate-800"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFormError("");
                }}
                required
                aria-invalid={formError ? "true" : "false"}
                aria-describedby="email-error"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pl-10 pr-10 h-12 bg-white border-gray-200 transition-all duration-300 focus:border-eco-primary focus:ring-eco-primary dark:bg-slate-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          
          {formError && (
            <div className="error-state text-sm py-2" id="email-error" role="alert">
              {formError}
            </div>
          )}
          
          <Button
            type="submit"
            className="w-full h-12 bg-eco-primary hover:bg-eco-dark text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </Button>
          
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-sm text-muted-foreground">or</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-2 transition-all duration-300 hover:bg-accent/50 hover:-translate-y-1"
              aria-label="Create a new account"
            >
              Create New Account
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-2 transition-all duration-300 hover:bg-accent/50 hover:-translate-y-1"
              aria-label="Continue with Google"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </Button>
          </div>

          <div className="text-center">
            <a 
              href="#" 
              className="text-eco-primary hover:text-eco-dark text-sm transition-colors focus:outline-none focus:underline"
              aria-label="Reset your password"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      ) : (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <RoleSelector onRoleSelect={handleRoleSelect} />
        </div>
      )}
    </div>
  );
};
