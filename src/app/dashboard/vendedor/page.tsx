import { Package, TrendingUp, Users, DollarSign, Activity, AlertCircle, ShoppingBag, Star } from "lucide-react";
import Link from "next/link";
import { businessMetrics } from "@/lib/data";

export default function SellerDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Resumen de Ventas</h1>
          <p className="text-sm text-slate-500">Últimos 30 días</p>
        </div>
        <div className="flex gap-2">
          <Link href="/productos?vendedor=me" className="rounded-full border border-blue-500 px-5 py-2 text-sm font-semibold text-blue-500 hover:bg-blue-50 transition-colors">
            Ver publicaciones
          </Link>
          <Link href="/publicar" className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
            Publicar producto
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign size={20} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-600">Ingresos</span>
          </div>
          <div className="text-2xl font-semibold text-slate-900">$4.520.000</div>
          <div className="mt-2 text-xs font-medium text-green-600">+12% vs mes anterior</div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag size={20} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-600">Ventas</span>
          </div>
          <div className="text-2xl font-semibold text-slate-900">142</div>
          <div className="mt-2 text-xs font-medium text-green-600">+5% vs mes anterior</div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Package size={20} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-600">Publicaciones</span>
          </div>
          <div className="text-2xl font-semibold text-slate-900">48</div>
          <div className="mt-2 text-xs font-medium text-slate-500">3 para revisar</div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Star size={20} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-600">Reputación</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-1/4 rounded bg-red-100"></div>
            <div className="h-6 w-1/4 rounded bg-amber-100"></div>
            <div className="h-6 w-1/4 rounded bg-green-100"></div>
            <div className="h-8 w-1/4 rounded bg-green-500 scale-110 shadow-sm border-2 border-white"></div>
          </div>
          <div className="mt-2 text-xs font-medium text-green-600">MercadoLíder Platinum</div>
        </div>
      </div>

      {/* Tareas / Alertas */}
      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-6 flex items-center gap-2">
          <AlertCircle size={20} className="text-amber-500" />
          <h2 className="text-lg font-semibold text-slate-900">Tareas pendientes</h2>
        </div>
        <div className="divide-y divide-slate-100">
          <div className="flex items-center justify-between p-6">
            <div>
              <div className="font-semibold text-slate-800">Prepará 3 envíos</div>
              <div className="text-sm text-slate-500">Tenés ventas listas para despachar por Correo local.</div>
            </div>
            <button className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-200">
              Ver ventas
            </button>
          </div>
          <div className="flex items-center justify-between p-6">
            <div>
              <div className="font-semibold text-slate-800">Respondé 2 preguntas</div>
              <div className="text-sm text-slate-500">Mantener un buen tiempo de respuesta mejora tu posicionamiento.</div>
            </div>
            <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Ir a preguntas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
