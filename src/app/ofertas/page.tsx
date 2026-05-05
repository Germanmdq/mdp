import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/products/ProductCard";
import { Flame, Percent, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Ofertas y Oportunidades | MDP Market",
};

export default async function OfertasPage() {
  // Real offers from DB
  const ofertas = await prisma.product.findMany({
    where: {
      OR: [
        { originalPrice: { gt: 0 } },
        { tags: { contains: "featured" } }
      ]
    },
    include: { seller: true }
  });

  return (
    <div className="min-h-screen bg-[#ebebeb] pb-20">
      {/* Premium Offers Header */}
      <div className="bg-[#005eb8] pt-12 pb-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-400/10 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <nav className="mb-6 flex items-center space-x-2 text-xs font-medium text-white/60">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <ChevronRight size={12} />
            <span className="text-white">Ofertas</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                <Flame size={12} className="text-yellow-400" /> Selección Exclusiva
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Ofertas del Día</h1>
              <p className="text-blue-100 text-lg max-w-xl">Encontrá los mejores precios de Mar del Plata con envío gratis y cuotas sin interés.</p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
               <div className="text-center">
                  <div className="text-2xl font-black">24h</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Duración</div>
               </div>
               <div className="w-px h-10 bg-white/20"></div>
               <div className="text-center">
                  <div className="text-2xl font-black">40%</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Máx. OFF</div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl -mt-10 relative z-20">
        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-4">
          {ofertas.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State if no offers */}
        {ofertas.length === 0 && (
          <div className="bg-white rounded-sm p-20 text-center shadow-sm">
             <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                <Percent size={32} />
             </div>
             <h2 className="text-xl font-bold text-slate-800">No hay ofertas activas en este momento</h2>
             <p className="text-slate-500 mt-2">¡Volvé pronto para descubrir nuevos descuentos!</p>
          </div>
        )}
      </div>
    </div>
  );
}
