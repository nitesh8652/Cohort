import { ImageIcon, ShoppingCart, Star } from "lucide-react";

const ProductCard = () => {
  return (
    <div
      className="w-full max-w-[260px] bg-[#111111] border border-white/12 rounded-3xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-lime-300/60 hover:shadow-[0_20px_40px_rgba(0,0,0,.45)]"
    >
      <div className="h-[220px] bg-zinc-100 flex items-center justify-center rounded-t-3xl relative transition-all duration-300 ease-in-out">
        <div className="flex flex-col items-center gap-1">
          <ImageIcon className="text-gray-400" size={40} strokeWidth={1.5} />
          <span className="text-gray-400 text-sm font-medium">Image Placeholder</span>
        </div>
        <span className="absolute top-3 left-3 bg-[#6B7280] text-white text-xs font-medium px-3 py-1 rounded-full">
          Electronics
        </span>
      </div>

      <div className="p-5 space-y-3">
        <p className="text-gray-500 text-xs uppercase tracking-wide">Electronics</p>

        <h3 className="text-lg font-semibold text-white leading-snug line-clamp-2 transition-all duration-300 ease-in-out">
          Wireless Bluetooth Headphones
        </h3>

        <div className="flex items-center gap-2">
          <div className="flex text-[#FACC15]">
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
          </div>
          <span className="text-gray-500 text-sm">(120)</span>
        </div>

        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-lime-300">$99.99</span>
            <button
              className="flex items-center gap-2 bg-[#D9FF00] text-black font-semibold px-5 py-2 rounded-full transition-all duration-300 ease-in-out hover:brightness-110 hover:scale-105 hover:shadow-[0_0_20px_rgba(217,255,0,.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
              aria-label="Add Wireless Bluetooth Headphones to cart"
            >
              <ShoppingCart size={16} />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
