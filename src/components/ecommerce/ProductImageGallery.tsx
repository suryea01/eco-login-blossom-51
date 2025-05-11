
import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

export const ProductImageGallery = ({ images, name }: ProductImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const selectImage = (index: number) => {
    setActiveIndex(index);
  };
  
  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-square bg-background overflow-hidden rounded-md">
        <img 
          src={images[activeIndex]} 
          alt={`${name} - Image ${activeIndex + 1}`} 
          className="w-full h-full object-cover"
        />
        
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </Button>
          </>
        )}
        
        {/* Zoom button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 bottom-2 bg-background/80 hover:bg-background"
          aria-label="Zoom image"
        >
          <ZoomIn size={16} />
        </Button>
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={`relative w-16 h-16 flex-shrink-0 overflow-hidden rounded ${
                activeIndex === index
                  ? "ring-2 ring-primary ring-offset-2"
                  : "ring-1 ring-muted hover:ring-muted-foreground/30"
              }`}
            >
              <img 
                src={image} 
                alt={`${name} - Thumbnail ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
