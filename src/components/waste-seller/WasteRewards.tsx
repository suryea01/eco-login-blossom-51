
import { Award, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export const WasteRewards = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Eco-Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">450 points</div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to next reward</span>
              <span>450/500</span>
            </div>
            <Progress value={90} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Recent Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: "Eco Warrior Badge", points: 100, date: "2024-04-15" },
              { title: "Green Champion", points: 200, date: "2024-04-10" },
            ].map((reward, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-2">
                <div>
                  <div className="font-medium">{reward.title}</div>
                  <div className="text-sm text-muted-foreground">{reward.date}</div>
                </div>
                <Badge variant="secondary">{reward.points} points</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
