
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface DashboardRoute {
  path: string;
  element: ReactNode;
}

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
    </div>
  );
};

// Placeholder dashboard components
const WasteSellerDashboard = () => (
  <DashboardLayout>
    <h1 className="text-2xl font-bold mb-4">Waste Seller Dashboard</h1>
    <p className="text-gray-600">Welcome to your waste seller dashboard!</p>
  </DashboardLayout>
);

const WasteBuyerDashboard = () => (
  <DashboardLayout>
    <h1 className="text-2xl font-bold mb-4">Waste Buyer Dashboard</h1>
    <p className="text-gray-600">Welcome to your waste buyer dashboard!</p>
  </DashboardLayout>
);

const ProductSellerDashboard = () => (
  <DashboardLayout>
    <h1 className="text-2xl font-bold mb-4">Product Seller Dashboard</h1>
    <p className="text-gray-600">Welcome to your product seller dashboard!</p>
  </DashboardLayout>
);

const ProductBuyerDashboard = () => (
  <DashboardLayout>
    <h1 className="text-2xl font-bold mb-4">Product Buyer Dashboard</h1>
    <p className="text-gray-600">Welcome to your product buyer dashboard!</p>
  </DashboardLayout>
);

const DeliveryDashboard = () => (
  <DashboardLayout>
    <h1 className="text-2xl font-bold mb-4">Delivery Volunteer Dashboard</h1>
    <p className="text-gray-600">Welcome to your delivery dashboard!</p>
  </DashboardLayout>
);

const AIAssistantDashboard = () => (
  <DashboardLayout>
    <h1 className="text-2xl font-bold mb-4">AI Assistant Dashboard</h1>
    <p className="text-gray-600">Welcome to your AI assistant dashboard!</p>
  </DashboardLayout>
);

export const dashboardRoutes: DashboardRoute[] = [
  {
    path: "/dashboard/waste-seller",
    element: <WasteSellerDashboard />,
  },
  {
    path: "/dashboard/waste-buyer",
    element: <WasteBuyerDashboard />,
  },
  {
    path: "/dashboard/product-seller",
    element: <ProductSellerDashboard />,
  },
  {
    path: "/dashboard/product-buyer",
    element: <ProductBuyerDashboard />,
  },
  {
    path: "/dashboard/delivery",
    element: <DeliveryDashboard />,
  },
  {
    path: "/dashboard/ai-assistant",
    element: <AIAssistantDashboard />,
  },
  {
    path: "/dashboard",
    element: <Navigate to="/dashboard/waste-seller" replace />,
  },
];
