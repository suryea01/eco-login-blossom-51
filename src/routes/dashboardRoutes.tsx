
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

interface DashboardRoute {
  path: string;
  element: ReactNode;
}

// Waste Seller Dashboard Components
const WasteSellerDashboard = () => (
  <DashboardLayout role="waste-seller">
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Waste Seller Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium">Total Waste Posted</h3>
          <p className="text-2xl font-bold">120 kg</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium">CO₂ Saved</h3>
          <p className="text-2xl font-bold">50 kg</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium">Pending Pickups</h3>
          <p className="text-2xl font-bold">3</p>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

// Waste Buyer Dashboard Components
const WasteBuyerDashboard = () => (
  <DashboardLayout role="waste-buyer">
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Waste Buyer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium">Waste Processed</h3>
          <p className="text-2xl font-bold">500 kg</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium">Active Orders</h3>
          <p className="text-2xl font-bold">8</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium">Certifications</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

// Product Seller Dashboard Components
const ProductSellerDashboard = () => (
  <DashboardLayout role="product-seller">
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Product Seller Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium">Products Listed</h3>
          <p className="text-2xl font-bold">25</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium">Total Sales</h3>
          <p className="text-2xl font-bold">$1,200</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium">Active Orders</h3>
          <p className="text-2xl font-bold">5</p>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

// Product Buyer Dashboard Components
const ProductBuyerDashboard = () => (
  <DashboardLayout role="product-buyer">
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Product Buyer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium">Orders</h3>
          <p className="text-2xl font-bold">15</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium">CO₂ Impact</h3>
          <p className="text-2xl font-bold">30 kg</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium">Eco Points</h3>
          <p className="text-2xl font-bold">450</p>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

// Delivery Dashboard Components
const DeliveryDashboard = () => (
  <DashboardLayout role="delivery">
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Delivery Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium">Available Tasks</h3>
          <p className="text-2xl font-bold">8</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium">Completed Tasks</h3>
          <p className="text-2xl font-bold">45</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium">Rating</h3>
          <p className="text-2xl font-bold">4.8</p>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

// AI Assistant Dashboard Components
const AIAssistantDashboard = () => (
  <DashboardLayout role="ai-assistant">
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">AI Assistant Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium">Active Sessions</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium">Queries Resolved</h3>
          <p className="text-2xl font-bold">156</p>
        </div>
      </div>
    </div>
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
