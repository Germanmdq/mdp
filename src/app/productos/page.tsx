"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products, PRODUCT_CATEGORIES, ZONES } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";
import { Search, Filter, SlidersHorizontal, ChevronDown } from "lucide-react";

function ProductosPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // States for filters
  const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get("categoria") || "");
  const [zoneFilter, setZoneFilter] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);

  // Sync category from URL if it changes
  useEffect(() => {
    const cat = searchParams.get("categoria");
    if (cat) {
      setCategoryFilter(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (cat: string) => {
    setCategoryFilter(cat === categoryFilter ? "" : cat);
    if (cat === categoryFilter) {
      router.push("/productos");
    } else {
      router.push(`/productos?categoria=${cat}`);
    }
  };

  const filteredProducts = products.filter((p) => {
    if (categoryFilter && p.category_id !== categoryFilter) return false;
    if (zoneFilter && (p.shipping.logistic_type === "fulfillment" ? "Full" : "Envío a acordar") !== zoneFilter) return false;
    if (featuredOnly && !p.tags.includes("featured")) return false;
    if (minPrice && p.price < parseInt(minPrice)) return false;
    if (maxPrice && p.price > parseInt(maxPrice)) return false;
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Marketplace de Productos</h1>
          <p className="text-slate-500">Encontrá lo que buscás en Mar del Plata con la seguridad de MDP Market.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4">Categorías</h3>
              <div className="space-y-2">
                {PRODUCT_CATEGORIES.map((cat, i) => (
                  <label key={i} className="flex items-center space-x-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                      checked={categoryFilter === cat}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4">Precio</h3>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2 text-sm" 
                />
                <input 
                  type="number" 
                  placeholder="Max" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2 text-sm" 
                />
              </div>
            </div>

            {/* Zone Filter */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4">Zona</h3>
              <select 
                value={zoneFilter}
                onChange={(e) => setZoneFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2 text-sm bg-white"
              >
                <option value="">Todas las zonas</option>
                {ZONES.map((zone, i) => (
                  <option key={i} value={zone}>{zone}</option>
                ))}
              </select>
            </div>
            
            {/* Featured Only */}
            <label className="flex items-center space-x-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={featuredOnly}
                onChange={(e) => setFeaturedOnly(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
              />
              <span className="text-sm font-semibold text-slate-700">Solo destacados</span>
            </label>
            
            {(categoryFilter || zoneFilter || minPrice || maxPrice || featuredOnly) && (
              <button 
                onClick={() => {
                  setCategoryFilter("");
                  setZoneFilter("");
                  setMinPrice("");
                  setMaxPrice("");
                  setFeaturedOnly(false);
                  router.push("/productos");
                }}
                className="w-full mt-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-slate-500">
                Mostrando <span className="font-bold text-slate-900">{filteredProducts.length}</span> productos
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-slate-500">Ordenar por:</span>
                  <button className="flex items-center font-bold text-slate-900">
                    Más recientes <ChevronDown size={16} className="ml-1" />
                  </button>
                </div>
                <button className="lg:hidden flex items-center space-x-2 rounded-lg border bg-white px-3 py-2 text-sm font-bold">
                  <SlidersHorizontal size={16} />
                  <span>Filtros</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No encontramos productos</h3>
                <p className="text-slate-500">Intentá ajustando los filtros de búsqueda.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}


export default function ProductosPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <ProductosPage />
    </Suspense>
  );
}