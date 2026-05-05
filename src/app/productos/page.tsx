import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/products/ProductCard";
import FilterPanel from "@/components/products/FilterPanel";
import { Search, ChevronDown } from "lucide-react";
import { Suspense } from "react";
import { ProductGridSkeleton } from "@/components/ui/ProductSkeleton";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductosPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q : "";
  const categoria = typeof params.categoria === 'string' ? params.categoria : "";
  const destacados = params.destacados === "true";

  // Build real DB query
  const where: any = {};
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { description: { contains: q } }
    ];
  }
  if (categoria) {
    where.category = { name: categoria };
  }
  if (destacados) {
    where.tags = { contains: "featured" };
  }

  const products = await prisma.product.findMany({
    where,
    include: { seller: true, category: true },
    orderBy: { createdAt: 'desc' }
  });

  const categories = await prisma.category.findMany();

  return (
    <div className="bg-[#ebebeb] min-h-screen pb-20">
      {/* Header Info */}
      <div className="bg-white border-b border-slate-100 py-6">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {q ? `Resultados para "${q}"` : categoria || "Todos los Productos"}
              </h1>
              <p className="text-sm text-slate-500 mt-1">{products.length} productos encontrados</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 rounded-sm bg-white p-6 shadow-sm border border-slate-100">
              <FilterPanel categories={categories} />
            </div>
          </aside>

          {/* Grid */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-end gap-3">
              <span className="text-sm text-slate-400">Ordenar por:</span>
              <button className="flex items-center gap-1 rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
                Más recientes <ChevronDown size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {products.length === 0 && (
              <div className="py-24 text-center bg-white rounded-sm shadow-sm border border-slate-100">
                <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                  <Search size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">No encontramos resultados</h3>
                <p className="text-slate-500 mt-2">Probá quitando los filtros o buscando algo menos específico.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}