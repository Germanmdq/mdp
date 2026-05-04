"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, User, Menu, X, Heart, Grid, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/productos?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-blue-600 shadow-md">
      {/* Promo bar — desktop only */}
      <div className="hidden bg-slate-900 py-1.5 text-center text-[11px] font-medium tracking-wide text-white md:block">
        🔥 APROVECHÁ 12 CUOTAS SIN INTERÉS EN PRODUCTOS SELECCIONADOS
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center gap-3 md:h-[72px] md:gap-4">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1">
                <span className="text-xl font-black tracking-tighter text-white md:text-2xl">MDP</span>
                <span className="text-xl font-light text-white md:text-2xl">Market</span>
              </div>
              <span className="hidden text-[9px] font-bold uppercase tracking-widest text-blue-200 md:block">& Services</span>
            </div>
          </Link>

          {/* Search — always visible, full width on mobile */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="flex h-9 w-full overflow-hidden rounded-full bg-white shadow-sm md:h-11">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar..."
                className="flex-1 border-none bg-transparent px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="rounded-full bg-blue-800 px-4 font-bold text-white transition-colors hover:bg-blue-900 md:px-6"
              >
                <Search size={16} className="md:hidden" />
                <span className="hidden md:inline">Buscar</span>
              </button>
            </div>
          </form>

          {/* Mobile: cart + menu */}
          <div className="flex items-center gap-2 md:hidden">
            <Link href="/dashboard/usuario/favoritos" className="text-white p-1">
              <Heart size={22} strokeWidth={1.5} />
            </Link>
            <Link href="/checkout" className="relative text-white p-1">
              <ShoppingCart size={22} strokeWidth={1.5} />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-blue-600">0</span>
            </Link>
            <button className="text-white p-1" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop: right actions */}
          <div className="hidden shrink-0 items-center space-x-5 md:flex">
            <Link href="/dashboard/vendedor" className="flex flex-col items-center text-white hover:text-blue-200 transition-colors">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="mt-0.5 text-[10px] font-bold">Vender</span>
            </Link>
            <Link href="/dashboard/usuario/favoritos" className="flex flex-col items-center text-white hover:text-blue-200 transition-colors">
              <Heart size={20} strokeWidth={1.5} />
              <span className="mt-0.5 text-[10px] font-bold">Favoritos</span>
            </Link>
            <Link href="/checkout" className="flex flex-col items-center text-white hover:text-blue-200 transition-colors">
              <div className="relative">
                <ShoppingCart size={20} strokeWidth={1.5} />
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-blue-600">0</span>
              </div>
              <span className="mt-0.5 text-[10px] font-bold">Carrito</span>
            </Link>
            <Link href="/dashboard/usuario" className="flex flex-col items-center text-white hover:text-blue-200 transition-colors">
              <User size={20} strokeWidth={1.5} />
              <span className="mt-0.5 text-[10px] font-bold">Ingresar</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary nav — desktop */}
      <div className="hidden border-t border-blue-500 bg-blue-700 md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center space-x-6 py-2 text-sm font-semibold text-white">
            <li><Link href="/productos" className="flex items-center gap-1 hover:text-blue-200 transition-colors"><Grid size={14} /><span>Todos los Productos</span></Link></li>
            <li><Link href="/servicios" className="hover:text-blue-200 transition-colors">Servicios Locales</Link></li>
            <li><Link href="/productos?destacados=true" className="hover:text-blue-200 transition-colors">Ofertas Destacadas</Link></li>
            <li><Link href="/inversores" className="hover:text-blue-200 transition-colors">Panel Inversores</Link></li>
          </ul>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="absolute left-0 top-full w-full border-t border-blue-500 bg-blue-600 shadow-2xl md:hidden z-50">
          <div className="flex flex-col divide-y divide-blue-500">
            <Link href="/productos" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-6 py-4 text-base font-semibold text-white hover:bg-blue-700">
              <Grid size={18} /> Productos
            </Link>
            <Link href="/servicios" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-6 py-4 text-base font-semibold text-white hover:bg-blue-700">
              <ShoppingBag size={18} /> Servicios Locales
            </Link>
            <Link href="/productos?destacados=true" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-6 py-4 text-base font-semibold text-white hover:bg-blue-700">
              <span className="text-amber-300">⚡</span> Ofertas Destacadas
            </Link>
            <div className="border-t border-blue-500" />
            <Link href="/dashboard/usuario" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-6 py-4 text-base font-semibold text-white hover:bg-blue-700">
              <User size={18} /> Mi Cuenta
            </Link>
            <Link href="/dashboard/vendedor" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-6 py-4 text-base font-semibold text-white hover:bg-blue-700">
              <ShoppingBag size={18} /> Panel Vendedor
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
