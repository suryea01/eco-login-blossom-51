
import { LogoIcon } from "@/components/LogoIcon";
import { LoginForm } from "@/components/LoginForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-inter flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <LogoIcon />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ECONIZHAI</h1>
          <p className="text-gray-500 text-sm">Turning Waste into Wealth</p>
        </div>

        <LoginForm />

        <p className="text-center text-xs text-gray-500 mt-8">
          By continuing, you agree to our{" "}
          <a href="#" className="text-eco-primary hover:text-eco-dark">
            Terms
          </a>{" "}
          &{" "}
          <a href="#" className="text-eco-primary hover:text-eco-dark">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Index;
