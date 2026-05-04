import Link from "next/link";
import { Package, Truck, CheckCircle2, Clock, ChevronRight, RotateCcw } from "lucide-react";
import DeliveryEstimator from "@/components/checkout/DeliveryEstimator";

export const metadata = {
  title: "Mis Compras | MDP Market",
};

const orders = [
  {
    id: "MDP-8932",
    item: "iPhone 13 128GB",
    status: "en_camino",
    statusLabel: "En camino",
    date: "3 de mayo de 2026",
    price: 650000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80",
    seller: "APPLE_OFFICIAL",
  },
  {
    id: "MDP-8931",
    item: "Taladro Bosch Gsb 13 Re",
    status: "entregado",
    statusLabel: "Entregado",
    date: "15 de abril de 2026",
    price: 89000,
    image: "https://images.unsplash.com/photo-1581147036324-c47a03a81d48?w=200&q=80",
    seller: "FERRETERIA_LOPEZ",
  },
  {
    id: "MDP-8905",
    item: "Samsung Galaxy Watch6",
    status: "entregado",
    statusLabel: "Entregado",
    date: "2 de abril de 2026",
    price: 349999,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&q=80",
    seller: "SAMSUNG_STORE",
  },
];

const statusConfig: Record<string, { color: string; icon: React.ComponentType<{ size: number; className?: string }> }> = {
  en_camino: { color: "text-blue-600 bg-blue-50 border-blue-100", icon: Truck },
  entregado: { color: "text-green-600 bg-green-50 border-green-100", icon: CheckCircle2 },
  pendiente: { color: "text-amber-600 bg-amber-50 border-amber-100", icon: Clock },
};

export default function ComprasPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white border border-slate-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Mis compras</h1>
          <span className="text-sm text-slate-500">{orders.length} órdenes</span>
        </div>

        {/* Active order banner */}
        <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <Truck size={20} className="text-blue-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-blue-900 mb-1">Tenés un envío en camino</div>
              <DeliveryEstimator />
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {orders.map((order) => {
            const cfg = statusConfig[order.status];
            const Icon = cfg.icon;
            return (
              <div key={order.id} className="flex items-center gap-4 py-5 first:pt-0 last:pb-0">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                  <img src={order.image} alt={order.item} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`mb-1 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cfg.color}`}>
                    <Icon size={10} />
                    {order.statusLabel}
                  </div>
                  <div className="font-semibold text-slate-900 truncate">{order.item}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{order.date} · {order.seller} · #{order.id}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-slate-900">${order.price.toLocaleString("es-AR")}</div>
                  <button className="mt-2 flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors">
                    Ver detalle <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl bg-white border border-slate-100 p-6 shadow-sm">
        <h2 className="font-bold text-slate-900 mb-4">¿Necesitás ayuda con una compra?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { icon: RotateCcw, label: "Iniciar devolución", desc: "Hasta 7 días desde la entrega" },
            { icon: Package, label: "Reportar problema", desc: "No llegó o está dañado" },
            { icon: CheckCircle2, label: "Confirmar recepción", desc: "Liberá el pago al vendedor" },
          ].map((action, i) => (
            <button key={i} className="flex items-start gap-3 rounded-2xl border border-slate-100 p-4 text-left hover:bg-slate-50 transition-colors">
              <action.icon size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-slate-800">{action.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{action.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
