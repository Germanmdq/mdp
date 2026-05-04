
import { projections, businessMetrics } from "@/lib/data";
import { TrendingUp, PieChart, Users, DollarSign, ArrowUpRight, ShieldCheck, Target, BarChart3, Globe } from "lucide-react";
import Link from "next/link";

export default function InvestorPage() {
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-extrabold tracking-tight mb-6 lg:text-7xl">
              MDP Market <span className="text-blue-500">& Services</span>
            </h1>
            <p className="text-2xl text-slate-400 mb-8 font-light">
              Proyección comercial y valuación de plataforma - Año 1
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="rounded-full bg-blue-600/10 border border-blue-500/20 px-6 py-2 text-blue-400 font-bold text-sm uppercase tracking-widest">
                Investor Relations
              </div>
              <div className="rounded-full bg-slate-800 border border-slate-700 px-6 py-2 text-slate-400 font-bold text-sm uppercase tracking-widest">
                Mar del Plata, Argentina
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">Visión Estratégica</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                MDP Market & Services se posiciona como una infraestructura comercial local para Mar del Plata, integrando productos, servicios, profesionales verificados, pago protegido, logística y reputación real dentro de un solo ecosistema.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                La plataforma no depende de crear un hábito nuevo desde cero. Se apoya en operaciones que ya ocurren diariamente por canales informales y las transforma en transacciones seguras, medibles y monetizables.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <Target className="text-blue-600 mb-4" size={32} />
                  <h4 className="font-bold mb-2">Objetivo Año 1</h4>
                  <p className="text-sm text-slate-500">Validar modelo y consolidar marca líder local.</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <Globe className="text-blue-600 mb-4" size={32} />
                  <h4 className="font-bold mb-2">Escalabilidad</h4>
                  <p className="text-sm text-slate-500">Modelo replicable en ciudades del interior.</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-blue-600 p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 h-64 w-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-2xl font-bold mb-8 relative z-10">Proyección Anual Estimada</h3>
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between border-b border-white/20 pb-4">
                  <span className="text-blue-100">Volumen operado anual</span>
                  <span className="text-2xl font-bold">$1.802.300.000</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-4">
                  <span className="text-blue-100">Comisión anual estimada (10%)</span>
                  <span className="text-xl font-bold">$180.230.000</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-4">
                  <span className="text-blue-100">Ingresos por destacados / ADS</span>
                  <span className="text-xl font-bold">$28.350.000</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-4">
                  <span className="text-blue-100">Margen logístico estimado</span>
                  <span className="text-xl font-bold">$16.900.000</span>
                </div>
                <div className="flex justify-between pt-4">
                  <span className="text-blue-100 text-lg font-bold">Ingreso bruto anual estimado</span>
                  <span className="text-3xl font-extrabold text-blue-300">$225.480.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projection Table */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Escenario Operativo Proyectado</h2>
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-widest font-bold">
                  <th className="px-6 py-4">Mes</th>
                  <th className="px-6 py-4 text-right">Operaciones</th>
                  <th className="px-6 py-4 text-right">Ticket Promedio</th>
                  <th className="px-6 py-4 text-right">Volumen Operado</th>
                  <th className="px-6 py-4 text-right">Comisión</th>
                  <th className="px-6 py-4 text-right">Ads/Logística</th>
                  <th className="px-6 py-4 text-right">Ingreso Bruto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projections.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{p.month}</td>
                    <td className="px-6 py-4 text-right font-medium text-slate-600">{p.operations}</td>
                    <td className="px-6 py-4 text-right font-medium text-slate-600">${p.ticket.toLocaleString("es-AR")}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">${p.venv.toLocaleString("es-AR")}</td>
                    <td className="px-6 py-4 text-right font-medium text-blue-600">${p.commission.toLocaleString("es-AR")}</td>
                    <td className="px-6 py-4 text-right font-medium text-slate-500">${(p.ads + p.logistics).toLocaleString("es-AR")}</td>
                    <td className="px-6 py-4 text-right font-extrabold text-slate-900">${p.total.toLocaleString("es-AR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Valuation Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Valuación estimada de la plataforma</h2>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto">
              Utilizando múltiplos sobre ingresos brutos anuales proyectados para una plataforma digital transaccional local una vez validada la operación.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl border border-slate-100 bg-white p-10 shadow-lg text-center">
              <div className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">Escenario Conservador (2x)</div>
              <div className="text-4xl font-extrabold text-slate-900 mb-2">$450.960.000</div>
              <div className="text-slate-500 text-sm italic">ARS</div>
            </div>
            <div className="rounded-3xl border-2 border-blue-600 bg-white p-10 shadow-2xl text-center relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Escenario Base (3x)
              </div>
              <div className="text-5xl font-extrabold text-blue-600 mb-2">$676.440.000</div>
              <div className="text-slate-500 text-sm italic">ARS</div>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-white p-10 shadow-lg text-center">
              <div className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">Escenario Agresivo (4x)</div>
              <div className="text-4xl font-extrabold text-slate-900 mb-2">$901.920.000</div>
              <div className="text-slate-500 text-sm italic">ARS</div>
            </div>
          </div>
          
          <div className="mt-12 text-center p-8 rounded-3xl bg-slate-900 text-white max-w-4xl mx-auto">
            <div className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4">Rango estimado de valor al año 1</div>
            <div className="text-4xl md:text-6xl font-bold">Entre $450M y $900M ARS</div>
          </div>
        </div>
      </section>

      {/* Strategic Remate */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 max-w-4xl mx-auto leading-tight">
            MDP Market & Services no es una tienda online. Es una infraestructura comercial local diseñada para ordenar la economía digital de Mar del Plata.
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
            La plataforma concentra productos, servicios, profesionales, pagos, logística, reputación y soporte en un mismo ecosistema.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-colors">
              Explorar Plataforma Demo
            </Link>
            <button className="border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
              Contactar al Equipo Fundador
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
