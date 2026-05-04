
import { ShieldCheck, CheckCircle2, Truck, MessageCircle, AlertCircle, Phone, Package, CreditCard } from "lucide-react";
import Link from "next/link";

export default async function OperationTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-sm text-slate-500 font-bold uppercase tracking-widest mb-2">
                <span>Operación</span>
                <span className="text-slate-900">{id}</span>
                <span className="h-4 w-[1px] bg-slate-300"></span>
                <span className="text-blue-600">Pago Protegido</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Seguimiento de Operación</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
                Abrir Reclamo
              </button>
              <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center">
                <MessageCircle size={18} className="mr-2" />
                Contactar Soporte
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Timeline Column */}
            <div className="lg:col-span-8">
              <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-10">Línea de tiempo</h3>
                
                <div className="relative space-y-12">
                  {/* Timeline Bar */}
                  <div className="absolute left-[21px] top-2 h-[calc(100%-16px)] w-1 bg-slate-100"></div>
                  <div className="absolute left-[21px] top-2 h-1/2 w-1 bg-green-500"></div>

                  {[
                    { title: "Pago aprobado", desc: "El dinero ha sido recibido y está en custodia protegida.", date: "Hoy, 14:20", status: "completed" },
                    { title: "Vendedor notificado", desc: "El vendedor ya recibió la orden y está preparando el producto.", date: "Hoy, 14:25", status: "completed" },
                    { title: "Producto preparado", desc: "El producto está listo para ser retirado o enviado.", date: "Hoy, 16:40", status: "completed" },
                    { title: "En camino", desc: "La logística local está trasladando tu producto.", date: "Estimado: Mañana", status: "current" },
                    { title: "Entregado", desc: "Confirmá la recepción para liberar el pago.", date: "-", status: "pending" },
                    { title: "Pago liberado", desc: "El proceso ha finalizado correctamente.", date: "-", status: "pending" },
                  ].map((step, i) => (
                    <div key={i} className="relative flex items-start pl-12">
                      <div className={`absolute left-0 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white shadow-md z-10 ${step.status === 'completed' ? 'bg-green-500 text-white' : step.status === 'current' ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-200 text-slate-400'}`}>
                        {step.status === 'completed' ? <CheckCircle2 size={20} /> : i === 3 ? <Truck size={20} /> : <span className="font-bold text-sm">{i+1}</span>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-lg font-bold ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{step.title}</h4>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{step.date}</span>
                        </div>
                        <p className={`mt-1 text-sm ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-600'}`}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 rounded-2xl bg-blue-50 p-6 border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      <Package size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-blue-900 uppercase tracking-wide">¿Ya tenés el producto?</div>
                      <p className="text-xs text-blue-600">Confirmá la entrega para que el vendedor pueda cobrar.</p>
                    </div>
                  </div>
                  <button className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                    Confirmar Entrega
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-4 space-y-6">
              {/* Summary */}
              <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6">Detalles de Operación</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=100&h=100&fit=crop" alt="" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">iPhone 13 128GB</div>
                      <div className="text-xs text-slate-500">Vendedor: Tienda Celu</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Monto Protegido</span>
                      <span className="font-bold">$125.000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Método de Pago</span>
                      <span className="flex items-center font-bold text-slate-900">
                        <CreditCard size={14} className="mr-1" />
                        **** 4242
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Protection Badge */}
              <div className="rounded-3xl bg-slate-900 p-8 text-white">
                <div className="flex items-center space-x-3 mb-6">
                  <ShieldCheck className="text-blue-500" size={32} />
                  <h3 className="text-lg font-bold">Pago Entregado MDP</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Tu dinero está seguro. MDP Market actúa como intermediario confiable para garantizar que la operación sea exitosa para ambas partes.
                </p>
                <Link href="/como-funciona" className="text-sm font-bold text-blue-500 hover:underline">Conocer más sobre protección</Link>
              </div>

              {/* Support Card */}
              <div className="rounded-3xl bg-white p-8 border border-slate-100 text-center">
                <AlertCircle className="mx-auto mb-4 text-slate-300" size={40} />
                <h3 className="font-bold text-slate-900 mb-2">¿Necesitás ayuda?</h3>
                <p className="text-xs text-slate-500 mb-6">Si tenés algún problema con la entrega o el producto, podés abrir un reclamo.</p>
                <button className="w-full rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
                  Ayuda con esta compra
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
