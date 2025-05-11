
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export const ProductFilters = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prevCategories =>
      prevCategories.includes(category)
        ? prevCategories.filter(c => c !== category)
        : [...prevCategories, category]
    );
  };
  
  const handleMaterialChange = (material: string) => {
    setSelectedMaterials(prevMaterials =>
      prevMaterials.includes(material)
        ? prevMaterials.filter(m => m !== material)
        : [...prevMaterials, material]
    );
  };
  
  const handleRatingChange = (rating: number) => {
    setSelectedRatings(prevRatings =>
      prevRatings.includes(rating)
        ? prevRatings.filter(r => r !== rating)
        : [...prevRatings, rating]
    );
  };
  
  const clearFilters = () => {
    setPriceRange([0, 200]);
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setSelectedRatings([]);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs"
          onClick={clearFilters}
        >
          Clear All
        </Button>
      </div>
      
      {(selectedCategories.length > 0 || selectedMaterials.length > 0 || selectedRatings.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map(category => (
            <Badge 
              key={category}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleCategoryChange(category)}
            >
              {category} ×
            </Badge>
          ))}
          {selectedMaterials.map(material => (
            <Badge 
              key={material}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleMaterialChange(material)}
            >
              {material} ×
            </Badge>
          ))}
          {selectedRatings.map(rating => (
            <Badge 
              key={rating}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleRatingChange(rating)}
            >
              {rating}★ & up ×
            </Badge>
          ))}
        </div>
      )}
      
      <div>
        <h4 className="mb-3 font-medium">Price Range</h4>
        <div className="px-2">
          <Slider
            defaultValue={[0, 200]}
            min={0}
            max={200}
            step={1}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h4 className="mb-3 font-medium">Category</h4>
        <div className="space-y-2">
          {['Home Goods', 'Fashion', 'Beauty', 'Food', 'Accessories'].map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`} 
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h4 className="mb-3 font-medium">Material</h4>
        <div className="space-y-2">
          {['Recycled Plastic', 'Organic Cotton', 'Bamboo', 'Reclaimed Wood', 'Hemp'].map((material) => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox 
                id={`material-${material}`} 
                checked={selectedMaterials.includes(material)}
                onCheckedChange={() => handleMaterialChange(material)}
              />
              <Label htmlFor={`material-${material}`} className="text-sm cursor-pointer">
                {material}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h4 className="mb-3 font-medium">Customer Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox 
                id={`rating-${rating}`} 
                checked={selectedRatings.includes(rating)}
                onCheckedChange={() => handleRatingChange(rating)}
              />
              <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center">
                {rating}★ & up
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h4 className="mb-3 font-medium">Environmental Impact</h4>
        <div className="space-y-2">
          {['Carbon-Neutral', 'Plastic-Free', 'Water-Saving', 'Energy-Efficient'].map((impact) => (
            <div key={impact} className="flex items-center space-x-2">
              <Checkbox id={`impact-${impact}`} />
              <Label htmlFor={`impact-${impact}`} className="text-sm cursor-pointer">
                {impact}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
