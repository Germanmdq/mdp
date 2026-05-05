"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, CreditCard, CheckCircle2, Truck, MapPin, Store } from "lucide-react";
import Link from "next/link";
import DeliveryEstimator from "@/components/checkout/DeliveryEstimator";

interface CheckoutContentProps {
  initialProduct: any;
  quantity: number;
}

export default function CheckoutClient({ initialProduct, quantity }: CheckoutContentProps) {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const { createOrder } = await import("@/app/actions/order");
      const total = initialProduct.price * quantity;
      const result = await createOrder(initialProduct.id, quantity, total);
      if (result.success) {
        setOrderId(result.orderId);
        setStep(3);
      }
    } catch (error) {
      console.error("Error processing order:", error);
      alert("Hubo un error al procesar tu compra.");
    } finally {
      setIsProcessing(false);
    }
  };

  const itemTitle = initialProduct.title;
  const itemPrice = initialProduct.price;
  const itemImage = JSON.parse(initialProduct.images)[0];
  const itemSeller = initialProduct.seller.nickname;

  return (
    <div className="bg-[#ebebeb] min-h-screen pb-12">
      <header className="bg-blue-600 h-[72px] flex items-center shadow-sm">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link href="/" className="font-black text-2xl tracking-tighter text-white">
            MDP Market
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 mt-8 max-w-5xl">
        {step < 3 && (
          <div className="mb-6 flex items-center">
            <h1 className="text-2xl font-semibold text-slate-900">
              {step === 1 ? "¿Cómo querés recibir tu compra?" : "¿Cómo querés pagar?"}
            </h1>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {step === 1 && (
              <>
                <div className="rounded-sm bg-white p-6 shadow-sm border border-slate-200">
                  <h2 className="text-lg font-semibold text-slate-800 mb-4">Recibir compra</h2>
                  <div className="rounded-xl border border-blue-500 bg-blue-50/50 p-4 relative cursor-pointer">
                    <div className="flex gap-4">
                      <Truck className="text-blue-500 mt-1 shrink-0" />
                      <div className="flex-1">
                        <DeliveryEstimator />
                        <div className="mt-2 text-sm text-slate-500">Envío local · Mar del Plata</div>
                        <div className="mt-1 text-sm font-semibold text-green-600">Gratis</div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 h-5 w-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                  </div>
                </div>

                <div className="rounded-sm bg-white p-6 shadow-sm border border-slate-200">
                  <h2 className="text-lg font-semibold text-slate-800 mb-4">Retirar compra</h2>
                  <div className="rounded-xl border border-slate-200 p-4 relative cursor-pointer hover:bg-slate-50">
                    <div className="flex gap-4">
                      <Store className="text-slate-400 mt-1" />
                      <div>
                        <div className="font-semibold text-slate-800">Retiro en punto MDP Market</div>
                        <div className="text-sm text-slate-500">A partir de hoy</div>
                        <div className="mt-1 text-sm font-semibold text-slate-900">Gratis</div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 h-5 w-5 rounded-full border-2 border-slate-300"></div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <button onClick={() => setStep(2)} className="rounded-sm bg-blue-600 px-10 py-4 text-base font-bold text-white transition-all hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                    Continuar
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="rounded-sm bg-white shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-800">Tarjetas de crédito</h2>
                    <p className="text-sm text-slate-500 mt-1">Hasta 12 cuotas sin interés</p>
                  </div>
                  <div className="p-6 bg-blue-50/30 border border-blue-500 rounded-sm relative m-6 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-14 items-center justify-center rounded border border-slate-200 bg-white">
                        <CreditCard className="text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">Terminada en 4829</div>
                        <div className="text-sm text-slate-500">Visa Crédito</div>
                      </div>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 h-5 w-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <button onClick={() => setStep(1)} className="font-bold text-blue-600 hover:underline">
                    Volver
                  </button>
                  <button onClick={handlePayment} disabled={isProcessing} className="rounded-sm bg-blue-600 px-10 py-4 text-base font-bold text-white transition-all hover:bg-blue-700 shadow-xl shadow-blue-500/20 disabled:opacity-50">
                    {isProcessing ? "Procesando pago..." : "Confirmar compra"}
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="rounded-sm bg-white p-12 text-center shadow-sm border border-slate-200 animate-in zoom-in duration-500">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-500">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="mb-2 text-3xl font-bold text-slate-900">¡Compra exitosa!</h2>
                <p className="mb-8 text-slate-500">Nro de orden: <span className="font-mono font-bold text-slate-800">#{orderId?.slice(-6).toUpperCase()}</span></p>
                <div className="mx-auto max-w-sm rounded-xl bg-slate-50 p-6 text-left border border-slate-100">
                  <div className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">Entrega estimada</div>
                  <div className="font-bold text-slate-900 text-lg">Mañana antes de las 18:00hs</div>
                  <div className="text-sm text-slate-600 mt-1">Av. Luro 3200, Mar del Plata</div>
                </div>
                <Link href="/" className="mt-10 inline-block rounded-sm bg-blue-600 px-10 py-4 font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all">
                  Volver al inicio
                </Link>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="rounded-sm bg-white p-6 shadow-sm border border-slate-200 sticky top-24">
              <h3 className="mb-4 font-bold text-slate-800 pb-4 border-b border-slate-100 uppercase text-xs tracking-widest">Resumen de compra</h3>
              
              <div className="flex gap-4 pb-4 border-b border-slate-100">
                <div className="h-16 w-16 shrink-0 rounded border border-slate-100 overflow-hidden">
                  <img src={itemImage} alt="" className="h-full w-full object-contain" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-800 line-clamp-2">{itemTitle}</div>
                  <div className="mt-1 text-xs text-slate-500">Cantidad: {quantity}</div>
                </div>
              </div>

              <div className="space-y-3 py-4 border-b border-slate-100 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Productos ({quantity})</span>
                  <span>${(itemPrice * quantity).toLocaleString("es-AR")}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Envío</span>
                  <span className="font-bold text-green-600">Gratis</span>
                </div>
              </div>

              <div className="flex justify-between py-4 text-xl font-bold text-slate-900">
                <span>Total</span>
                <span>${(itemPrice * quantity).toLocaleString("es-AR")}</span>
              </div>
              
              <div className="mt-4 flex items-start gap-2 text-[10px] text-slate-400 bg-slate-50 p-3 rounded">
                <ShieldCheck size={16} className="shrink-0 text-slate-300" />
                <span><strong className="font-bold text-slate-500">Compra Protegida</strong> con MDP Market. Tu dinero está seguro hasta que recibas el producto.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
