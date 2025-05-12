
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get("OPENAI_API_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userId } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: "No message provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing chat request from user ${userId}: "${message}"`);
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are EcoBot, a sustainability expert assistant for the Econizhai platform. 
            Your primary role is to provide helpful, accurate information about sustainability, recycling, 
            waste management, eco-friendly practices, carbon footprint reduction, and environmental impact. 
            Keep your responses friendly, concise, and focused on sustainability topics.
            
            Key features of the Econizhai platform:
            1. Circular economy marketplace connecting waste sellers, recyclers, and eco-product buyers
            2. Users can post recyclable waste, buy eco-friendly products, and track their eco-impact
            3. Delivery volunteers help with waste pickup and product delivery
            
            Approach all questions with an environmental lens and offer practical, actionable advice.`
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      })
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;
    
    return new Response(
      JSON.stringify({ message: botMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in ecobot-chat function:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred", details: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
