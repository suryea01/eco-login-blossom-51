
import { Search } from "lucide-react";

export const MarketplaceBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-green-900 to-green-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Eco-Friendly Marketplace</h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Discover sustainable products and recyclable materials in one place
        </p>
        
        <div className="max-w-2xl mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products and materials..."
            className="w-full py-3 pl-10 pr-4 rounded-lg bg-black/40 border border-gray-700 
                      placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
    </section>
  );
};
