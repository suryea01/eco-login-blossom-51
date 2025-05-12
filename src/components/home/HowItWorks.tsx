
import { Recycle, Leaf, ShoppingCart, Users } from "lucide-react";

export const HowItWorks = () => {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">How Econizhai Works</h2>
        <p className="text-xl text-center text-gray-300 mb-12">
          Our platform connects four key stakeholders in the waste management ecosystem
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Waste Sellers */}
          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-green-500 transition-colors">
            <div className="bg-green-100/20 h-16 w-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Recycle className="text-green-500" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-center">Waste Sellers</h3>
            <p className="text-gray-400 text-center">
              Households and businesses upload their recyclable waste for collection and earn rewards
            </p>
            <div className="mt-6 text-center">
              <button className="text-green-500 hover:text-green-400 flex items-center justify-center gap-1 mx-auto">
                Get started <span className="ml-1">→</span>
              </button>
            </div>
          </div>

          {/* Recyclers */}
          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-green-500 transition-colors">
            <div className="bg-green-100/20 h-16 w-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Leaf className="text-green-500" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-center">Recyclers</h3>
            <p className="text-gray-400 text-center">
              Organizations that collect and process recyclable materials into new products
            </p>
            <div className="mt-6 text-center">
              <button className="text-green-500 hover:text-green-400 flex items-center justify-center gap-1 mx-auto">
                Join now <span className="ml-1">→</span>
              </button>
            </div>
          </div>

          {/* Buyers */}
          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-green-500 transition-colors">
            <div className="bg-green-100/20 h-16 w-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <ShoppingCart className="text-green-500" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-center">Buyers</h3>
            <p className="text-gray-400 text-center">
              Consumers who purchase sustainable, eco-friendly products made from recycled materials
            </p>
            <div className="mt-6 text-center">
              <button className="text-green-500 hover:text-green-400 flex items-center justify-center gap-1 mx-auto">
                Shop now <span className="ml-1">→</span>
              </button>
            </div>
          </div>

          {/* Volunteers */}
          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-green-500 transition-colors">
            <div className="bg-green-100/20 h-16 w-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Users className="text-green-500" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-center">Volunteers</h3>
            <p className="text-gray-400 text-center">
              Community members who support deliveries, campaigns, and educational initiatives
            </p>
            <div className="mt-6 text-center">
              <button className="text-green-500 hover:text-green-400 flex items-center justify-center gap-1 mx-auto">
                Volunteer <span className="ml-1">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
