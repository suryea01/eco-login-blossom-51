
import { LogoIcon } from "@/components/LogoIcon";
import { LoginForm } from "@/components/LoginForm";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter flex flex-col items-center justify-center p-6 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center animate-[fadeIn_0.5s_ease-out]">
          <LogoIcon />
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-eco-primary to-eco-accent bg-clip-text text-transparent">
            ECOGREEN
          </h1>
          <p className="text-muted-foreground text-sm">Turning Waste into Wealth</p>
        </div>

        <LoginForm />

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
