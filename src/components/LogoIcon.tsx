
import { Leaf } from "lucide-react";

export const LogoIcon = () => {
  return (
    <div className="relative w-20 h-20 mx-auto mb-6">
      <div className="absolute inset-0 bg-eco-primary/10 rounded-full animate-pulse" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Leaf className="w-10 h-10 text-eco-primary" />
      </div>
    </div>
  );
};
