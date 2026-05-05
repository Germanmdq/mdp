"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Truck, RotateCcw, Plus, Minus } from "lucide-react";

interface ProductActionsProps {
  product: any;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  const triggerConsult = () => {
    const event = new CustomEvent('mdp-ai-guide', { 
      detail: { 
        message: `Hola, me interesa el producto "${product.title}". ¿Me podrías dar más detalles o ayudarme con la compra?` 
      } 
    });
    window.dispatchEvent(event);
  };

  const price = product.price;
  const originalPrice = product.originalPrice;
  const discount = originalPrice
    ? Math.round((1 - price / originalPrice) * 100)
    : null;

  return (
    <div className="rounded-sm bg-white border border-slate-100 p-6 shadow-sm">
      {product.condition === "new" && (
        <span className="mb-2 inline-block text-[12px] font-bold text-slate-400 uppercase">Nuevo | +100 vendidos</span>
      )}
      <h1 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">{product.title}</h1>

      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-3xl font-normal text-slate-900">${price.toLocaleString("es-AR")}</span>
        {discount && discount > 0 && (
          <span className="text-sm font-bold text-green-600">{discount}% OFF</span>
        )}
      </div>

      {/* Shipping & Returns */}
      <div className="space-y-6 mb-8">
         <div className="flex gap-3">
            <Truck size={20} className="text-green-600 shrink-0" />
            <div>
               <div className="text-sm font-bold text-green-600">Envío gratis a todo el país</div>
               <div className="text-xs text-slate-500">Conocé los tiempos y las formas de envío.</div>
               <button className="text-xs font-bold text-blue-500 hover:underline mt-1">Calcular cuándo llega</button>
            </div>
         </div>
         <div className="flex gap-3">
            <RotateCcw size={20} className="text-green-600 shrink-0" />
            <div>
               <div className="text-sm font-bold text-green-600">Devolución gratis</div>
               <div className="text-xs text-slate-500">Tenés 30 días desde que lo recibís.</div>
               <button className="text-xs font-bold text-blue-500 hover:underline mt-1">Conocer más</button>
            </div>
         </div>
      </div>

      {/* Quantity Selector */}
      <div className="mb-8">
         <div className="flex items-center gap-4 p-3 border rounded-sm">
            <span className="text-sm font-bold text-slate-800">Cantidad: {quantity}</span>
            <div className="flex gap-4 ml-auto">
              <button onClick={() => setQuantity(q => Math.max(1, q-1))}><Minus size={18} className="text-blue-500" /></button>
              <button onClick={() => setQuantity(q => q+1)}><Plus size={18} className="text-blue-500" /></button>
            </div>
         </div>
         <span className="text-xs text-slate-400 mt-2 block">({product.stock} disponibles)</span>
      </div>

      <div className="space-y-3">
        <Link
          href={`/checkout?id=${product.id}&q=${quantity}`}
          className="flex w-full items-center justify-center rounded-sm bg-blue-600 py-4 text-base font-bold text-white transition-all hover:bg-blue-700"
        >
          Comprar ahora
        </Link>
        <button className="flex w-full items-center justify-center gap-2 rounded-sm bg-blue-50 py-4 text-base font-bold text-blue-600 transition-all hover:bg-blue-100">
          Agregar al carrito
        </button>
        <button 
          onClick={triggerConsult}
          className="flex w-full items-center justify-center gap-2 rounded-sm border border-transparent py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-all"
        >
          Consultar al vendedor
        </button>
      </div>
    </div>
  );
}
