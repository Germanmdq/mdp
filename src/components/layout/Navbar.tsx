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
      {/* Top Promo Bar */}
      <div className="hidden bg-slate-900 py-1.5 text-center text-[11px] font-medium tracking-wide text-white md:block">
        🔥 APROVECHÁ 12 CUOTAS SIN INTERÉS EN PRODUCTOS SELECCIONADOS
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-[72px] items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center space-x-2">
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-black tracking-tighter text-white">MDP</span>
                <span className="text-2xl font-light text-white">Market</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-blue-200">& Services</span>
            </div>
          </Link>

          {/* Center Search Bar — Desktop */}
          <form onSubmit={handleSearch} className="hidden flex-1 md:flex max-w-2xl">
            <div className="flex h-11 w-full overflow-hidden rounded-full bg-white shadow-sm">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Estoy buscando..."
                className="flex-1 border-none bg-transparent px-5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
              <button type="submit" className="rounded-full bg-blue-800 px-6 font-bold text-white transition-colors hover:bg-blue-900">
                Buscar
              </button>
            </div>
          </form>

          {/* Right Actions — Desktop */}
          <div className="hidden shrink-0 items-center space-x-5 md:flex">
            <Link href="/dashboard/vendedor" className="flex flex-col items-center justify-center text-white hover:text-blue-200 transition-colors">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="mt-0.5 text-[10px] font-bold">Vender</span>
            </Link>
            <Link href="/dashboard/usuario/favoritos" className="flex flex-col items-center justify-center text-white hover:text-blue-200 transition-colors">
              <Heart size={20} strokeWidth={1.5} />
              <span className="mt-0.5 text-[10px] font-bold">Favoritos</span>
            </Link>
            <Link href="/checkout" className="group relative flex flex-col items-center justify-center text-white hover:text-blue-200 transition-colors">
              <div className="relative">
                <ShoppingCart size={20} strokeWidth={1.5} />
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-blue-600">0</span>
              </div>
              <span className="mt-0.5 text-[10px] font-bold">Carrito</span>
            </Link>
            <Link href="/dashboard/usuario" className="flex flex-col items-center justify-center text-white hover:text-blue-200 transition-colors">
              <User size={20} strokeWidth={1.5} />
              <span className="mt-0.5 text-[10px] font-bold">Ingresar</span>
            </Link>
          </div>

          {/* Mobile: right icons + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <Link href="/dashboard/usuario/favoritos" className="text-white">
              <Heart size={22} strokeWidth={1.5} />
            </Link>
            <Link href="/checkout" className="relative text-white">
              <ShoppingCart size={22} strokeWidth={1.5} />
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-blue-600">0</span>
            </Link>
            <button className="text-white p-1" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="pb-3 md:hidden">
          <div className="flex h-10 w-full overflow-hidden rounded-full bg-white shadow-sm">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Estoy buscando..."
              className="flex-1 border-none bg-transparent px-4 text-sm outline-none text-slate-900 placeholder:text-slate-400"
            />
            <button type="submit" className="rounded-full bg-blue-800 px-4 text-white">
              <Search size={16} />
            </button>
          </div>
        </form>
      </div>

      {/* Secondary Nav Bar — Desktop */}
      <div className="hidden border-t border-blue-500 bg-blue-700 md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center space-x-6 py-2 text-sm font-semibold text-white">
            <li><Link href="/productos" className="flex items-center space-x-1 hover:text-blue-200 transition-colors"><Grid size={14} /><span>Todos los Productos</span></Link></li>
            <li><Link href="/servicios" className="hover:text-blue-200 transition-colors">Servicios Locales</Link></li>
            <li><Link href="/productos?destacados=true" className="hover:text-blue-200 transition-colors">Ofertas Destacadas</Link></li>
            <li><Link href="/inversores" className="hover:text-blue-200 transition-colors">Panel Inversores</Link></li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full w-full border-t border-blue-500 bg-blue-600 shadow-2xl md:hidden z-50">
          <div className="flex flex-col divide-y divide-blue-500">
            <Link href="/productos" onClick={() => setIsOpen(false)} className="px-6 py-4 text-base font-semibold text-white hover:bg-blue-700 transition-colors">Productos</Link>
            <Link href="/servicios" onClick={() => setIsOpen(false)} className="px-6 py-4 text-base font-semibold text-white hover:bg-blue-700 transition-colors">Servicios</Link>
            <Link href="/inversores" onClick={() => setIsOpen(false)} className="px-6 py-4 text-base font-semibold text-white hover:bg-blue-700 transition-colors">Inversores</Link>
            <Link href="/dashboard/usuario" onClick={() => setIsOpen(false)} className="px-6 py-4 text-base font-semibold text-white hover:bg-blue-700 transition-colors">Mi Cuenta</Link>
            <Link href="/dashboard/vendedor" onClick={() => setIsOpen(false)} className="px-6 py-4 text-base font-semibold text-white hover:bg-blue-700 transition-colors">Panel Vendedor</Link>
          </div>
        </div>
      )}
    </header>
  );
}
