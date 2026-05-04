import { products } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";
import { Zap, Flame, Percent } from "lucide-react";

export const metadata = {
  title: "Ofertas y Oportunidades | MDP Market",
};

export default function OfertasPage() {
  // Mock offers: products that have original_price or are featured
  const ofertas = products.filter(p => p.original_price || p.tags.includes("featured"));

  return (
    <div className="min-h-screen bg-[#ebebeb] pb-20 pt-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 flex items-center gap-4 rounded-3xl bg-gradient-to-r from-red-600 to-amber-500 p-8 text-white shadow-lg">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <Flame size={32} className="text-yellow-300" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">Ofertas Imperdibles</h1>
            <p className="mt-1 text-sm font-medium text-red-50">Descuentos exclusivos y envíos rápidos en Mar del Plata.</p>
          </div>
        </div>

        <div className="mb-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button className="whitespace-nowrap rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-900 shadow-sm border-2 border-red-500 flex items-center gap-2">
            <Percent size={16} /> Todas las ofertas
          </button>
          <button className="whitespace-nowrap rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors border border-slate-200">
            Tecnología
          </button>
          <button className="whitespace-nowrap rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors border border-slate-200">
            Hogar y Muebles
          </button>
          <button className="whitespace-nowrap rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors border border-slate-200">
            Indumentaria
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {ofertas.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
