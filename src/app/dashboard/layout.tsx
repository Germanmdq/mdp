
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ShoppingBag, Briefcase, Heart, MessageSquare, History, Settings, LogOut, ShieldCheck, PieChart } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { label: "Mi Cuenta", icon: User, href: "/dashboard/usuario" },
    { label: "Mis Compras", icon: History, href: "/dashboard/usuario/compras" },
    { label: "Mis Favoritos", icon: Heart, href: "/dashboard/usuario/favoritos" },
    { label: "Mensajes", icon: MessageSquare, href: "/chat" },
    { label: "Panel Vendedor", icon: ShoppingBag, href: "/dashboard/vendedor", color: "text-blue-600" },
    { label: "Panel Profesional", icon: Briefcase, href: "/dashboard/profesional", color: "text-purple-600" },
    { label: "Métricas Admin", icon: PieChart, href: "/admin", color: "text-red-600" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="rounded-3xl bg-white border border-slate-100 p-6 shadow-sm">
              <div className="mb-8 flex items-center space-x-3 px-2">
                <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  G
                </div>
                <div>
                  <div className="font-bold text-slate-900">Germán G.</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mar del Plata</div>
                </div>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item, i) => (
                  <Link 
                    key={i} 
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${pathname === item.href ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:bg-slate-50'} ${item.color && pathname !== item.href ? item.color : ''}`}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              <hr className="my-6 border-slate-100" />

              <button className="flex w-full items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-600 transition-colors">
                <LogOut size={18} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
