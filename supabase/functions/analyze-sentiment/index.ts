
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    
    if (!text) {
      return new Response(
        JSON.stringify({ error: 'No text provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Simple mock sentiment analysis function
    // In a real implementation, we would use OpenAI or another NLP service
    const analyzeSentiment = (text: string): number => {
      // Mock positive words
      const positiveWords = [
        'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
        'happy', 'love', 'best', 'awesome', 'helpful', 'positive', 'like'
      ];
      
      // Mock negative words
      const negativeWords = [
        'bad', 'terrible', 'awful', 'horrible', 'poor', 'worst',
        'hate', 'dislike', 'negative', 'useless', 'disappointing', 'error'
      ];
      
      const lowerText = text.toLowerCase();
      let score = 0.5; // Neutral starting point
      
      // Count positive and negative words
      let positiveCount = 0;
      let negativeCount = 0;
      
      positiveWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = lowerText.match(regex);
        if (matches) positiveCount += matches.length;
      });
      
      negativeWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = lowerText.match(regex);
        if (matches) negativeCount += matches.length;
      });
      
      // Calculate sentiment score (0 = very negative, 1 = very positive)
      const totalWords = positiveCount + negativeCount;
      if (totalWords > 0) {
        score = positiveCount / totalWords;
      }
      
      // Return score
      return score;
    };

    const score = analyzeSentiment(text);

    return new Response(
      JSON.stringify({ score }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in analyze-sentiment function:", error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
