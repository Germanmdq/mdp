import Link from "next/link";
import { CreditCard, Banknote, ShieldCheck, Smartphone, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Cómo pagar | MDP Market",
  description: "Conocé todos los métodos de pago disponibles en MDP Market & Services.",
};

const paymentMethods = [
  {
    icon: CreditCard,
    title: "Tarjetas de crédito",
    color: "text-blue-600",
    bg: "bg-blue-50",
    items: [
      "Visa, Mastercard, American Express y Cabal",
      "Hasta 12 cuotas sin interés con bancos seleccionados",
      "3 cuotas sin interés siempre disponibles",
      "Débito inmediato disponible",
    ],
  },
  {
    icon: Banknote,
    title: "Efectivo",
    color: "text-green-600",
    bg: "bg-green-50",
    items: [
      "Pagá en Rapipago, Pago Fácil y Cobro Express",
      "Más de 80 puntos en Mar del Plata",
      "Sin costo adicional",
      "Acreditación en hasta 2 días hábiles",
    ],
  },
  {
    icon: Smartphone,
    title: "Transferencia bancaria",
    color: "text-purple-600",
    bg: "bg-purple-50",
    items: [
      "Transferí desde cualquier banco o billetera",
      "Alias o CBU del vendedor habilitado",
      "Acreditación inmediata en la mayoría de los casos",
      "Sin comisión adicional",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Pago Protegido MDP",
    color: "text-amber-600",
    bg: "bg-amber-50",
    items: [
      "Tu dinero queda en custodia hasta que confirmás la entrega",
      "Si algo sale mal, te devolvemos el 100%",
      "Disponible para todos los métodos de pago",
      "Resolución de disputas en 72 hs",
    ],
  },
];

const banks = [
  { name: "Banco Provincia", cuotas: "12 sin interés", logo: "BP" },
  { name: "Banco Nación", cuotas: "12 sin interés", logo: "BN" },
  { name: "HSBC", cuotas: "9 sin interés", logo: "H" },
  { name: "Santander", cuotas: "6 sin interés", logo: "S" },
  { name: "Galicia", cuotas: "12 sin interés", logo: "G" },
  { name: "BBVA", cuotas: "9 sin interés", logo: "B" },
];

export default function ComoPagarPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="mb-4 flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-blue-600">Inicio</Link>
            <ChevronRight size={12} />
            <span className="text-slate-700">Cómo pagar</span>
          </nav>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Cómo pagar en MDP Market</h1>
          <p className="text-slate-500 text-lg">Elegí el método que más te convenga, siempre con Compra Protegida.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-10 space-y-8">

        {/* Payment Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paymentMethods.map((method, i) => (
            <div key={i} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${method.bg}`}>
                <method.icon size={24} className={method.color} />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-4">{method.title}</h2>
              <ul className="space-y-2">
                {method.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bank promotions */}
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Promociones bancarias vigentes</h2>
          <p className="text-slate-500 text-sm mb-6">Cuotas sin interés con tarjetas de crédito de bancos adheridos.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {banks.map((bank, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-black">
                  {bank.logo}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{bank.name}</div>
                  <div className="text-xs text-green-600 font-semibold">{bank.cuotas}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compra Protegida info */}
        <div className="rounded-3xl bg-blue-600 p-8 text-white">
          <div className="flex items-start gap-4 mb-4">
            <ShieldCheck size={32} className="shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-1">Compra Protegida MDP</h2>
              <p className="text-blue-100">Tu dinero no va directo al vendedor. Queda en custodia hasta que confirmás que recibiste todo bien.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {["Pagás de forma segura", "Recibís tu producto", "Confirmás y el vendedor cobra"].map((step, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl bg-blue-700/50 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-blue-600 font-black text-sm">{i + 1}</div>
                <span className="text-sm font-semibold">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/productos" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-700 transition-colors">
            Ir a comprar
          </Link>
        </div>
      </div>
    </div>
  );
}
