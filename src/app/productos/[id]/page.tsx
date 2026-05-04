
import { products, ZONES } from "@/lib/data";
import { ShieldCheck, MapPin, Star, Truck, RefreshCw, MessageCircle, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find(p => p.id === id);
  
  if (!product) notFound();

  const relatedProducts = products
    .filter(p => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center space-x-2 text-xs font-medium text-slate-500 uppercase tracking-widest">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight size={14} />
          <Link href="/productos" className="hover:text-blue-600">Productos</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900">{product.category_id}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-sm">
              <img src={product.pictures[0].url} alt={product.title} className="w-full aspect-[4/3] object-cover" />
            </div>
            
            {/* Description */}
            <div className="mt-8 rounded-3xl bg-white border border-slate-100 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Descripción</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {product.attributes.map(a => a.name + ": " + a.value_name).join(", ")}
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Estado</div>
                  <div className="font-bold text-slate-900">{product.condition}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Ubicación</div>
                  <div className="font-bold text-slate-900">{(product.shipping.logistic_type === "fulfillment" ? "Llega mañana" : "Envío normal")}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              {/* Main Card */}
              <div className="rounded-3xl bg-white border border-slate-100 p-8 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{product.category_id}</span>
                  {product.tags.includes("featured") && (
                    <div className="flex items-center space-x-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                      <Zap size={10} fill="currentColor" />
                      <span>Destacado</span>
                    </div>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.title}</h1>
                
                <div className="mb-6 flex items-baseline space-x-3">
                  <span className="text-4xl font-extrabold text-slate-900">${product.price.toLocaleString("es-AR")}</span>
                  {product.original_price && (
                    <span className="text-lg text-slate-400 line-through">${product.original_price.toLocaleString("es-AR")}</span>
                  )}
                </div>

                <div className="space-y-4 border-t pt-6">
                  <Link href={`/checkout?id=${product.id}`} className="flex w-full items-center justify-center rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white transition-all hover:bg-blue-700 shadow-lg shadow-blue-200">
                    Comprar con Pago Entregado
                  </Link>
                  <button className="flex w-full items-center justify-center rounded-2xl border border-slate-200 py-4 text-lg font-bold text-slate-700 transition-all hover:bg-slate-50">
                    <MessageCircle className="mr-2" size={20} />
                    Consultar al vendedor
                  </button>
                </div>

                <div className="mt-8 space-y-4 rounded-2xl bg-blue-50 p-6 border border-blue-100">
                  <div className="flex items-start space-x-3">
                    <ShieldCheck className="text-blue-600 shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-sm font-bold text-blue-900 uppercase tracking-wide">Compra Protegida</div>
                      <p className="text-xs text-blue-700 mt-1">Recibí el producto que esperabas o te devolvemos tu dinero.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Truck className="text-blue-600 shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-sm font-bold text-blue-900 uppercase tracking-wide">Envío Local MDP</div>
                      <p className="text-xs text-blue-700 mt-1">Entrega validada en mano o punto de retiro.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seller Card */}
              <div className="rounded-3xl bg-white border border-slate-100 p-8 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6">Información del vendedor</h3>
                <div className="flex items-center space-x-4">
                  <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xl">
                    {product.seller.nickname.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900">{product.seller.nickname}</span>
                      {(product.seller.id > 0) && (
                        <ShieldCheck size={16} className="text-blue-500" />
                      )}
                    </div>
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < Math.floor(4.8) ? "currentColor" : "none"} />
                      ))}
                      <span className="ml-2 text-xs font-bold text-slate-500">{4.8.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between border-t pt-4">
                  <div className="text-center flex-1">
                    <div className="text-lg font-bold text-slate-900">+100</div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Ventas</div>
                  </div>
                  <div className="h-8 w-[1px] bg-slate-100"></div>
                  <div className="text-center flex-1">
                    <div className="text-lg font-bold text-green-500">4.9</div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">Reputación</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
