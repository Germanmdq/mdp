"use client";

import { useSearchParams } from "next/navigation";
import { products, services } from "@/lib/data";
import { ShieldCheck, CreditCard, CheckCircle2, Truck, Calendar, MapPin, Store, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState, Suspense } from "react";
import DeliveryEstimator from "@/components/checkout/DeliveryEstimator";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const type = searchParams.get("type") || "product";
  
  const item = type === "service" 
    ? services.find(s => s.id === id) 
    : products.find(p => p.id === id);

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!item) return <div className="p-20 text-center font-bold text-slate-500">Publicación no encontrada</div>;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setStep(3);
      setIsProcessing(false);
    }, 2000);
  };

  const isProduct = type === "product";
  const itemTitle = isProduct ? (item as any).title : (item as any).name;
  const itemPrice = isProduct ? (item as any).price : (item as any).priceFrom;
  const itemImage = isProduct ? (item as any).thumbnail : (item as any).image;
  const itemSeller = isProduct ? (item as any).seller.nickname : (item as any).professionalName;

  return (
    <div className="bg-[#ebebeb] min-h-screen pb-12">
      {/* ML Style Simple Header for Checkout */}
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
                <div className="rounded-md bg-white p-6 shadow-sm border border-slate-200">
                  <h2 className="text-lg font-semibold text-slate-800 mb-4">Recibir compra</h2>
                <div className="rounded-2xl border border-blue-500 bg-blue-50/50 p-4 relative cursor-pointer">
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

                <div className="rounded-md bg-white p-6 shadow-sm border border-slate-200">
                  <h2 className="text-lg font-semibold text-slate-800 mb-4">Retirar compra</h2>
                <div className="rounded-2xl border border-slate-200 p-4 relative cursor-pointer hover:bg-slate-50">
                    <div className="flex gap-4">
                      <Store className="text-slate-400 mt-1" />
                      <div>
                        <div className="font-semibold text-slate-800">Retiro en correo y otros puntos</div>
                        <div className="text-sm text-slate-500">A partir del miércoles</div>
                        <div className="mt-1 text-sm font-semibold text-slate-900">Gratis</div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 h-5 w-5 rounded-full border-2 border-slate-300"></div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-4 relative cursor-pointer mt-3 hover:bg-slate-50">
                    <div className="flex gap-4">
                      <MapPin className="text-slate-400 mt-1" />
                      <div>
                        <div className="font-semibold text-slate-800">El domicilio del vendedor</div>
                        <div className="text-sm text-slate-500">Mar del Plata Centro</div>
                        <div className="mt-1 text-sm font-semibold text-slate-900">Gratis</div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 h-5 w-5 rounded-full border-2 border-slate-300"></div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <button onClick={() => setStep(2)} className="rounded bg-blue-500 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-600">
                    Continuar
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="rounded-md bg-white shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-800">Tarjetas de crédito</h2>
                    <p className="text-sm text-slate-500 mt-1">Hasta 12 cuotas sin interés con bancos seleccionados</p>
                  </div>
                  <div className="p-6 bg-blue-50/30 border border-blue-500 rounded relative m-6 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-14 items-center justify-center rounded border border-slate-200 bg-white">
                        <CreditCard className="text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">Terminada en 4829</div>
                        <div className="text-sm text-slate-500">Visa Crédito</div>
                      </div>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 h-5 w-5 rounded-full border-5 border-blue-500 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                  </div>
                  <div className="p-6 border-t border-slate-100 text-blue-500 font-semibold cursor-pointer hover:bg-slate-50">
                    + Nueva tarjeta de crédito
                  </div>
                </div>

                <div className="rounded-md bg-white shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-800">Otros medios de pago</h2>
                  </div>
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-14 items-center justify-center rounded border border-slate-200 bg-slate-100 text-slate-500 font-bold text-xs">EFVO</div>
                      <div className="font-semibold text-slate-800">Efectivo en puntos de pago</div>
                    </div>
                    <div className="h-5 w-5 rounded-full border-2 border-slate-300"></div>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <button onClick={() => setStep(1)} className="font-semibold text-blue-500 hover:text-blue-700">
                    Volver
                  </button>
                  <button onClick={handlePayment} disabled={isProcessing} className="rounded bg-blue-500 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-50">
                    {isProcessing ? "Procesando pago..." : "Confirmar compra"}
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="rounded-md bg-white p-8 text-center shadow-sm border border-slate-200">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-500">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="mb-2 text-2xl font-semibold text-slate-800">¡Excelente compra!</h2>
                <p className="mb-6 text-slate-500">Te enviamos los detalles a tu email.</p>
                <div className="mx-auto max-w-sm rounded-md bg-[#ebebeb] p-4 text-left">
                  <div className="mb-2 text-xs font-semibold uppercase text-slate-500">Detalles de entrega</div>
                  <div className="font-semibold text-slate-900">Llega mañana a tu domicilio</div>
                  <div className="text-sm text-slate-600">Av. Luro 3200, Mar del Plata</div>
                </div>
                <Link href="/" className="mt-8 inline-block rounded bg-blue-500 px-6 py-2.5 font-semibold text-white hover:bg-blue-600">
                  Volver al inicio
                </Link>
              </div>
            )}
          </div>

          {/* Right Column (Summary) */}
          <div className="lg:col-span-4">
            <div className="rounded-md bg-white p-6 shadow-sm border border-slate-200 sticky top-24">
              <h3 className="mb-4 font-semibold text-slate-800 pb-4 border-b border-slate-100">Resumen de compra</h3>
              
              <div className="flex gap-4 pb-4 border-b border-slate-100">
                <div className="h-16 w-16 shrink-0 rounded border border-slate-200 overflow-hidden">
                  <img src={itemImage} alt="" className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-800 line-clamp-2">{itemTitle}</div>
                  <div className="mt-1 font-semibold text-slate-900">${itemPrice.toLocaleString("es-AR")}</div>
                </div>
              </div>

              <div className="space-y-3 py-4 border-b border-slate-100 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Producto</span>
                  <span>${itemPrice.toLocaleString("es-AR")}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Envío</span>
                  <span className="font-semibold text-green-600">Gratis</span>
                </div>
              </div>

              <div className="flex justify-between py-4 text-lg font-semibold text-slate-900">
                <span>Pagás</span>
                <span>${itemPrice.toLocaleString("es-AR")}</span>
              </div>
              
              <div className="mt-4 flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded">
                <ShieldCheck size={16} className="shrink-0 text-slate-400" />
                <span><strong className="font-semibold text-slate-600">Compra Protegida</strong>, recibí el producto que esperabas o te devolvemos tu dinero.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#ebebeb] p-20 text-center font-bold">Cargando...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}