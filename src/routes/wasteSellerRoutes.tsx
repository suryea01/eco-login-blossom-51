
import { Navigate } from "react-router-dom";
import { WasteUploadForm } from "@/components/waste-seller/WasteUploadForm";
import { PickupScheduler } from "@/components/waste-seller/PickupScheduler";
import { WasteStatistics } from "@/components/waste-seller/WasteStatistics";
import { WasteRewards } from "@/components/waste-seller/WasteRewards";

export const wasteSellerRoutes = [
  {
    path: "/dashboard/waste-seller/upload",
    element: <WasteUploadForm />,
  },
  {
    path: "/dashboard/waste-seller/pickups",
    element: <PickupScheduler />,
  },
  {
    path: "/dashboard/waste-seller/stats",
    element: <WasteStatistics />,
  },
  {
    path: "/dashboard/waste-seller/rewards",
    element: <WasteRewards />,
  },
];
