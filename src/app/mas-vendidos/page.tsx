import { products } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";
import { TrendingUp, Award, Star } from "lucide-react";

export const metadata = {
  title: "Los Más Vendidos | MDP Market",
};

export default function MasVendidosPage() {
  // Mock best sellers: mix of featured and some other products, sorted pseudo-randomly
  const bestSellers = [...products].sort((a, b) => b.price - a.price).slice(0, 20);

  return (
    <div className="min-h-screen bg-[#ebebeb] pb-20 pt-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 flex items-center gap-4 rounded-3xl bg-slate-900 p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-64 w-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg relative z-10">
            <TrendingUp size={32} className="text-white" />
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl font-black tracking-tight">Los Más Vendidos</h1>
            <p className="mt-1 text-sm font-medium text-slate-400">Los productos más elegidos por los usuarios de Mar del Plata.</p>
          </div>
        </div>

        <div className="mb-8 grid gap-8 md:grid-cols-12">
          {/* Top 3 Podium */}
          <div className="md:col-span-12">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {bestSellers.slice(0, 3).map((product, idx) => (
                <div key={product.id} className="relative">
                  <div className={`absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#ebebeb] text-sm font-black text-white shadow-lg z-10 ${
                    idx === 0 ? 'bg-amber-500' : idx === 1 ? 'bg-slate-400' : 'bg-amber-700'
                  }`}>
                    #{idx + 1}
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
          
          {/* The rest */}
          <div className="md:col-span-12">
            <h2 className="mb-4 text-xl font-bold text-slate-900 flex items-center gap-2">
              <Star size={20} className="text-amber-500" />
              Más tendencias
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
              {bestSellers.slice(3).map((product, idx) => (
                <div key={product.id} className="relative">
                  <div className="absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/80 backdrop-blur text-[10px] font-bold text-white z-10">
                    {idx + 4}
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
