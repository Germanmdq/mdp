"use client";

import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X, ShieldCheck, Heart, Grid, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-blue-600">
      {/* Top Bar (Optional, like "Envío gratis superando los $30.000") */}
      <div className="hidden bg-slate-900 py-1.5 text-center text-[11px] font-medium tracking-wide text-white md:block">
        🔥 APROVECHÁ 12 CUOTAS SIN INTERÉS EN PRODUCTOS SELECCIONADOS
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-[88px] items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center space-x-2">
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-3xl font-black tracking-tighter text-white">MDP</span>
                <span className="text-3xl font-light text-white">Market</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-100">& Services</span>
            </div>
          </Link>

          {/* Center Search Bar */}
          <div className="hidden flex-1 md:block">
            <div className="flex h-12 w-full max-w-3xl overflow-hidden rounded-sm bg-white shadow-sm">
              <button className="flex items-center space-x-1 border-r border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
                <span>Categorías</span>
                <Menu size={16} />
              </button>
              <input
                type="text"
                placeholder="Estoy buscando..."
                className="flex-1 border-none bg-transparent px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
              <button className="bg-slate-900 px-8 font-bold text-white transition-colors hover:bg-slate-800">
                Buscar
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden shrink-0 items-center space-x-6 md:flex">
            <Link href="/dashboard/vendedor" className="flex flex-col items-center justify-center text-white hover:text-blue-200 transition-colors">
              <ShoppingBag size={22} strokeWidth={1.5} />
              <span className="mt-1 text-[10px] font-bold">Vender</span>
            </Link>
            <Link href="/dashboard/usuario/favoritos" className="flex flex-col items-center justify-center text-white hover:text-blue-200 transition-colors">
              <Heart size={22} strokeWidth={1.5} />
              <span className="mt-1 text-[10px] font-bold">Favoritos</span>
            </Link>
            <Link href="/checkout" className="group relative flex flex-col items-center justify-center text-white hover:text-blue-200 transition-colors">
              <div className="relative">
                <ShoppingCart size={22} strokeWidth={1.5} />
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white group-hover:bg-slate-700">0</span>
              </div>
              <span className="mt-1 text-[10px] font-bold">Carrito</span>
            </Link>
            <Link href="/dashboard/usuario" className="flex flex-col items-center justify-center text-white hover:text-blue-200 transition-colors">
              <User size={22} strokeWidth={1.5} />
              <span className="mt-1 text-[10px] font-bold">Ingresar</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Search (Shows below header on mobile) */}
        <div className="pb-4 md:hidden">
          <div className="flex h-10 w-full overflow-hidden rounded-sm bg-white shadow-sm">
            <input
              type="text"
              placeholder="Estoy buscando..."
              className="flex-1 border-none bg-transparent px-3 text-sm outline-none text-slate-900"
            />
            <button className="bg-slate-900 px-4 text-white">
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Nav Bar (Categories) */}
      <div className="hidden border-t border-blue-500 bg-blue-600 md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center space-x-6 py-2 text-sm font-semibold text-white">
            <li><Link href="/productos" className="hover:text-white transition-colors flex items-center space-x-1"><Grid size={16} /><span>Todos los Productos</span></Link></li>
            <li><Link href="/servicios" className="hover:text-white transition-colors">Servicios Locales</Link></li>
            <li><Link href="/productos?destacados" className="hover:text-white transition-colors">Ofertas Destacadas</Link></li>
            <li><Link href="/inversores" className="hover:text-white transition-colors">Panel Inversores</Link></li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full w-full border-t bg-white shadow-2xl md:hidden">
          <div className="flex flex-col p-4 space-y-4">
            <Link href="/productos" className="text-base font-bold text-blue-100 border-b pb-2">Productos</Link>
            <Link href="/servicios" className="text-base font-bold text-blue-100 border-b pb-2">Servicios</Link>
            <Link href="/inversores" className="text-base font-bold text-blue-100 border-b pb-2">Inversores</Link>
            <Link href="/dashboard/usuario" className="text-base font-bold text-blue-100 border-b pb-2">Mi Cuenta</Link>
            <Link href="/dashboard/vendedor" className="text-base font-bold text-blue-100 pb-2">Vender</Link>
          </div>
        </div>
      )}
    </header>
  );
}
