
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const openAIApiKey = Deno.env.get("OPENAI_API_KEY")!;
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "No prompt provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Generating image with prompt: "${prompt}"`);
    
    // Enhance the prompt to ensure product-quality images
    const enhancedPrompt = `${prompt}. High-quality professional product photography, clean background, detailed texture, photorealistic, marketing image, no text overlays, commercial quality.`;
    
    // Call OpenAI API to generate image
    const openAIResponse = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAIApiKey}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: enhancedPrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "url"
      })
    });

    const openAIData = await openAIResponse.json();
    
    if (!openAIResponse.ok) {
      console.error("OpenAI API error:", openAIData);
      throw new Error(`OpenAI API error: ${openAIData.error?.message || "Unknown error"}`);
    }

    const imageUrl = openAIData.data[0].url;
    
    // Fetch the image data
    const imageResponse = await fetch(imageUrl);
    const imageBlob = await imageResponse.blob();
    
    // Generate unique file name
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 10);
    const fileName = `product_ai_${timestamp}_${randomString}.png`;
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from("product_images")
      .upload(`ai_generated/${fileName}`, imageBlob, {
        contentType: "image/png",
        cacheControl: "3600"
      });

    if (uploadError) {
      console.error("Error uploading to Storage:", uploadError);
      // If upload fails, return the original URL from OpenAI
      return new Response(
        JSON.stringify({ imageUrl }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Get public URL for the uploaded image
    const { data: { publicUrl } } = supabase
      .storage
      .from("product_images")
      .getPublicUrl(`ai_generated/${fileName}`);
    
    return new Response(
      JSON.stringify({ imageUrl: publicUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error in generate-product-image function:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred", details: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
