
import { useState } from "react";
import { Upload, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export const WasteUploadForm = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request submitted",
      description: "Your waste upload request has been submitted successfully.",
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload Waste
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">Upload Image</Label>
            <Input id="image" type="file" accept="image/*" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Waste Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select waste type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="plastic">Plastic</SelectItem>
                <SelectItem value="paper">Paper</SelectItem>
                <SelectItem value="metal">Metal</SelectItem>
                <SelectItem value="glass">Glass</SelectItem>
                <SelectItem value="organic">Organic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (kg)</Label>
              <Input id="quantity" type="number" min="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (optional)</Label>
              <Input id="price" type="number" min="0" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Input id="location" placeholder="Enter pickup location" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickup-time" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Pickup Time
            </Label>
            <Input id="pickup-time" type="datetime-local" />
          </div>

          <Button type="submit" className="w-full">Submit Request</Button>
        </form>
      </CardContent>
    </Card>
  );
};
