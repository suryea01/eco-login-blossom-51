
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-4 w-full max-w-sm">
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="email"
          placeholder="Email or Phone"
          className="pl-10 h-12 bg-white border-gray-200"
        />
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="pl-10 pr-10 h-12 bg-white border-gray-200"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      <Button
        type="submit"
        className="w-full h-12 bg-eco-primary hover:bg-eco-dark text-white transition-colors"
      >
        Log In
      </Button>
      
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-gray-500">or</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full h-12 border-2"
      >
        Create New Account
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full h-12 border-2"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="w-5 h-5 mr-2"
        />
        Continue with Google
      </Button>

      <div className="text-center">
        <a href="#" className="text-eco-primary hover:text-eco-dark text-sm">
          Forgot Password?
        </a>
      </div>
    </form>
  );
};
