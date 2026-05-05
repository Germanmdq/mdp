import { prisma } from "@/lib/prisma";
import { ShieldCheck, Star, ChevronRight, Zap, Heart, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductViewTracker from "@/components/products/ProductViewTracker";
import ProductCard from "@/components/products/ProductCard";
import ProductActions from "@/components/products/ProductActions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { seller: true, category: true }
  });

  if (!product) notFound();

  // Related products
  const relatedProducts = await prisma.product.findMany({
    where: { categoryId: product.categoryId, NOT: { id: product.id } },
    take: 5,
    include: { seller: true }
  });

  const productImages = JSON.parse(product.images);
  const productAttributes = JSON.parse(product.attributes);
  const productTags = JSON.parse(product.tags);

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
          <Link href={`/productos?categoria=${encodeURIComponent(product.category.name)}`} className="hover:text-blue-600">{product.category.name}</Link>
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
                  src={productImages[0]}
                  alt={product.title}
                  className="max-h-[500px] w-auto object-contain"
                />
                {productTags.includes("featured") && (
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
                {productImages.map((pic: string, i: number) => (
                  <div key={i} className={`h-16 w-16 shrink-0 rounded-sm overflow-hidden border-2 cursor-pointer transition-all ${i === 0 ? 'border-blue-600' : 'border-slate-100 hover:border-slate-300'}`}>
                    <img src={pic} alt="" className="h-full w-full object-contain" />
                  </div>
                ))}
              </div>
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
                <div className="flex py-4">
                  <div className="w-1/3 text-sm font-bold text-slate-800 uppercase tracking-wider">Condición</div>
                  <div className="flex-1 text-sm text-slate-600">{product.condition === "new" ? "Nuevo" : "Usado"}</div>
                </div>
                {productAttributes.map((attr: any, i: number) => (
                  <div key={i} className="flex py-4">
                    <div className="w-1/3 text-sm font-bold text-slate-800 uppercase tracking-wider">{attr.name}</div>
                    <div className="flex-1 text-sm text-slate-600">{attr.value_name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Q&A */}
            <div className="rounded-sm bg-white border border-slate-100 p-8 shadow-sm">
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
              <ProductActions product={product} />

              {/* Seller Info */}
              <div className="rounded-sm bg-white border border-slate-100 p-6 shadow-sm">
                 <h3 className="text-lg font-bold text-slate-800 mb-4">Información sobre el vendedor</h3>
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-slate-100 rounded-sm flex items-center justify-center font-bold text-slate-600">
                       {product.seller.nickname?.charAt(0)}
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
                 <button className="mt-6 w-full text-center text-sm font-bold text-blue-600 hover:underline">Ver más datos de este vendedor</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Footer */}
      <div className="container mx-auto px-4 max-w-7xl mt-12 pb-20">
         <h2 className="text-xl font-normal text-slate-800 mb-6">Quienes vieron este producto también compraron</h2>
         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
         </div>
      </div>
    </div>
  );
}
