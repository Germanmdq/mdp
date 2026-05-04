import Link from "next/link";
import { Star, Gift, Zap, TrendingUp, ChevronRight, ShoppingBag, Coffee, Music, Utensils, Shirt } from "lucide-react";

export const metadata = {
  title: "MDP Puntos — Beneficios | MDP Market",
  description: "Conocé el programa de puntos y beneficios exclusivos de MDP Market & Services.",
};

const levels = [
  { name: "Bronce", min: 0, max: 999, color: "from-amber-700 to-amber-900", badge: "bg-amber-700", perks: ["1 punto por cada $100 gastados", "Descuentos en fechas especiales"] },
  { name: "Plata", min: 1000, max: 4999, color: "from-slate-400 to-slate-600", badge: "bg-slate-500", perks: ["1.5 puntos por cada $100", "Envíos gratis ilimitados", "Acceso anticipado a ofertas"] },
  { name: "Oro", min: 5000, max: 14999, color: "from-amber-400 to-amber-600", badge: "bg-amber-500", perks: ["2 puntos por cada $100", "Soporte prioritario", "15% OFF en servicios locales"] },
  { name: "Platinum", min: 15000, max: null, color: "from-indigo-500 to-purple-700", badge: "bg-indigo-600", perks: ["3 puntos por cada $100", "Todos los beneficios anteriores", "Acceso VIP a eventos MDP", "Asesor personal"] },
];

const benefits = [
  { icon: Coffee, partner: "Havanna", discount: "30% OFF", desc: "En cafeterías adheridas de Mar del Plata", level: "Nivel 6+", color: "from-indigo-900 to-purple-900" },
  { icon: Utensils, partner: "Antares", discount: "2×1", desc: "En pintas todos los jueves del mes", level: "Nivel 6+", color: "from-amber-600 to-amber-900" },
  { icon: ShoppingBag, partner: "Envíos Gratis", discount: "100%", desc: "En miles de productos desde $25.000", level: "Todos", color: "from-emerald-600 to-teal-800" },
  { icon: Music, partner: "Entretenimiento", discount: "20% OFF", desc: "En boliches, teatros y eventos locales", level: "Nivel 4+", color: "from-rose-500 to-pink-800" },
  { icon: Shirt, partner: "Moda MDP", discount: "15% OFF", desc: "En tiendas de indumentaria adheridas", level: "Nivel 3+", color: "from-blue-500 to-indigo-700" },
  { icon: Zap, partner: "Carga Rápida", discount: "5× puntos", desc: "En publicaciones Destacadas de la semana", level: "Todos", color: "from-yellow-500 to-orange-600" },
];

export default function PuntosPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 py-16 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="mb-6 flex items-center space-x-2 text-xs font-semibold text-indigo-300 uppercase tracking-widest">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <ChevronRight size={12} />
            <span className="text-white">MDP Puntos</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
              <Star size={28} className="text-amber-300 fill-amber-300" />
            </div>
            <div>
              <h1 className="text-4xl font-black">MDP Puntos</h1>
              <p className="text-indigo-200">El programa de beneficios del marketplace marplatense</p>
            </div>
          </div>
          <p className="text-indigo-100 text-lg max-w-2xl">
            Cada compra suma puntos. Más puntos, más nivel. Más nivel, mejores beneficios exclusivos en Mar del Plata.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-10 space-y-10">

        {/* How to earn */}
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">¿Cómo ganás puntos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: ShoppingBag, label: "Comprá productos", detail: "1 punto cada $100" },
              { icon: Star, label: "Calificá vendedores", detail: "+50 puntos por reseña" },
              { icon: Gift, label: "Referí amigos", detail: "+200 puntos por registro" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 border border-slate-100 p-5 flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                  <item.icon size={22} className="text-blue-600" />
                </div>
                <div className="font-bold text-slate-900 mb-1">{item.label}</div>
                <div className="text-sm text-green-600 font-semibold">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Levels */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Niveles de reputación</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {levels.map((level, i) => (
              <div key={i} className={`rounded-3xl bg-gradient-to-br ${level.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-black">{level.name}</div>
                  <div className="text-sm font-semibold text-white/70">
                    {level.min.toLocaleString()} – {level.max ? level.max.toLocaleString() : "∞"} pts
                  </div>
                </div>
                <ul className="space-y-1">
                  {level.perks.map((perk, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-white/90">
                      <div className="h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Partner benefits */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Beneficios con partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className={`rounded-3xl bg-gradient-to-br ${b.color} p-6 text-white flex flex-col justify-between h-44`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold uppercase tracking-widest text-white/60">{b.level}</div>
                  <b.icon size={20} className="text-white/70" />
                </div>
                <div>
                  <div className="text-3xl font-black mb-1">{b.partner}</div>
                  <div className="text-sm font-medium text-white/80">{b.discount} · {b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/productos" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3 font-bold text-white hover:bg-indigo-700 transition-colors">
            <TrendingUp size={18} />
            Empezá a sumar puntos
          </Link>
        </div>
      </div>
    </div>
  );
}
