"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { products, services } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";
import { 
  CreditCard, ShieldCheck, TrendingUp, 
  Package, Sparkles, MessageSquare, ChevronLeft, ChevronRight 
} from "lucide-react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: "Tecnología de Punta",
      subtitle: "Lo último en smartphones y notebooks.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2000",
      cta: "Ver celulares",
      href: "/productos?categoria=Celulares+y+tecnología"
    },
    {
      id: 2,
      title: "Herramientas Profesionales",
      subtitle: "Potencia Bosch para tus proyectos.",
      image: "https://images.unsplash.com/photo-1581244276891-efbb625ec521?auto=format&fit=crop&q=80&w=2000",
      cta: "Ver herramientas",
      href: "/productos?categoria=Herramientas"
    },
    {
      id: 3,
      title: "Tu Hogar, Tu Estilo",
      subtitle: "Muebles y decoración con envío gratis.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000",
      cta: "Ver muebles",
      href: "/productos?categoria=Hogar+y+muebles"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#ebebeb] min-h-screen pb-20 text-slate-800">
      
      {/* Hero Banner - Replicating ML Premium Layout */}
      <div className="relative h-[340px] w-full overflow-hidden md:h-[480px] bg-slate-900">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-24">
              <h1 className="mb-2 text-3xl font-black text-white md:text-6xl tracking-tight max-w-xl">{slide.title}</h1>
              <p className="mb-8 text-base text-slate-200 md:text-xl max-w-lg">{slide.subtitle}</p>
              <Link href={slide.href} className="w-fit rounded-sm bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-xl hover:bg-blue-700 transition-all">
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}
        {/* Nav arrows */}
        <button onClick={() => setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)} className="absolute left-0 top-1/2 z-10 flex h-16 w-10 -translate-y-1/2 items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-all rounded-r-lg">
          <ChevronLeft size={30} />
        </button>
        <button onClick={() => setCurrentSlide(prev => (prev + 1) % heroSlides.length)} className="absolute right-0 top-1/2 z-10 flex h-16 w-10 -translate-y-1/2 items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-all rounded-l-lg">
          <ChevronRight size={30} />
        </button>
      </div>

      {/* Benefits Row - Clean Cards */}
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
        
        {/* Categorías - New Square Design (No más círculos) */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-700 md:text-2xl">Categorías destacadas</h2>
            <Link href="/productos" className="text-sm font-bold text-blue-500 hover:underline">Ver todas</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
            {[
              { name: "Tecnología", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400", href: "/productos?categoria=Celulares+y+tecnología" },
              { name: "Herramientas", img: "https://http2.mlstatic.com/D_Q_NP_2X_992808-MLA99452908778_112025-E.webp", href: "/productos?categoria=Herramientas" },
              { name: "Hogar", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=400", href: "/productos?categoria=Hogar+y+muebles" },
              { name: "Limpieza", img: "https://http2.mlstatic.com/S_Q_NP_2X_615578-MLA99932747091_112025-V.webp", href: "/productos?categoria=Hogar+y+muebles" },
              { name: "Moda", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400", href: "/productos?categoria=Indumentaria" },
              { name: "Servicios", img: "https://images.unsplash.com/photo-1521791136064-7986c295944c?auto=format&fit=crop&q=80&w=400", href: "/servicios" },
            ].map((cat, i) => (
              <Link key={i} href={cat.href} className="group relative flex aspect-square flex-col overflow-hidden rounded-xl bg-white shadow-sm border border-slate-100 transition-all hover:shadow-lg">
                <img src={cat.img} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-center text-xs font-bold text-white md:text-sm uppercase tracking-wider">
                  {cat.name}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Ofertas Slider Style */}
        <section className="bg-white rounded-sm shadow-sm p-6 md:p-8">
          <div className="mb-6 flex items-baseline gap-4 border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-light text-slate-800">Ofertas del día</h2>
            <Link href="/productos" className="text-sm font-semibold text-blue-500 hover:underline">Ver todas</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {products.slice(0, 8).map((product) => (
              <div key={product.id} className="w-[180px] shrink-0 md:w-[200px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* AI Assistant - Modern Card */}
        <section className="overflow-hidden rounded-xl bg-white shadow-sm border border-slate-100 flex flex-col md:flex-row items-center">
          <div className="p-8 md:p-12 flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-600">
              <Sparkles size={12} /> Guía de Compras Inteligente
            </div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">¿No encontrás lo que buscás?</h2>
            <p className="text-slate-500 leading-relaxed">Nuestro asesor AI te ayuda a encontrar la mejor oferta o profesional en segundos. Ahorrá tiempo y dinero.</p>
            <button 
              onClick={() => {
                const btn = document.getElementById('ai-assistant-trigger');
                if (btn) btn.click();
              }}
              className="mt-4 rounded-sm bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition-all flex items-center gap-2"
            >
              <MessageSquare size={18} />
              Consultar al Asesor
            </button>
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
            {products.filter(p => p.category_id === "Celulares y tecnología").map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
