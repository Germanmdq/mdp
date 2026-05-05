"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, MapPin, ChevronDown, Menu, User, Bell, Heart, Package, LogOut, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { PRODUCT_CATEGORIES } from "@/lib/data";

export default function Navbar() {
  const [session, setSession] = useState<any>(null);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { getSession } = await import("@/app/actions/auth");
      const user = await getSession();
      setSession(user);
    };
    checkSession();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/productos?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="bg-[#005eb8] w-full border-b border-black/5">
      <div className="container mx-auto max-w-[1200px] px-4 md:px-2 text-white">
        {/* Top Row: Logo, Search, Ad */}
        <div className="flex h-12 items-center gap-4 pt-2 md:h-16 md:gap-12 md:pt-0">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div className="flex flex-col items-center">
              <span className="text-xl font-black italic leading-none text-white md:text-3xl">MDP</span>
              <span className="text-[10px] font-bold uppercase tracking-tight text-white/80 md:text-xs">Market</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 relative group">
            <div className="flex h-9 w-full items-center overflow-hidden rounded-full bg-white shadow-sm md:h-11">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar productos, marcas y más..."
                className="flex-1 border-none bg-transparent px-6 text-[13px] md:text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
              <button type="submit" className="flex h-full items-center px-4 md:px-6 text-slate-400 hover:text-blue-600 transition-colors border-l border-slate-100">
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Ad/Promo (Desktop Only) - Dark themed */}
          <div className="hidden shrink-0 md:block">
            <div className="flex items-center gap-2 rounded-xl bg-blue-600/10 border border-blue-500/20 px-4 py-2 text-white">
              <Sparkles size={16} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider">Envío gratis en MDQ</span>
            </div>
          </div>
        </div>

        {/* Bottom Row: Location, Menu, User Actions */}
        <div className="hidden h-10 items-center justify-between pb-1 md:flex">
          {/* Left: Location */}
          <div className="flex items-center gap-1 group cursor-pointer text-slate-400 hover:text-white transition-colors">
            <MapPin size={18} className="text-blue-500" />
            <div className="flex flex-col">
              <span className="text-[10px] leading-none text-slate-500">Enviar a</span>
              <span className="text-[13px] font-medium leading-none">Mar del Plata</span>
            </div>
          </div>

          {/* Center: Main Navigation */}
          <nav>
            <ul className="flex items-center gap-6 text-sm font-medium text-slate-400">
              <li className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">Categorías <ChevronDown size={14} /></li>
              <li><Link href="/ofertas" className="hover:text-white transition-colors">Ofertas</Link></li>
              <li><Link href="/productos" className="hover:text-white transition-colors">Historial</Link></li>
              <li><Link href="/productos" className="hover:text-white transition-colors">Supermercado</Link></li>
              <li><Link href="/productos" className="hover:text-white transition-colors">Moda</Link></li>
              <li><Link href="/publicar" className="hover:text-white transition-colors">Vender</Link></li>
              <li><Link href="/productos" className="hover:text-white transition-colors">Ayuda</Link></li>
            </ul>
          </nav>

          {/* Right: User Menu */}
          <div className="flex items-center gap-6 text-sm text-slate-400">
            {session ? (
              <div className="flex items-center gap-1 cursor-pointer hover:text-white">
                <User size={18} className="text-blue-500/50" />
                <span className="text-white font-medium">{session.name || session.email}</span>
                <ChevronDown size={12} />
              </div>
            ) : (
              <Link href="/acceso" className="hover:text-white flex items-center gap-2">
                <User size={18} className="text-blue-200" />
                Ingresar
              </Link>
            )}
            <Link href="/dashboard/usuario/compras" className="hover:text-white">Mis compras</Link>
            <Link href="/dashboard/usuario/favoritos" className="hover:text-white">Favoritos</Link>
            <Bell size={18} className="cursor-pointer hover:text-white" />
            <Link href="/checkout" className="relative group">
              <ShoppingCart size={18} className="group-hover:text-white" />
              <span className="absolute -right-1 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-600 text-[8px] font-bold text-white">0</span>
            </Link>
          </div>
        </div>

        {/* Mobile Sub-header: Location */}
        <div className="flex h-10 items-center gap-1 py-2 md:hidden text-slate-400">
          <MapPin size={16} className="text-blue-500" />
          <span className="text-xs">Enviar a Mar del Plata</span>
          <ChevronRightIcon size={12} className="ml-auto opacity-40" />
        </div>
      </div>
    </header>
  );
}

function ChevronRightIcon({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
