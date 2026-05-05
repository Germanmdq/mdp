"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
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
            <Link href={slide.href} className="w-fit rounded-2xl bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-xl hover:bg-blue-700 transition-all">
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
  );
}
