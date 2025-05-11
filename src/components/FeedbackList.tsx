
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

type FeedbackItem = {
  id: string;
  name: string;
  email: string;
  feedback_text: string;
  sentiment_score: number;
  created_at: string;
};

export const FeedbackList = () => {
  const { profile } = useAuth();
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const { data, error } = await supabase
          .from("feedback")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        
        setFeedbackList(data as FeedbackItem[]);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    if (profile?.role === 'ai-assistant') {
      fetchFeedback();
    }
  }, [profile]);

  if (profile?.role !== 'ai-assistant') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>You need admin privileges to view feedback.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getSentimentColor = (score: number) => {
    if (score >= 0.7) return "bg-green-500";
    if (score >= 0.4) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Feedback Submissions</h2>
      {loading ? (
        <p>Loading feedback...</p>
      ) : feedbackList.length === 0 ? (
        <p>No feedback submissions yet.</p>
      ) : (
        <div className="grid gap-4">
          {feedbackList.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>{item.email}</CardDescription>
                  </div>
                  <Badge 
                    className={`${getSentimentColor(item.sentiment_score)} text-white`}
                  >
                    Sentiment: {(item.sentiment_score * 100).toFixed(0)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2">{item.feedback_text}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
