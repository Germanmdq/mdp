"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { X, SlidersHorizontal, Percent, Zap } from "lucide-react";

interface FilterPanelProps {
  categories: any[];
}

export default function FilterPanel({ categories }: FilterPanelProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentCategory = searchParams.get("categoria") || "";
  const currentQ = searchParams.get("q") || "";
  const currentFeatured = searchParams.get("destacados") === "true";

  const updateFilters = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`/productos?${params.toString()}`);
  };

  const clearAll = () => router.push("/productos");

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">Categorías</h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilters({ categoria: cat.name === currentCategory ? null : cat.name })}
              className={`flex items-center justify-between px-3 py-2 text-sm rounded-sm transition-all ${
                currentCategory === cat.name
                  ? "bg-blue-50 text-blue-600 font-bold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{cat.name}</span>
              {currentCategory === cat.name && <X size={14} />}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Toggle */}
      <div>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">Condición Especial</h3>
        <button
          onClick={() => updateFilters({ destacados: currentFeatured ? null : "true" })}
          className={`flex w-full items-center gap-2 px-3 py-3 rounded-sm border transition-all text-sm font-semibold ${
            currentFeatured 
              ? "bg-amber-50 border-amber-200 text-amber-700 shadow-sm" 
              : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
          }`}
        >
          <Zap size={16} className={currentFeatured ? "fill-amber-500" : ""} />
          Solo destacados
        </button>
      </div>

      {/* Price Range (UI Only for now) */}
      <div>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">Precio</h3>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Mínimo" className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-sm outline-none focus:border-blue-500" />
          <span className="text-slate-300">—</span>
          <input type="number" placeholder="Máximo" className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-sm outline-none focus:border-blue-500" />
        </div>
      </div>

      {/* Clear Button */}
      {(currentCategory || currentQ || currentFeatured) && (
        <button onClick={clearAll} className="w-full py-3 text-xs font-bold text-red-500 hover:bg-red-50 rounded-sm border border-transparent transition-all">
          Limpiar todos los filtros
        </button>
      )}
    </div>
  );
}
