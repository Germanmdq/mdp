"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products, PRODUCT_CATEGORIES } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";
import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react";

function ProductosPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get("categoria") || "");
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("q") || "");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(searchParams.get("destacados") === "true");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("categoria");
    const q = searchParams.get("q");
    const dest = searchParams.get("destacados");
    if (cat) setCategoryFilter(cat);
    if (q) setSearchQuery(q);
    if (dest === "true") setFeaturedOnly(true);
  }, [searchParams]);

  const handleCategoryChange = (cat: string) => {
    const next = cat === categoryFilter ? "" : cat;
    setCategoryFilter(next);
    router.push(next ? `/productos?categoria=${encodeURIComponent(next)}` : "/productos");
  };

  const clearAll = () => {
    setCategoryFilter("");
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
    setFeaturedOnly(false);
    router.push("/productos");
  };

  const filteredProducts = products
    .filter((p) => {
      if (categoryFilter && p.category_id !== categoryFilter) return false;
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.category_id.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.seller.nickname.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (featuredOnly && !p.tags.includes("featured")) return false;
      if (minPrice && p.price < parseInt(minPrice)) return false;
      if (maxPrice && p.price > parseInt(maxPrice)) return false;
      return true;
    })
    .sort((a, b) => {
      const aFeat = a.tags.includes("featured") ? 1 : 0;
      const bFeat = b.tags.includes("featured") ? 1 : 0;
      return bFeat - aFeat;
    });

  const hasFilters = categoryFilter || searchQuery || minPrice || maxPrice || featuredOnly;

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Search within products */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Buscar</h3>
        <div className="flex overflow-hidden rounded-full border border-slate-200 bg-white">
          <input
            type="text"
            placeholder="Nombre, categoría..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent px-4 py-2 text-sm outline-none text-slate-800"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="pr-3 text-slate-400 hover:text-slate-600">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter — pill buttons */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Categorías</h3>
        <div className="flex flex-wrap gap-2">
          {PRODUCT_CATEGORIES.map((cat, i) => (
            <button
              key={i}
              onClick={() => handleCategoryChange(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                categoryFilter === cat
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Precio</h3>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Mínimo"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="w-full rounded-full border border-slate-200 px-3 py-2 text-sm bg-white outline-none focus:border-blue-400"
          />
          <input
            type="number"
            placeholder="Máximo"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="w-full rounded-full border border-slate-200 px-3 py-2 text-sm bg-white outline-none focus:border-blue-400"
          />
        </div>
      </div>

      {/* Featured toggle */}
      <button
        onClick={() => setFeaturedOnly(!featuredOnly)}
        className={`w-full rounded-full py-2 text-sm font-semibold transition-colors ${
          featuredOnly ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
      >
        ⚡ Solo destacados
      </button>

      {hasFilters && (
        <button onClick={clearAll} className="w-full rounded-full border border-red-200 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors">
          Limpiar filtros
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-[#ebebeb] min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b py-6 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                {searchQuery ? `Resultados para "${searchQuery}"` : categoryFilter || "Todos los Productos"}
              </h1>
              <p className="text-sm text-slate-500 mt-1">{filteredProducts.length} productos encontrados</p>
            </div>
            {hasFilters && (
              <button onClick={clearAll} className="hidden md:flex items-center gap-1 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors">
                <X size={14} /> Limpiar
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
        {/* Mobile filter button */}
        <div className="mb-4 flex items-center justify-between md:hidden">
          <span className="text-sm text-slate-600"><strong>{filteredProducts.length}</strong> productos</span>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
          >
            <SlidersHorizontal size={14} /> Filtros {hasFilters && <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">!</span>}
          </button>
        </div>

        {/* Mobile filter panel */}
        {showMobileFilters && (
          <div className="mb-6 rounded-3xl bg-white p-5 shadow-sm md:hidden">
            <FilterPanel />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar — Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32 rounded-3xl bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold text-slate-800 mb-4">Filtros</h2>
              <FilterPanel />
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="mb-4 hidden md:flex items-center justify-end gap-3">
              <span className="text-sm text-slate-500">Ordenar por:</span>
              <button className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Más recientes <ChevronDown size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center bg-white rounded-3xl shadow-sm mt-4">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-800">No encontramos productos</h3>
                <p className="text-slate-500 mt-1 mb-6">Probá con otras palabras o quitá los filtros.</p>
                <button onClick={clearAll} className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-colors">
                  Ver todos los productos
                </button>
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