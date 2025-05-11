
import { ProductType } from "@/types/productTypes";

export const mockProducts: ProductType[] = [
  {
    id: "1",
    name: "Bamboo Utensil Set",
    price: 18.99,
    description: "Handcrafted bamboo utensil set complete with knife, fork, spoon, and chopsticks. Perfect for on-the-go meals without single-use plastic.",
    images: [
      "https://images.unsplash.com/photo-1584949514490-73fc2b3e4391?q=80&w=2674&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584949161767-4513950c7e89?q=80&w=2674&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584949144891-717ac2275323?q=80&w=2674&auto=format&fit=crop"
    ],
    category: "Home Goods",
    rating: 4.8,
    reviews: 128,
    ecoPoints: 15,
    co2Impact: 2.4,
    inStock: true,
    materialSource: "Sustainably harvested bamboo from certified forests in China",
    seller: {
      id: "s1",
      name: "EcoLiving Co."
    },
    specifications: {
      material: "Bamboo",
      weight: "120g",
      dimensions: "24cm x 8cm x 2cm",
      manufacturing: "Hand-crafted"
    }
  },
  {
    id: "2",
    name: "Recycled Ocean Plastic Water Bottle",
    price: 24.99,
    description: "Made from 100% recycled ocean plastic, this durable 750ml water bottle keeps drinks cold for 24 hours and hot for 12 hours. Each purchase helps fund ocean cleanup projects.",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=2736&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1536939459926-301728717817?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Accessories",
    rating: 4.9,
    reviews: 256,
    ecoPoints: 25,
    co2Impact: 3.8,
    inStock: true,
    materialSource: "Plastic collected from ocean cleanup operations in Southeast Asia",
    seller: {
      id: "s2",
      name: "OceanRevive"
    },
    specifications: {
      material: "Recycled Ocean Plastic",
      weight: "350g",
      dimensions: "25cm x 7cm x 7cm",
      manufacturing: "Clean energy production"
    }
  },
  {
    id: "3",
    name: "Organic Cotton Tote Bag",
    price: 15.99,
    description: "Durable tote bag made from 100% organic cotton. Perfect for grocery shopping and everyday use. Eliminates the need for dozens of plastic bags.",
    images: [
      "https://images.unsplash.com/photo-1591373471791-6b0482804961?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1680900262570-8c151dc7a9ac?q=80&w=2731&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1687339854976-9fb8f2591e96?q=80&w=2671&auto=format&fit=crop"
    ],
    category: "Fashion",
    rating: 4.7,
    reviews: 189,
    ecoPoints: 12,
    co2Impact: 1.9,
    inStock: true,
    materialSource: "Organic cotton farms in India, certified fair trade",
    seller: {
      id: "s3",
      name: "Green Textiles"
    },
    specifications: {
      material: "Organic Cotton",
      weight: "180g",
      dimensions: "38cm x 42cm x 10cm",
      manufacturing: "Low waste production"
    }
  },
  {
    id: "4",
    name: "Solar-Powered Phone Charger",
    price: 39.99,
    description: "Portable solar panel and battery bank combination. Charge your devices using clean solar energy anywhere with sunlight. Includes multiple connector types.",
    images: [
      "https://images.unsplash.com/photo-1566731851534-a28dbaffee95?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1628344955333-75d01cd0a3be?q=80&w=2137&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2564&auto=format&fit=crop"
    ],
    category: "Electronics",
    rating: 4.5,
    reviews: 238,
    ecoPoints: 30,
    co2Impact: 5.2,
    inStock: true,
    materialSource: "Recycled electronics components and sustainable materials",
    seller: {
      id: "s4",
      name: "SolarTech"
    },
    specifications: {
      material: "Recycled Plastic and Silicon",
      weight: "280g",
      dimensions: "15cm x 8cm x 2cm",
      manufacturing: "Solar powered factory"
    }
  },
  {
    id: "5",
    name: "Beeswax Food Wraps (Set of 3)",
    price: 16.95,
    description: "Reusable food wraps made from organic cotton infused with beeswax, jojoba oil, and tree resin. A sustainable alternative to plastic wrap. Keeps food fresh naturally.",
    images: [
      "https://images.unsplash.com/photo-1611118932698-2f8913e6f927?q=80&w=2148&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611119331879-1a6a6337c156?q=80&w=2148&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611126840053-b219d60ba19b?q=80&w=2148&auto=format&fit=crop"
    ],
    category: "Home Goods",
    rating: 4.7,
    reviews: 156,
    ecoPoints: 18,
    co2Impact: 2.0,
    inStock: true,
    materialSource: "Beeswax from sustainable apiaries, organic cotton from certified farms",
    seller: {
      id: "s5",
      name: "Bee Green"
    },
    specifications: {
      material: "Organic Cotton, Beeswax, Jojoba Oil, Tree Resin",
      weight: "85g",
      dimensions: "Various sizes in pack",
      manufacturing: "Handmade"
    }
  },
  {
    id: "6",
    name: "Recycled Tire Doormat",
    price: 29.99,
    description: "Durable outdoor doormat made from 100% recycled rubber tires. Weather-resistant and easy to clean. Helps keep discarded tires out of landfills.",
    images: [
      "https://images.unsplash.com/photo-1606841849829-d93550642114?q=80&w=2746&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504099631398-16d729f83f50?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525173236795-66100cec0c2e?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Home Goods",
    rating: 4.6,
    reviews: 97,
    ecoPoints: 20,
    co2Impact: 3.5,
    inStock: false,
    materialSource: "Recycled rubber from used tires collected in urban areas",
    seller: {
      id: "s6",
      name: "Upcycle House"
    },
    specifications: {
      material: "Recycled Rubber",
      weight: "1.8kg",
      dimensions: "60cm x 40cm x 1.5cm",
      manufacturing: "Low energy production"
    }
  },
  {
    id: "7",
    name: "Biodegradable Phone Case",
    price: 22.50,
    description: "Protective phone case made from plant-based materials that will biodegrade when composted. Available for multiple phone models and in various colors.",
    images: [
      "https://images.unsplash.com/photo-1598327105854-09a2a4c73405?q=80&w=2727&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509741102003-ca64bfe5f069?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630746638401-7c31e26df656?q=80&w=2268&auto=format&fit=crop"
    ],
    category: "Accessories",
    rating: 4.4,
    reviews: 142,
    ecoPoints: 15,
    co2Impact: 1.2,
    inStock: true,
    materialSource: "Plant-based bioplastic derived from agricultural waste",
    seller: {
      id: "s7",
      name: "EcoTech Accessories"
    },
    specifications: {
      material: "PLA Bioplastic",
      weight: "35g",
      dimensions: "Phone model dependent",
      manufacturing: "Zero waste production"
    }
  },
  {
    id: "8",
    name: "Hemp Bath Towel Set",
    price: 42.99,
    description: "Set of two ultra-absorbent bath towels made from 100% hemp fiber. Naturally antimicrobial and quick-drying. Becomes softer with each wash.",
    images: [
      "https://images.unsplash.com/photo-1585412722632-ac027b621ab9?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606394854062-05d88d7088b3?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Home Goods",
    rating: 4.8,
    reviews: 76,
    ecoPoints: 22,
    co2Impact: 2.8,
    inStock: true,
    materialSource: "Hemp grown without pesticides or artificial fertilizers in Europe",
    seller: {
      id: "s8",
      name: "Hemp Living"
    },
    specifications: {
      material: "100% Hemp Fiber",
      weight: "450g each",
      dimensions: "140cm x 70cm",
      manufacturing: "Water-saving process"
    }
  },
  {
    id: "9",
    name: "Reclaimed Wood Wall Clock",
    price: 49.95,
    description: "Handcrafted wall clock made from reclaimed wood from old barns. Each piece is unique with its own character and history. Silent quartz movement.",
    images: [
      "https://images.unsplash.com/photo-1563117016-6c7dfc0d9976?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526739178601-a790acc5be76?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548617839-9a1ca151eda1?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "Home Goods",
    rating: 4.9,
    reviews: 64,
    ecoPoints: 18,
    co2Impact: 0.8,
    inStock: true,
    materialSource: "Reclaimed wood from dismantled barns in rural America",
    seller: {
      id: "s9",
      name: "Reclaimed Crafts"
    },
    specifications: {
      material: "Reclaimed Wood",
      weight: "850g",
      dimensions: "30cm diameter x 4cm depth",
      manufacturing: "Handcrafted"
    }
  }
];
