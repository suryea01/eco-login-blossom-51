
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Image, RefreshCw, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface AiImageGeneratorProps {
  onImageGenerated: (imageUrl: string) => void;
  productName?: string;
  productMaterial?: string;
}

export const AiImageGenerator = ({ onImageGenerated, productName = "", productMaterial = "" }: AiImageGeneratorProps) => {
  const [prompt, setPrompt] = useState<string>(`A high-quality professional product photo of ${productName} made from ${productMaterial}`);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description for the image");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-product-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Error generating image: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        onImageGenerated(data.imageUrl);
        toast.success("Image successfully generated!");
      } else {
        throw new Error("No image was generated");
      }
    } catch (err: any) {
      console.error("Error generating image:", err);
      setError(err.message || "Failed to generate image. Please try again.");
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateImage = () => {
    setGeneratedImage(null);
    handleGenerateImage();
  };

  const handleUseDefaultPrompt = () => {
    if (productName && productMaterial) {
      const defaultPrompt = `A high-quality professional product photo of ${productName} made from ${productMaterial}, on a clean white background, showcasing environmental sustainability`;
      setPrompt(defaultPrompt);
    } else {
      toast.info("Please enter product name and material first");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-medium">AI Image Generator</h3>
      </div>

      <div className="space-y-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="image-prompt" className="text-sm font-medium">
            Image Description
          </label>
          <div className="flex gap-2">
            <Input
              id="image-prompt"
              placeholder="Describe the product image you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1"
            />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleUseDefaultPrompt}
              title="Use default prompt based on product details"
            >
              Default
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            For best results, describe the product, materials, setting, and style
          </p>
        </div>

        {!generatedImage ? (
          <Button
            onClick={handleGenerateImage}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating Image...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Product Image
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleRegenerateImage}
            disabled={isGenerating}
            variant="outline"
            className="w-full"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Regenerating...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate Another Image
              </>
            )}
          </Button>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-md p-3 text-sm flex items-start gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {generatedImage && (
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square relative">
                <img
                  src={generatedImage}
                  alt="AI-generated product"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  AI Generated
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
