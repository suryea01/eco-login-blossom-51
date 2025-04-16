
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

export const PickupScheduler = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Pickup Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <CalendarComponent
              mode="single"
              className="rounded-md border"
            />
            <div className="space-y-4">
              <h3 className="font-medium">Upcoming Pickups</h3>
              {[
                { date: "2024-04-20", time: "10:00 AM", status: "upcoming" },
                { date: "2024-04-22", time: "2:00 PM", status: "upcoming" },
              ].map((pickup, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{pickup.date} - {pickup.time}</span>
                  </div>
                  <Badge variant={pickup.status === "upcoming" ? "default" : "secondary"}>
                    {pickup.status === "upcoming" ? (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-1" />
                    )}
                    {pickup.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
