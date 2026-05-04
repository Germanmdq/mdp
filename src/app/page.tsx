"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { products, services, PRODUCT_CATEGORIES } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";
import ServiceCard from "@/components/services/ServiceCard";
import { CreditCard, Banknote, ShieldCheck, Plus, ArrowRight, TrendingUp, Briefcase, Smartphone, Tv, Coffee, Watch, ShoppingCart, Info, CheckCircle2, ChevronRight, Zap } from "lucide-react";

export default function Home() {
  const featuredProducts = products.filter(p => p.tags.includes("featured")).slice(0, 6);
  const techProducts = products.filter(p => p.category_id === "Celulares y tecnología").slice(0, 6);
  const toolProducts = products.filter(p => p.category_id === "Herramientas").slice(0, 6);
  const homeServices = services.filter(s => s.featured).slice(0, 4);

  const [historyProducts, setHistoryProducts] = useState(products.slice(6, 12));

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mdp_viewed_products");
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        const viewed = ids
          .map(id => products.find(p => p.id === id))
          .filter(Boolean)
          .slice(0, 6) as typeof products;
        if (viewed.length >= 2) setHistoryProducts(viewed);
      }
    } catch {}
  }, []);

  return (
    <div className="flex flex-col pb-20 bg-[#ebebeb] min-h-screen">
      {/* Hero Banner Area */}
      <section className="relative w-full bg-gradient-to-b from-blue-600 to-[#ebebeb] pt-8 pb-32">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="relative h-[300px] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-xl lg:h-[350px]">
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 h-full w-full object-cover opacity-40" alt="Banner" />
            <div className="absolute inset-0 flex items-center justify-between px-12">
              <div className="max-w-xl text-white">
                <div className="mb-2 inline-block rounded bg-red-600 px-2 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  CYBER WEEK MDP
                </div>
                <h1 className="mb-4 text-4xl font-extrabold uppercase italic leading-none md:text-6xl text-white drop-shadow-lg">
                  Llegó el Black <br />
                  <span className="text-blue-300">Mar del Plata</span>
                </h1>
                <p className="mb-6 text-xl font-medium drop-shadow-md">Hasta 50% OFF y 12 cuotas sin interés en envíos locales.</p>
                <Link href="/productos" className="rounded-3xl bg-white px-6 py-3 font-bold text-slate-900 transition-colors hover:bg-slate-100">
                  Comprar ahora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options Row (MercadoLibre style) */}
      <div className="container relative mx-auto -mt-24 px-4 z-10 max-w-[1200px]">
        <div className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-white p-4 shadow-sm md:flex-row md:p-6 lg:gap-8">
          <div className="flex w-full items-center gap-4 border-b border-slate-100 pb-4 md:w-auto md:border-b-0 md:border-r md:pb-0 md:pr-8">
            <CreditCard size={32} className="text-blue-500" />
            <div>
              <div className="font-semibold text-slate-800">Tarjeta de crédito</div>
              <Link href="/como-pagar" className="text-sm text-blue-500 hover:text-blue-700">Ver promociones bancarias</Link>
            </div>
          </div>
          <div className="flex w-full items-center gap-4 border-b border-slate-100 pb-4 md:w-auto md:border-b-0 md:border-r md:pb-0 md:pr-8">
            <Banknote size={32} className="text-blue-500" />
            <div>
              <div className="font-semibold text-slate-800">Efectivo</div>
              <Link href="/como-pagar" className="text-sm text-blue-500 hover:text-blue-700">Ver puntos de pago</Link>
            </div>
          </div>
          <div className="flex w-full items-center gap-4 border-b border-slate-100 pb-4 md:w-auto md:border-b-0 md:border-r md:pb-0 md:pr-8">
            <ShieldCheck size={32} className="text-blue-500" />
            <div>
              <div className="font-semibold text-slate-800">Pago Protegido</div>
              <Link href="/compra-protegida" className="text-sm text-blue-500 hover:text-blue-700">Cómo te protegemos</Link>
            </div>
          </div>
          <div className="hidden w-full items-center justify-end md:flex md:w-auto md:flex-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-blue-500 hover:bg-slate-200 cursor-pointer">
              <Plus size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Ofertas Slider */}
      <section className="mt-12">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="mb-4 flex items-baseline gap-4">
            <h2 className="text-2xl font-light text-slate-800">Ofertas</h2>
            <Link href="/productos" className="text-sm font-semibold text-blue-500 hover:text-blue-700">Ver todas</Link>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Descubrí Mar del Plata (Banners) */}
      <section className="mt-12">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-slate-900 group">
              <img src="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800" alt="Indumentaria" className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <div className="text-sm font-bold uppercase tracking-widest text-blue-300">Temporada Invierno</div>
                <h3 className="mb-4 text-3xl font-bold">Indumentaria y Calzado</h3>
                <Link href="/productos?categoria=Indumentaria" className="rounded-3xl bg-white px-4 py-2 text-sm font-bold text-slate-900 hover:bg-slate-100">
                  Ver productos
                </Link>
              </div>
            </div>
            <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-slate-900 group">
              <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800" alt="Hogar" className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <div className="text-sm font-bold uppercase tracking-widest text-blue-300">Renová tus espacios</div>
                <h3 className="mb-4 text-3xl font-bold">Hogar y Muebles</h3>
                <Link href="/productos?categoria=Hogar+y+muebles" className="rounded-3xl bg-white px-4 py-2 text-sm font-bold text-slate-900 hover:bg-slate-100">
                  Ver productos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lo mejor en Tecnología */}
      <section className="mt-12">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="mb-4 flex items-baseline gap-4">
            <h2 className="text-2xl font-light text-slate-800">Lo mejor en Tecnología</h2>
            <Link href="/productos?categoria=Celulares+y+tecnología" className="text-sm font-semibold text-blue-500 hover:text-blue-700">Ver tecnología</Link>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
            {techProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios MDP Puntos */}
      <section className="mt-12">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="mb-4 flex items-baseline gap-4">
            <h2 className="text-2xl font-light text-slate-800">Beneficios MDP Puntos</h2>
            <Link href="/puntos" className="text-sm font-semibold text-blue-500 hover:text-blue-700">Conocé todos los beneficios</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-3xl bg-gradient-to-br from-indigo-900 to-purple-900 p-6 text-white shadow-sm flex flex-col justify-between h-48 transition-transform hover:-translate-y-1">
              <div className="text-sm font-bold uppercase tracking-widest text-purple-300">Nivel 6</div>
              <div>
                <div className="text-3xl font-black mb-1">Havanna</div>
                <div className="text-sm font-medium">30% OFF en cafeterías adheridas</div>
              </div>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-amber-600 to-amber-900 p-6 text-white shadow-sm flex flex-col justify-between h-48 transition-transform hover:-translate-y-1">
              <div className="text-sm font-bold uppercase tracking-widest text-amber-300">Nivel 6</div>
              <div>
                <div className="text-3xl font-black mb-1">Antares</div>
                <div className="text-sm font-medium">2x1 en pintas todos los jueves</div>
              </div>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 p-6 text-white shadow-sm flex flex-col justify-between h-48 transition-transform hover:-translate-y-1">
              <div className="text-sm font-bold uppercase tracking-widest text-teal-200">Envíos</div>
              <div>
                <div className="text-3xl font-black mb-1">Envíos Gratis</div>
                <div className="text-sm font-medium">En miles de productos desde $25.000</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visto Recientemente */}
      <section className="mt-12">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="mb-4 flex items-baseline gap-4">
            <h2 className="text-2xl font-light text-slate-800">Basado en tu última visita</h2>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
            {historyProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="mt-12">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <h2 className="mb-6 text-2xl font-light text-slate-800">Categorías populares</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-200">
            {PRODUCT_CATEGORIES.slice(0, 10).map((cat, i) => (
              <Link key={i} href={`/productos?categoria=${cat}`} className="group flex flex-col items-center justify-center border-b border-r border-slate-100 p-8 transition-colors hover:bg-blue-50 last:border-r-0">
                <div className="mb-4 text-blue-500 group-hover:text-blue-700">
                  <Briefcase size={40} strokeWidth={1} />
                </div>
                <span className="text-center text-sm font-medium text-slate-600 group-hover:text-blue-600">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tiendas Oficiales */}
      <section className="mt-12">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="mb-4 flex items-baseline gap-4">
            <h2 className="text-2xl font-light text-slate-800">Tiendas oficiales</h2>
            <Link href="/productos" className="text-sm font-semibold text-blue-500 hover:text-blue-700">Ver todas las tiendas</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Samsung", logo: "S", bg: "bg-black", q: "SAMSUNG_STORE" },
              { name: "Nike", logo: "N", bg: "bg-slate-900", q: "NIKE_STORE" },
              { name: "Sony", logo: "S", bg: "bg-blue-900", q: "SONY_STORE" },
              { name: "Adidas", logo: "A", bg: "bg-slate-800", q: "ADIDAS_STORE" }
            ].map((store, i) => (
              <Link key={i} href={`/productos?q=${store.q}`} className="rounded-3xl bg-white p-6 shadow-sm flex items-center justify-center gap-4 hover:shadow-md transition-shadow">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${store.bg} text-xl font-black text-white`}>
                  {store.logo}
                </div>
                <span className="font-semibold text-slate-700 text-lg">{store.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Especial Herramientas */}
      <section className="mt-12">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="mb-4 flex items-baseline gap-4">
            <h2 className="text-2xl font-light text-slate-800">Especial Herramientas</h2>
            <Link href="/productos?categoria=Herramientas" className="text-sm font-semibold text-blue-500 hover:text-blue-700">Ver herramientas</Link>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
            {toolProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Servicios Locales Slider */}
      <section className="mt-12">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="mb-4 flex items-baseline gap-4">
            <h2 className="text-2xl font-light text-slate-800">Servicios Destacados en tu zona</h2>
            <Link href="/servicios" className="text-sm font-semibold text-blue-500 hover:text-blue-700">Ver todos</Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homeServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer Info Area (Like ML's bottom info section) */}
      <section className="mt-16 bg-white py-12 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="mb-4 text-blue-500">
                <CreditCard size={48} strokeWidth={1} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Elegí cómo pagar</h3>
              <p className="text-sm text-slate-500 px-4">
                Podés pagar con tarjeta, débito, efectivo o hasta 12 cuotas sin tarjeta con MDP Crédito.
              </p>
              <Link href="/como-pagar" className="mt-2 text-sm font-semibold text-blue-500 hover:text-blue-700">Cómo pagar con MDP Market</Link>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-4 text-blue-500">
                <ShoppingCart size={48} strokeWidth={1} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Envío gratis desde $25.000</h3>
              <p className="text-sm text-slate-500 px-4">
                Solo por estar registrado tenés envíos gratis en miles de productos seleccionados.
              </p>
              <Link href="/envios" className="mt-2 text-sm font-semibold text-blue-500 hover:text-blue-700">Conocé más sobre envíos</Link>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-4 text-blue-500">
                <ShieldCheck size={48} strokeWidth={1} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Seguridad, de principio a fin</h3>
              <p className="text-sm text-slate-500 px-4">
                ¿No te gusta? ¡Devolvelo! En MDP Market, no hay nada que no puedas hacer, porque estás siempre protegido.
              </p>
              <Link href="/compra-protegida" className="mt-2 text-sm font-semibold text-blue-500 hover:text-blue-700">Cómo te protegemos</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
