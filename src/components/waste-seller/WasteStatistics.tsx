
import { BarChart2, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const WasteStatistics = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5" />
            Total Waste Posted
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">120 kg</div>
          <p className="text-sm text-muted-foreground">Last 30 days</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-5 h-5" />
            CO₂ Saved
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">50 kg</div>
          <p className="text-sm text-muted-foreground">Total impact</p>
        </CardContent>
      </Card>
    </div>
  );
};
