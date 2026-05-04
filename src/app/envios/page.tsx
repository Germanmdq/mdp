import Link from "next/link";
import { Truck, MapPin, Package, Clock, CheckCircle2, ChevronRight, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
  title: "Envíos | MDP Market",
  description: "Gratis desde $25.000. Envíos rápidos y seguros en Mar del Plata.",
};

const shippingOptions = [
  { icon: Zap, title: "Envío Express (hoy)", color: "text-amber-500", bg: "bg-amber-50", price: "$1.200", time: "Mismo día", zone: "MdP Centro, Sur y Norte" },
  { icon: Truck, title: "Envío Estándar", color: "text-blue-600", bg: "bg-blue-50", price: "Gratis desde $25.000", time: "1 día hábil", zone: "Todo Mar del Plata" },
  { icon: MapPin, title: "Retiro en el local", color: "text-green-600", bg: "bg-green-50", price: "Gratis", time: "Coordinado con el vendedor", zone: "Según ubicación" },
  { icon: Package, title: "Correo local MDP", color: "text-purple-600", bg: "bg-purple-50", price: "$800", time: "2-3 días hábiles", zone: "Todo el partido" },
];

export default function EnviosPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="mb-4 flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-blue-600">Inicio</Link>
            <ChevronRight size={12} />
            <span className="text-slate-700">Envíos</span>
          </nav>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Envíos en MDP Market</h1>
          <p className="text-slate-500 text-lg">Rápido, local y seguro. Gratis desde $25.000.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-10 space-y-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white flex items-center justify-between gap-6">
          <div>
            <div className="text-sm font-bold uppercase tracking-widest text-blue-200 mb-1">Beneficio exclusivo</div>
            <div className="text-3xl font-black mb-2">Envío gratis</div>
            <p className="text-blue-100">En miles de productos desde $25.000 solo por estar registrado.</p>
          </div>
          <Truck size={72} className="text-blue-300 shrink-0" strokeWidth={1} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shippingOptions.map((opt, i) => (
            <div key={i} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${opt.bg}`}>
                <opt.icon size={22} className={opt.color} />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">{opt.title}</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Costo</span><span className="font-semibold text-green-600">{opt.price}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Tiempo</span><span className="font-semibold text-slate-800">{opt.time}</span></div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <MapPin size={13} className="text-slate-400 shrink-0" />
                  <span className="text-slate-500">{opt.zone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-slate-900 p-8 text-white flex items-start gap-4">
          <ShieldCheck size={28} className="text-blue-400 shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold mb-2">Envío + Compra Protegida</h2>
            <p className="text-slate-400">Si tu producto no llega o no es lo que esperabas, te devolvemos el dinero. Siempre.</p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/productos" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-700 transition-colors">
            Ver productos con envío gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
