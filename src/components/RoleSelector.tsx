
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Recycle, ShoppingBag, Truck, Bot, BadgeDollarSign, Leaf } from "lucide-react";

interface Role {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
}

export const RoleSelector = ({ onRoleSelect }: { onRoleSelect: (role: string) => void }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const navigate = useNavigate();
  
  const roles: Role[] = [
    {
      id: "waste-seller",
      title: "Waste Seller",
      description: "Sell your recyclable waste",
      icon: Recycle,
      path: "/dashboard/waste-seller"
    },
    {
      id: "waste-buyer",
      title: "Waste Buyer / Recycler",
      description: "Purchase waste for recycling",
      icon: BadgeDollarSign,
      path: "/dashboard/waste-buyer"
    },
    {
      id: "product-seller",
      title: "Product Seller / Upcycler",
      description: "Sell upcycled eco-products",
      icon: Leaf,
      path: "/dashboard/product-seller"
    },
    {
      id: "product-buyer",
      title: "Product Buyer",
      description: "Shop for sustainable products",
      icon: ShoppingBag,
      path: "/dashboard/product-buyer"
    },
    {
      id: "delivery-volunteer",
      title: "Delivery Volunteer",
      description: "Help with pickups and deliveries",
      icon: Truck,
      path: "/dashboard/delivery"
    },
    {
      id: "ai-assistant",
      title: "ECOBOT Assistant",
      description: "Get AI help with waste management",
      icon: Bot,
      path: "/dashboard/ai-assistant"
    }
  ];

  useEffect(() => {
    // Set animation to complete after roles have animated in
    const timer = setTimeout(() => setIsAnimationComplete(true), roles.length * 100 + 400);
    return () => clearTimeout(timer);
  }, [roles.length]);

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      const selectedRoleData = roles.find(r => r.id === selectedRole);
      if (selectedRoleData) {
        localStorage.setItem('userRole', selectedRole);
        onRoleSelect(selectedRole);
        navigate(selectedRoleData.path);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center animate-[fadeIn_0.5s_ease-out]">
        <h2 className="text-2xl font-bold mb-2">Select Your Role</h2>
        <p className="text-muted-foreground text-sm">Choose how you want to use EcoLogin Blossom</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roles.map((role, index) => (
          <Card 
            key={role.id}
            className={`cursor-pointer transition-all duration-300 ${
              selectedRole === role.id 
                ? "border-2 border-primary bg-primary/5 dark:bg-primary/20 shadow-md" 
                : "border hover:border-primary/50 hover:-translate-y-1 hover:shadow-md"
            } animate-[fadeIn_0.5s_ease-out]`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleRoleSelection(role.id)}
            tabIndex={0}
            role="button"
            aria-pressed={selectedRole === role.id}
            aria-label={`Select role: ${role.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleRoleSelection(role.id);
                e.preventDefault();
              }
            }}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <role.icon className={`w-8 h-8 mb-2 transition-colors duration-300 ${
                selectedRole === role.id ? "text-primary" : "text-muted-foreground"
              }`} />
              <h3 className="font-medium text-sm">{role.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{role.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={handleContinue}
        disabled={!selectedRole}
        className={`w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-500 ${
          isAnimationComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        } hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:pointer-events-none`}
        aria-label={selectedRole ? `Continue as ${roles.find(r => r.id === selectedRole)?.title}` : "Select a role to continue"}
      >
        Continue as {selectedRole ? roles.find(r => r.id === selectedRole)?.title : "Selected Role"}
      </Button>
    </div>
  );
};
