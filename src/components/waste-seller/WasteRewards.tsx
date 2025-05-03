
import { Award, Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useRef, useState, useEffect } from "react";

export const WasteRewards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  // Animation for progress bar
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setProgressValue(90);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);
  
  // Check if component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  const recentRewards = [
    { title: "Eco Warrior Badge", points: 100, date: "2024-04-15", description: "Recycled 50kg of plastic" },
    { title: "Green Champion", points: 200, date: "2024-04-10", description: "Completed 10 waste pickups" },
    { title: "Climate Hero", points: 150, date: "2024-04-05", description: "Saved 25kg CO₂ emissions" }
  ];

  return (
    <div 
      className="space-y-4 animate-[fadeIn_0.5s_ease-out]" 
      ref={cardsRef}
      aria-label="Rewards and achievements section"
    >
      <Card className="card-hover overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-eco-primary/10 to-transparent">
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-eco-primary" />
            <span>Eco-Points</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-end gap-2">
            <div className="text-3xl font-bold transition-all duration-500">450</div>
            <div className="text-xl text-muted-foreground">points</div>
            <Badge className="ml-auto flex items-center" variant="outline">
              <TrendingUp className="w-3 h-3 mr-1 text-eco-primary" />
              <span className="text-xs text-eco-primary">+45 this week</span>
            </Badge>
          </div>
          
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to next reward</span>
              <span aria-label="450 points out of 500 needed">450/500</span>
            </div>
            <Progress 
              value={progressValue} 
              className="h-2 transition-all duration-1000 ease-out"
              aria-label="Progress toward next reward: 90% complete" 
            />
            <p className="text-xs text-muted-foreground">
              Just 50 more points to unlock the "Sustainability Champion" badge
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardHeader className="bg-gradient-to-r from-eco-primary/10 to-transparent">
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-eco-primary" />
            <span>Recent Rewards</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRewards.map((reward, index) => (
              <div 
                key={index} 
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 transition-all hover:bg-accent/30 p-2 rounded-md"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div>
                  <div className="font-medium">{reward.title}</div>
                  <div className="text-sm text-muted-foreground">{reward.date}</div>
                  <div className="text-xs mt-1 hidden sm:block">{reward.description}</div>
                </div>
                <Badge 
                  variant="secondary" 
                  className="mt-2 sm:mt-0 self-start sm:self-auto hover-scale"
                  aria-label={`${reward.points} eco points earned`}
                >
                  {reward.points} points
                </Badge>
              </div>
            ))}
          </div>
          
          {recentRewards.length === 0 && (
            <div className="empty-state text-center py-8">
              <Star className="w-12 h-12 text-muted-foreground/30 mb-2" />
              <p>You haven't earned any rewards yet</p>
              <p className="text-sm mt-2">Start recycling to earn your first badge!</p>
            </div>
          )}
          
          <button 
            className="w-full mt-4 text-sm text-primary hover:underline transition-all focus:outline-none focus:text-primary-foreground focus:bg-primary rounded px-3 py-1"
            aria-label="View all rewards and achievements"
          >
            View all rewards
          </button>
        </CardContent>
      </Card>
    </div>
  );
};
