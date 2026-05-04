
import { products } from "@/lib/data";
import { ShieldCheck, Star, Truck, MessageCircle, ChevronRight, Zap, Package, RotateCcw, ThumbsUp, Heart, Share2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductViewTracker from "@/components/products/ProductViewTracker";
import DeliveryEstimator from "@/components/checkout/DeliveryEstimator";
import ProductCard from "@/components/products/ProductCard";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find(p => p.id === id);
  if (!product) notFound();

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
    <div className="bg-white min-h-screen pb-24 md:bg-slate-50 md:pb-20">
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
            <div className="rounded-3xl bg-white border border-slate-100 shadow-sm overflow-hidden">
              <div className="relative">
                <img
                  src={product.pictures[0].url}
                  alt={product.title}
                  className="w-full aspect-[4/3] object-cover"
                />
                {product.tags.includes("featured") && (
                  <div className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow">
                    <Zap size={10} fill="currentColor" /> DESTACADO
                  </div>
                )}
                <button className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur shadow text-slate-500 hover:text-red-500 transition-colors">
                  <Heart size={16} />
                </button>
              </div>
              {/* Thumbnail strip */}
              <div className="flex gap-2 p-4 overflow-x-auto">
                {[product.pictures[0].url, product.pictures[0].url].map((url, i) => (
                  <div key={i} className="h-16 w-16 shrink-0 rounded-xl overflow-hidden border-2 border-blue-500 cursor-pointer">
                    <img src={url} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: Title + price (shown on mobile, hidden on desktop) */}
            <div className="lg:hidden rounded-3xl bg-white border border-slate-100 p-6 shadow-sm">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">{product.category_id}</div>
              <h1 className="text-2xl font-bold text-slate-900 mb-3">{product.title}</h1>
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400" fill={i < 5 ? "currentColor" : "none"} />
                ))}
                <span className="text-sm text-slate-500 font-semibold">4.8 (124 opiniones)</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900">${product.price.toLocaleString("es-AR")}</span>
                {product.original_price && (
                  <span className="text-slate-400 line-through">${product.original_price.toLocaleString("es-AR")}</span>
                )}
                {discount && (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-sm font-bold text-green-700">{discount}% OFF</span>
                )}
              </div>
            </div>

            {/* Specs / Attributes */}
            <div className="rounded-3xl bg-white border border-slate-100 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Características principales</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Condición", value: product.condition === "new" ? "Nuevo" : "Usado" },
                  { name: "Envío", value: product.shipping.free_shipping ? "Gratis" : "A cargo del comprador" },
                  { name: "Logística", value: product.shipping.logistic_type === "fulfillment" ? "Full (rápido)" : "Envío acordado" },
                  { name: "Vendedor", value: product.seller.nickname },
                  ...product.attributes,
                ].map((attr, i) => (
                  <div key={i} className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
                    <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">{attr.name}</div>
                    <div className="text-sm font-semibold text-slate-800">{"value_name" in attr ? attr.value_name : (attr as {name:string;value:string}).value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="rounded-3xl bg-white border border-slate-100 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Descripción</h2>
              <p className="text-slate-600 leading-relaxed">
                {product.title} es un producto de alta calidad disponible en MDP Market. Verificado por nuestro equipo de control de calidad y con Compra Protegida incluida. El vendedor <strong>{product.seller.nickname}</strong> tiene calificación 4.9/5 con más de 100 ventas en la plataforma.
              </p>
              <div className="mt-4 flex gap-3">
                {product.shipping.free_shipping && (
                  <div className="flex items-center gap-1.5 rounded-full bg-green-50 border border-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
                    <Truck size={12} /> Envío gratis
                  </div>
                )}
                <div className="flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1.5 text-xs font-bold text-blue-700">
                  <ShieldCheck size={12} /> Compra Protegida
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                  <RotateCcw size={12} /> Devolución gratis
                </div>
              </div>
            </div>

            {/* Q&A */}
            <div className="rounded-3xl bg-white border border-slate-100 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Preguntas y respuestas</h2>
              <div className="space-y-4 mb-6">
                {fakeQA.map((qa, i) => (
                  <div key={i} className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <MessageCircle size={14} className="text-blue-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-slate-800">{qa.q}</span>
                    </div>
                    <div className="ml-5 text-sm text-slate-600">{qa.a}</div>
                  </div>
                ))}
              </div>
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 py-4 text-sm font-semibold text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-colors">
                <Plus size={16} /> Hacer una pregunta
              </button>
            </div>

            {/* Reviews */}
            <div className="rounded-3xl bg-white border border-slate-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">Opiniones del producto</h2>
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-extrabold text-slate-900">4.8</div>
                  <div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-amber-400" fill={i < 5 ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <div className="text-xs text-slate-500">124 opiniones</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {fakeReviews.map((review, i) => (
                  <div key={i} className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                          {review.user.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-slate-800">{review.user}</span>
                      </div>
                      <span className="text-xs text-slate-400">{review.date}</span>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={12} className="text-amber-400" fill={j < review.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600">{review.comment}</p>
                    <button className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors">
                      <ThumbsUp size={12} /> Útil ({review.helpful})
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Related products */}
            {relatedProducts.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4">Productos relacionados</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Sticky purchase box ── */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              {/* Price & Buy box — hidden on mobile, shown on desktop */}
              <div className="hidden lg:block rounded-3xl bg-white border border-slate-100 p-6 shadow-xl">
                <div className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">{product.category_id}</div>
                {product.condition === "new" && (
                  <span className="mb-2 inline-block rounded-full bg-blue-600 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase">Nuevo</span>
                )}
                <h1 className="text-xl font-bold text-slate-900 mb-3 leading-snug">{product.title}</h1>

                <div className="flex items-center gap-1.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="text-amber-400" fill={i < 5 ? "currentColor" : "none"} />
                  ))}
                  <span className="text-xs text-slate-500 font-semibold">4.8 · 124 opiniones</span>
                </div>

                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl font-extrabold text-slate-900">${product.price.toLocaleString("es-AR")}</span>
                  {product.original_price && (
                    <span className="text-slate-400 line-through text-sm">${product.original_price.toLocaleString("es-AR")}</span>
                  )}
                </div>
                {discount && (
                  <div className="mb-4 text-sm font-bold text-green-600">{discount}% de descuento</div>
                )}

                {/* Delivery */}
                <div className="mb-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-start gap-2">
                    <Truck size={16} className="text-blue-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <DeliveryEstimator />
                      <div className="mt-1 text-xs text-slate-500">Envío local · Mar del Plata</div>
                      <div className="mt-0.5 text-xs font-bold text-green-600">{product.shipping.free_shipping ? "Gratis" : "A calcular"}</div>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-600">Cantidad:</span>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5">
                    <button className="text-slate-500 hover:text-slate-900"><Minus size={14} /></button>
                    <span className="w-6 text-center text-sm font-bold">1</span>
                    <button className="text-slate-500 hover:text-slate-900"><Plus size={14} /></button>
                  </div>
                  <span className="text-xs text-slate-400">({product.available_quantity} disponibles)</span>
                </div>

                <div className="space-y-3">
                  <Link
                    href={`/checkout?id=${product.id}`}
                    className="flex w-full items-center justify-center rounded-2xl bg-blue-600 py-3.5 text-base font-bold text-white transition-all hover:bg-blue-700 shadow-lg shadow-blue-200"
                  >
                    Comprar
                  </Link>
                  <button className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-blue-600 py-3.5 text-base font-bold text-blue-600 transition-all hover:bg-blue-50">
                    <Package size={16} /> Agregar al carrito
                  </button>
                  <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50">
                    <MessageCircle size={15} /> Consultar al vendedor
                  </button>
                </div>

                {/* Trust badges */}
                <div className="mt-4 space-y-2.5 rounded-2xl bg-blue-50 border border-blue-100 p-4">
                  <div className="flex items-start gap-2">
                    <ShieldCheck size={15} className="text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-blue-900">Compra Protegida</div>
                      <p className="text-[11px] text-blue-700 mt-0.5">Tu dinero en custodia hasta que confirmes la entrega.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <RotateCcw size={15} className="text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-blue-900">Devolución gratis</div>
                      <p className="text-[11px] text-blue-700 mt-0.5">Hasta 7 días desde la entrega, sin costo.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seller Card */}
              <div className="rounded-3xl bg-white border border-slate-100 p-6 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Vendedor</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-lg">
                    {product.seller.nickname.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-sm">{product.seller.nickname}</span>
                      <ShieldCheck size={14} className="text-blue-500" />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-green-600">MDP Verificado</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                  {[
                    { label: "Ventas", value: "+100" },
                    { label: "Calificación", value: "4.9" },
                    { label: "Respuesta", value: "< 1h" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="font-black text-slate-900 text-base">{stat.value}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <Link href={`/productos?q=${product.seller.nickname}`} className="mt-4 flex w-full items-center justify-center rounded-2xl border border-slate-200 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  Ver todos sus productos
                </Link>
              </div>

              {/* Share */}
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors bg-white shadow-sm">
                <Share2 size={15} /> Compartir producto
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ── MOBILE STICKY BUY BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white px-4 py-3 shadow-2xl md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-xs text-slate-500 leading-none">{product.category_id}</div>
            <div className="text-lg font-extrabold text-slate-900">${product.price.toLocaleString("es-AR")}</div>
          </div>
          <Link
            href={`/checkout?id=${product.id}`}
            className="flex-1 flex items-center justify-center rounded-2xl bg-blue-600 py-3 text-base font-bold text-white shadow-lg shadow-blue-200"
          >
            Comprar
          </Link>
        </div>
      </div>
    </div>
  );
}
