import Link from "next/link";
import { ShieldCheck, RefreshCw, Clock, Lock, CheckCircle2, ChevronRight, Headphones } from "lucide-react";

export const metadata = {
  title: "Compra Protegida | MDP Market",
  description: "Tu compra siempre está protegida en MDP Market. Conocé cómo te cuidamos.",
};

const steps = [
  { n: "1", title: "Pagás de forma segura", desc: "Tu dinero queda en custodia de MDP Market, no va directo al vendedor.", icon: Lock },
  { n: "2", title: "Recibís tu producto", desc: "El vendedor te envía o coordina la entrega. Tenés hasta 7 días para revisarlo.", icon: CheckCircle2 },
  { n: "3", title: "Confirmás y el vendedor cobra", desc: "Solo cuando confirmás que todo está bien, liberamos el pago al vendedor.", icon: ShieldCheck },
];

const guarantees = [
  { icon: RefreshCw, title: "Devolución sin preguntas", desc: "Si el producto no es lo que esperabas, iniciá una devolución en 7 días y te reintegramos el 100%." },
  { icon: Clock, title: "Resolución en 72 hs", desc: "Nuestro equipo analiza cada disputa y resuelve en menos de 72 horas hábiles." },
  { icon: ShieldCheck, title: "Pago siempre protegido", desc: "Tu tarjeta, datos y dinero están seguros. Nunca compartimos tu información con terceros." },
  { icon: Headphones, title: "Soporte local", desc: "Equipo de soporte de Mar del Plata disponible de lunes a sábado de 9 a 20 hs." },
];

export default function CompraProtegidaPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="mb-4 flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-blue-600">Inicio</Link>
            <ChevronRight size={12} />
            <span className="text-slate-700">Compra Protegida</span>
          </nav>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Tu compra siempre protegida</h1>
          <p className="text-slate-500 text-lg">En MDP Market, no hay nada que no puedas hacer porque siempre estás protegido.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-10 space-y-8">

        {/* How it works */}
        <div className="rounded-3xl bg-blue-600 p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">¿Cómo funciona?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((step) => (
              <div key={step.n} className="rounded-2xl bg-white/10 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600 font-black text-lg mb-3">{step.n}</div>
                <h3 className="font-bold mb-1">{step.title}</h3>
                <p className="text-sm text-blue-100">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guarantees.map((g, i) => (
            <div key={i} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                <g.icon size={22} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{g.title}</h3>
              <p className="text-sm text-slate-500">{g.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/productos" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-700 transition-colors">
            Comprar con seguridad
          </Link>
        </div>
      </div>
    </div>
  );
}
