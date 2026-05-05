"use client";

import { products } from "@/lib/data";
import { ShieldCheck, Star, Truck, MessageCircle, ChevronRight, Zap, Package, RotateCcw, ThumbsUp, Heart, Share2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import ProductViewTracker from "@/components/products/ProductViewTracker";
import DeliveryEstimator from "@/components/checkout/DeliveryEstimator";
import ProductCard from "@/components/products/ProductCard";
import { useState, useRef } from "react";

export default function ProductDetailPage() {
  const { id } = useParams() as { id: string };
  const product = products.find(p => p.id === id);
  if (!product) notFound();

  const [quantity, setQuantity] = useState(1);
  const qaRef = useRef<HTMLDivElement>(null);

  const scrollToQA = () => {
    qaRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const triggerConsult = () => {
    const event = new CustomEvent('mdp-ai-guide', { 
      detail: { 
        message: `Hola, me interesa el producto "${product.title}". ¿Me podrías dar más detalles o ayudarme con la compra?` 
      } 
    });
    window.dispatchEvent(event);
  };

  const relatedProducts = products
    .filter(p => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  const fakeReviews = [
    { user: "Carlos M.", rating: 5, date: "10 de abril", comment: "Excelente producto, llegó rápido y en perfectas condiciones. Tal cual la descripción.", helpful: 12 },
    { user: "María L.", rating: 4, date: "2 de abril", comment: "Muy buena relación calidad/precio. El envío fue puntual.", helpful: 8 },
    { user: "Juan P.", rating: 5, date: "25 de marzo", comment: "Compré varias veces en esta tienda y siempre conforme. Recomendable.", helpful: 5 },
  ];

  const fakeQA = [
    { q: "¿Tiene garantía?", a: "Sí, 12 meses de garantía por defecto de fabricación." },
    { q: "¿Hacen envíos a toda Mar del Plata?", a: "Sí, cubrimos todo el partido de General Pueyrredón." },
  ];

  return (
    <div className="bg-[#ebebeb] min-h-screen pb-24 md:pb-20">
      <ProductViewTracker productId={product.id} />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center space-x-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-blue-600">Inicio</Link>
          <ChevronRight size={12} />
          <Link href="/productos" className="hover:text-blue-600">Productos</Link>
          <ChevronRight size={12} />
          <Link href={`/productos?categoria=${encodeURIComponent(product.category_id)}`} className="hover:text-blue-600">{product.category_id}</Link>
          <ChevronRight size={12} />
          <span className="text-slate-800 truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* ── LEFT: Gallery + Below-fold sections ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Gallery */}
            <div className="rounded-sm bg-white border border-transparent shadow-sm overflow-hidden p-8">
              <div className="relative flex justify-center">
                <img
                  src={product.pictures[0].url}
                  alt={product.title}
                  className="max-h-[500px] w-auto object-contain"
                />
                {product.tags.includes("featured") && (
                  <div className="absolute top-0 left-0 flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow">
                    <Zap size={10} fill="currentColor" /> DESTACADO
                  </div>
                )}
                <button className="absolute top-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-100 shadow-sm text-slate-400 hover:text-red-500 transition-all hover:scale-110">
                  <Heart size={20} />
                </button>
              </div>
              {/* Thumbnail strip */}
              <div className="flex gap-3 mt-8">
                {product.pictures.map((pic, i) => (
                  <div key={i} className={`h-16 w-16 shrink-0 rounded-sm overflow-hidden border-2 cursor-pointer transition-all ${i === 0 ? 'border-blue-600' : 'border-slate-100 hover:border-slate-300'}`}>
                    <img src={pic.url} alt="" className="h-full w-full object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Title */}
            <div className="lg:hidden rounded-sm bg-white border border-slate-100 p-6 shadow-sm">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category_id}</span>
               <h1 className="text-xl font-bold text-slate-900 mt-1">{product.title}</h1>
               <div className="flex items-center gap-1 mt-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-amber-400" fill={i < 5 ? "currentColor" : "none"} />
                  ))}
                  <span className="text-xs text-slate-500">(124 opiniones)</span>
               </div>
               <div className="text-3xl font-bold text-slate-900">${product.price.toLocaleString("es-AR")}</div>
            </div>

            {/* Description */}
            <div className="rounded-sm bg-white border border-slate-100 p-8 shadow-sm">
              <h2 className="text-xl font-normal text-slate-800 mb-6 border-b pb-4">Descripción</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-base">
                {product.description}
              </p>
            </div>

            {/* Specs / Attributes */}
            <div className="rounded-sm bg-white border border-slate-100 p-8 shadow-sm">
              <h2 className="text-xl font-normal text-slate-800 mb-6">Características principales</h2>
              <div className="grid grid-cols-1 divide-y divide-slate-100">
                {[
                  { name: "Condición", value: product.condition === "new" ? "Nuevo" : "Usado" },
                  { name: "Marca", value: product.attributes.find(a => a.name === "Marca")?.value_name || "N/A" },
                  { name: "Modelo", value: product.attributes.find(a => a.name === "Modelo")?.value_name || "N/A" },
                ].map((attr, i) => (
                  <div key={i} className="flex py-4">
                    <div className="w-1/3 text-sm font-bold text-slate-800 uppercase tracking-wider">{attr.name}</div>
                    <div className="flex-1 text-sm text-slate-600">{attr.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Q&A */}
            <div ref={qaRef} className="rounded-sm bg-white border border-slate-100 p-8 shadow-sm">
              <h2 className="text-xl font-normal text-slate-800 mb-6">Preguntas y respuestas</h2>
              <div className="space-y-6 mb-10">
                <h3 className="text-base font-bold text-slate-800">Últimas realizadas</h3>
                {fakeQA.map((qa, i) => (
                  <div key={i} className="space-y-2">
                    <div className="text-sm font-medium text-slate-800">{qa.q}</div>
                    <div className="flex gap-2">
                       <div className="w-1 h-full bg-slate-200"></div>
                       <div className="text-sm text-slate-500 italic">{qa.a}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <input type="text" placeholder="Escribí tu pregunta..." className="flex-1 rounded-sm border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500" />
                <button className="rounded-sm bg-blue-600 px-8 py-3 text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/10">Preguntar</button>
              </div>
            </div>

            {/* Reviews */}
            <div className="rounded-sm bg-white border border-slate-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-normal text-slate-800">Opiniones del producto</h2>
                <div className="flex items-center gap-3">
                  <div className="text-4xl font-bold text-slate-900">4.8</div>
                  <div className="flex flex-col">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="text-amber-400" fill={i < 5 ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">124 calificaciones</span>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                {fakeReviews.map((review, i) => (
                  <div key={i} className="border-b border-slate-50 pb-6 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                       <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} size={12} className="text-amber-400" fill={j < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <span className="text-xs text-slate-400">· {review.date}</span>
                    </div>
                    <p className="text-sm text-slate-700 font-medium mb-2">{review.comment}</p>
                    <div className="flex items-center gap-4">
                       <span className="text-xs text-slate-400 italic">Por {review.user}</span>
                       <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-600"><ThumbsUp size={12} /> Es útil</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Sticky purchase box ── */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-sm bg-white border border-slate-100 p-6 shadow-sm">
                {product.condition === "new" && (
                  <span className="mb-2 inline-block text-[12px] font-bold text-slate-400 uppercase">Nuevo | +100 vendidos</span>
                )}
                <h1 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">{product.title}</h1>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-normal text-slate-900">${product.price.toLocaleString("es-AR")}</span>
                  {discount && (
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
                   <span className="text-xs text-slate-400 mt-2 block">({product.available_quantity} disponibles)</span>
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

                {/* Trust Section */}
                <div className="mt-8 space-y-4 pt-8 border-t border-slate-100">
                   <div className="flex gap-3">
                      <ShieldCheck size={18} className="text-slate-400" />
                      <div className="text-xs text-slate-500"><span className="text-blue-600 font-bold">Compra Protegida</span>, recibí el producto que esperabas o te devolvemos tu dinero.</div>
                   </div>
                   <div className="flex gap-3">
                      <Zap size={18} className="text-slate-400" />
                      <div className="text-xs text-slate-500"><span className="text-blue-600 font-bold">MDP Puntos</span>. Sumás 1500 puntos.</div>
                   </div>
                </div>
              </div>

              {/* Seller Info */}
              <div className="rounded-sm bg-white border border-slate-100 p-6 shadow-sm">
                 <h3 className="text-lg font-bold text-slate-800 mb-4">Información sobre el vendedor</h3>
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-slate-100 rounded-sm flex items-center justify-center font-bold text-slate-600">
                       {product.seller.nickname.charAt(0)}
                    </div>
                    <div>
                       <div className="font-bold text-slate-900">{product.seller.nickname}</div>
                       <div className="text-xs text-green-600 font-bold uppercase tracking-wider">MercadoLíder Platinum</div>
                    </div>
                 </div>
                 <div className="grid grid-cols-3 gap-2 text-center border-t pt-4">
                    <div>
                       <div className="text-xl font-bold text-slate-900">+100</div>
                       <div className="text-[10px] text-slate-400 uppercase font-bold">Ventas</div>
                    </div>
                    <div>
                       <div className="text-xl font-bold text-slate-900">4.9</div>
                       <div className="text-[10px] text-slate-400 uppercase font-bold">Calificación</div>
                    </div>
                    <div>
                       <div className="text-xl font-bold text-slate-900">1h</div>
                       <div className="text-[10px] text-slate-400 uppercase font-bold">Respuesta</div>
                    </div>
                 </div>
                 <button onClick={scrollToQA} className="mt-6 w-full text-center text-sm font-bold text-blue-600 hover:underline">Ver más datos de este vendedor</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Footer */}
      <div className="container mx-auto px-4 max-w-7xl mt-12 pb-20">
         <h2 className="text-xl font-normal text-slate-800 mb-6">Quienes vieron este producto también compraron</h2>
         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {products.slice(0, 5).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
         </div>
      </div>

      {/* MOBILE STICKY BUY BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white px-4 py-3 shadow-2xl md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-lg font-bold text-slate-900">${product.price.toLocaleString("es-AR")}</div>
            <div className="text-[10px] text-green-600 font-bold uppercase">Envío gratis</div>
          </div>
          <Link
            href={`/checkout?id=${product.id}&q=${quantity}`}
            className="flex-[2] flex items-center justify-center rounded-sm bg-blue-600 py-3 text-base font-bold text-white shadow-lg"
          >
            Comprar ahora
          </Link>
        </div>
      </div>
    </div>
  );
}
