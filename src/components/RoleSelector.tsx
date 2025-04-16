
import { useState } from "react";
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
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Role</h2>
        <p className="text-gray-500 text-sm">Choose how you want to use ECONIZHAI</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {roles.map((role) => (
          <Card 
            key={role.id}
            className={`cursor-pointer transition-all ${
              selectedRole === role.id 
                ? "border-2 border-eco-primary bg-eco-primary/5" 
                : "border border-gray-200 hover:border-eco-primary/50"
            }`}
            onClick={() => handleRoleSelection(role.id)}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <role.icon className={`w-8 h-8 mb-2 ${
                selectedRole === role.id ? "text-eco-primary" : "text-gray-500"
              }`} />
              <h3 className="font-medium text-sm">{role.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{role.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={handleContinue}
        disabled={!selectedRole}
        className="w-full h-12 bg-eco-primary hover:bg-eco-dark text-white transition-colors"
      >
        Continue as {selectedRole ? roles.find(r => r.id === selectedRole)?.title : "Selected Role"}
      </Button>
    </div>
  );
};
