
import { businessMetrics } from "@/lib/data";
import { Users, ShoppingBag, Briefcase, TrendingUp, DollarSign, Percent, Package, AlertCircle, ShieldCheck, CheckCircle2, Zap } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="bg-slate-50 min-h-screen p-8">
      <div className="container mx-auto">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Panel Administrador</h1>
            <p className="text-slate-500">Métricas generales y control operativo de la plataforma.</p>
          </div>
          <div className="flex space-x-3">
            <div className="flex items-center space-x-2 rounded-xl bg-white px-4 py-2 border border-slate-200 text-sm font-bold text-slate-700 shadow-sm">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Sistema Online</span>
            </div>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            { label: "Usuarios Registrados", value: businessMetrics.registeredUsers.toLocaleString("es-AR"), icon: Users, color: "blue" },
            { label: "Vendedores Activos", value: businessMetrics.sellers.toLocaleString("es-AR"), icon: ShoppingBag, color: "green" },
            { label: "Profesionales", value: businessMetrics.professionals.toLocaleString("es-AR"), icon: Briefcase, color: "purple" },
            { label: "Productos Públicos", value: businessMetrics.publishedProducts.toLocaleString("es-AR"), icon: Package, color: "amber" },
          ].map((m, i) => (
            <div key={i} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-${m.color}-50 text-${m.color}-600`}>
                <m.icon size={24} />
              </div>
              <div className="text-2xl font-bold text-slate-900">{m.value}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 mb-8">
          {/* Revenue Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl bg-blue-600 p-8 text-white shadow-xl relative overflow-hidden md:col-span-2">
              <div className="absolute top-0 right-0 h-64 w-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex items-center space-x-3 mb-6 relative z-10">
                <DollarSign size={32} />
                <h3 className="text-xl font-bold">Volumen Operado Mensual (GMV)</h3>
              </div>
              <div className="text-6xl font-extrabold mb-4 relative z-10">${businessMetrics.monthlyGMV.toLocaleString("es-AR")}</div>
              <div className="flex items-center space-x-2 text-blue-200 font-bold relative z-10">
                <TrendingUp size={20} />
                <span>+12.5% respecto al mes anterior</span>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center">
                <Percent size={18} className="mr-2 text-blue-600" />
                Comisión Estimada
              </h3>
              <div className="text-3xl font-extrabold text-slate-900">${businessMetrics.monthlyCommission.toLocaleString("es-AR")}</div>
              <div className="mt-2 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded w-fit">10% Average</div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center">
                <Zap size={18} className="mr-2 text-amber-500" />
                Ingresos por Destacados
              </h3>
              <div className="text-3xl font-extrabold text-slate-900">${businessMetrics.featuredRevenue.toLocaleString("es-AR")}</div>
              <div className="mt-2 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded w-fit">ADS / PREMIUM</div>
            </div>
          </div>

          {/* Side Metrics */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Ingreso Mensual Estimado</h3>
              <div className="text-4xl font-extrabold text-blue-400 mb-2">${businessMetrics.estimatedMonthlyRevenue.toLocaleString("es-AR")}</div>
              <div className="text-xs text-slate-500 font-bold uppercase">Neto Plataforma</div>
              <hr className="my-6 border-slate-800" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Proyección Anual</h3>
              <div className="text-2xl font-bold text-white">${businessMetrics.estimatedAnnualRevenue.toLocaleString("es-AR")}</div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Estado de Disputas</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-700">Abiertas</span>
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-700">En Mediación</span>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-600">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-700">Resueltas Hoy</span>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">45</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Operations Mockup */}
        <div className="rounded-3xl bg-white shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b">
            <h3 className="text-lg font-bold text-slate-900">Operaciones Recientes</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b">
                  <th className="px-8 py-4">ID</th>
                  <th className="px-8 py-4">Comprador</th>
                  <th className="px-8 py-4">Vendedor/Prof</th>
                  <th className="px-8 py-4">Monto</th>
                  <th className="px-8 py-4">Estado</th>
                  <th className="px-8 py-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: "MDP-8932", comp: "Juan Pérez", vend: "Roberto Gasista", amount: "$15.000", status: "Pago Protegido", color: "blue" },
                  { id: "MDP-8931", comp: "María García", vend: "Tienda Celu", amount: "$120.000", status: "En Camino", color: "blue" },
                  { id: "MDP-8930", comp: "Carlos Sol", vend: "Plomero Tito", amount: "$8.500", status: "Entregado", color: "green" },
                  { id: "MDP-8929", comp: "Ana L.", vend: "Bici Shop", amount: "$45.000", status: "Disputa", color: "red" },
                ].map((op, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-4 font-bold text-slate-900">{op.id}</td>
                    <td className="px-8 py-4 text-sm text-slate-600">{op.comp}</td>
                    <td className="px-8 py-4 text-sm text-slate-600">{op.vend}</td>
                    <td className="px-8 py-4 text-sm font-bold text-slate-900">{op.amount}</td>
                    <td className="px-8 py-4">
                      <span className={`rounded-full bg-${op.color}-100 px-3 py-1 text-[10px] font-bold text-${op.color}-600 uppercase`}>
                        {op.status}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button className="text-xs font-bold text-blue-600 hover:underline">Ver detalle</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Heatmap Section */}
        <div className="mt-8 rounded-3xl bg-white shadow-sm border border-slate-100 p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Mapa de Calor: Ventas por Zona y Categoría</h3>
              <p className="text-sm text-slate-500">Concentración de operaciones en los últimos 30 días.</p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400">
              <span>Menos ventas</span>
              <div className="flex space-x-1">
                <div className="h-3 w-3 rounded-sm bg-blue-100"></div>
                <div className="h-3 w-3 rounded-sm bg-blue-300"></div>
                <div className="h-3 w-3 rounded-sm bg-blue-500"></div>
                <div className="h-3 w-3 rounded-sm bg-blue-700"></div>
                <div className="h-3 w-3 rounded-sm bg-blue-900"></div>
              </div>
              <span>Más ventas</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr>
                  <th className="p-3 text-left text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-r">Categoría \ Zona</th>
                  {["Centro", "Güemes", "La Perla", "Constitución", "Puerto", "P. Mogotes"].map(z => (
                    <th key={z} className="p-3 text-xs font-bold text-slate-600 border-b">{z}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { cat: "Celulares y Tec.", data: [90, 70, 40, 50, 20, 10] },
                  { cat: "Hogar y Muebles", data: [30, 40, 60, 80, 20, 50] },
                  { cat: "Indumentaria", data: [100, 95, 30, 40, 15, 20] },
                  { cat: "Serv. Plomería", data: [40, 50, 70, 60, 30, 80] },
                  { cat: "Serv. Electricidad", data: [30, 40, 60, 50, 40, 60] },
                  { cat: "Serv. Aire Acond.", data: [50, 60, 40, 50, 20, 70] },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="p-3 text-left text-sm font-bold text-slate-700 border-r">{row.cat}</td>
                    {row.data.map((val, j) => {
                      let bgColor = "bg-blue-100";
                      if (val > 20) bgColor = "bg-blue-300";
                      if (val > 40) bgColor = "bg-blue-500 text-white";
                      if (val > 60) bgColor = "bg-blue-700 text-white";
                      if (val > 80) bgColor = "bg-blue-900 text-white";
                      
                      return (
                        <td key={j} className="p-1 border border-white">
                          <div className={`h-12 w-full rounded-lg flex items-center justify-center font-bold text-sm transition-transform hover:scale-105 cursor-pointer ${bgColor}`}>
                            {val}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
