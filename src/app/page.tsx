import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/products/ProductCard";
import HeroSlider from "@/components/home/HeroSlider";
import { 
  CreditCard, ShieldCheck, TrendingUp, 
  Package, Sparkles, MessageSquare 
} from "lucide-react";
import AIAssistantTrigger from "@/components/chat/AIAssistantTrigger";

export default async function Home() {
  // Fetch real data from DB
  const offers = await prisma.product.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: { seller: true }
  });

  const techProducts = await prisma.product.findMany({
    where: { category: { slug: 'tecnologia' } },
    take: 6,
    include: { seller: true }
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="bg-[#ebebeb] min-h-screen pb-20 text-slate-800">
      
      {/* Hero Banner */}
      <HeroSlider />

      {/* Benefits Row */}
      <div className="container mx-auto -mt-8 relative z-20 max-w-[1184px] px-4 md:-mt-12 md:px-0">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
          {[
            { title: "Pagá en cuotas", desc: "Ver medios de pago", icon: CreditCard, color: "text-blue-600" },
            { title: "Pago Seguro", desc: "Tu compra protegida", icon: ShieldCheck, color: "text-blue-600" },
            { title: "Ofertas del día", desc: "Ver todos los descuentos", icon: TrendingUp, color: "text-blue-600" },
            { title: "Envío Gratis", desc: "Por ser tu primera compra", icon: Package, color: "text-blue-600" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-sm bg-white p-4 shadow-sm md:p-6 transition-all hover:shadow-md cursor-pointer border border-transparent hover:border-blue-100">
              <item.icon className={`shrink-0 ${item.color}`} size={24} strokeWidth={1.5} />
              <div className="overflow-hidden">
                <div className="truncate text-xs font-bold text-slate-800 md:text-sm">{item.title}</div>
                <div className="truncate text-[10px] text-blue-500 md:text-[11px]">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <main className="container mx-auto mt-12 max-w-[1184px] px-4 md:px-0 space-y-12">
        
        {/* Categorías */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-700 md:text-2xl">Categorías destacadas</h2>
            <Link href="/productos" className="text-sm font-bold text-blue-500 hover:underline">Ver todas</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
            {categories.map((cat, i) => (
              <Link key={cat.id} href={`/productos?categoria=${encodeURIComponent(cat.name)}`} className="group relative flex aspect-square flex-col overflow-hidden rounded-xl bg-white shadow-sm border border-slate-100 transition-all hover:shadow-lg">
                <img src={cat.image || ""} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-center text-xs font-bold text-white md:text-sm uppercase tracking-wider">
                  {cat.name}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Ofertas */}
        <section className="bg-white rounded-sm shadow-sm p-6 md:p-8">
          <div className="mb-6 flex items-baseline gap-4 border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-light text-slate-800">Ofertas del día</h2>
            <Link href="/ofertas" className="text-sm font-semibold text-blue-500 hover:underline">Ver todas</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {offers.map((product) => (
              <div key={product.id} className="w-[180px] shrink-0 md:w-[200px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* AI Assistant */}
        <section className="overflow-hidden rounded-xl bg-white shadow-sm border border-slate-100 flex flex-col md:flex-row items-center">
          <div className="p-8 md:p-12 flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-600">
              <Sparkles size={12} /> Guía de Compras Inteligente
            </div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">¿No encontrás lo que buscás?</h2>
            <p className="text-slate-500 leading-relaxed">Nuestro asesor AI te ayuda a encontrar la mejor oferta o profesional en segundos. Ahorrá tiempo y dinero.</p>
            <AIAssistantTrigger />
          </div>
          <div className="hidden md:block w-1/3 h-full bg-blue-50 relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center opacity-10">
               <Sparkles size={200} className="text-blue-600" />
             </div>
          </div>
        </section>

        {/* Inspirado en tecnología */}
        <section>
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-2xl font-light text-slate-800">Inspirado en tecnología</h2>
            <Link href="/productos?categoria=Celulares+y+tecnología" className="text-sm font-semibold text-blue-500 hover:underline">Ver más</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {techProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
