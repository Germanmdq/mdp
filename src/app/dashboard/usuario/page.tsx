import { History, Package, Star, MessageSquare, TrendingUp, ChevronRight, ShieldCheck, User, Settings, CreditCard } from "lucide-react";
import Link from "next/link";

export default function UserDashboard() {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-6 rounded-md bg-white p-6 shadow-sm">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <User size={48} />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-slate-900">Hola, Germán</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <span className="font-semibold text-blue-600">Nivel 4</span>
            <span>•</span>
            <span>MDP Puntos</span>
          </div>
        </div>
        <div className="hidden lg:block">
          <Link href="#" className="text-sm font-semibold text-blue-500 hover:text-blue-700">Ver mi perfil</Link>
        </div>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="#" className="flex flex-col items-center justify-center gap-3 rounded-md bg-white p-6 shadow-sm transition-colors hover:bg-slate-50">
          <Package size={28} className="text-blue-500" />
          <span className="text-sm font-semibold text-slate-700">Compras</span>
        </Link>
        <Link href="#" className="flex flex-col items-center justify-center gap-3 rounded-md bg-white p-6 shadow-sm transition-colors hover:bg-slate-50">
          <CreditCard size={28} className="text-blue-500" />
          <span className="text-sm font-semibold text-slate-700">Tarjetas</span>
        </Link>
        <Link href="/dashboard/usuario/favoritos" className="flex flex-col items-center justify-center gap-3 rounded-md bg-white p-6 shadow-sm transition-colors hover:bg-slate-50">
          <Star size={28} className="text-blue-500" />
          <span className="text-sm font-semibold text-slate-700">Favoritos</span>
        </Link>
        <Link href="#" className="flex flex-col items-center justify-center gap-3 rounded-md bg-white p-6 shadow-sm transition-colors hover:bg-slate-50">
          <Settings size={28} className="text-blue-500" />
          <span className="text-sm font-semibold text-slate-700">Mis datos</span>
        </Link>
      </div>

      {/* Active Operations / Compras */}
      <div className="rounded-md bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-900">Tus compras recientes</h2>
          <Link href="#" className="text-sm text-blue-500 hover:text-blue-700">Ver todas</Link>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { id: "MDP-8932", item: "iPhone 13 128GB", status: "Llega mañana", date: "Comprado el 23 de mayo", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=200", seller: "APPLE_OFFICIAL" },
            { id: "MDP-8931", item: "Taladro Bosch Gsb 13 Re", status: "Entregado", date: "Comprado el 15 de mayo", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=200", seller: "FERRETERIA_LOPEZ" },
          ].map((op, i) => (
            <div key={i} className="flex items-center gap-6 p-6 hover:bg-slate-50 transition-colors">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-slate-200">
                <img src={op.image} alt={op.item} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <div className={`text-sm font-semibold ${op.status === "Entregado" ? "text-green-600" : "text-blue-600"}`}>{op.status}</div>
                <div className="mt-1 font-semibold text-slate-800">{op.item}</div>
                <div className="mt-1 text-xs text-slate-500">{op.date} • Vendedor: {op.seller}</div>
              </div>
              <div>
                <button className="rounded bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-200 transition-colors">
                  Ver compra
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
