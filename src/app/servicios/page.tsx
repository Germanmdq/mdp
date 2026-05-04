"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { services, SERVICE_CATEGORIES, ZONES } from "@/lib/data";
import ServiceCard from "@/components/services/ServiceCard";
import { Search, Filter, ShieldCheck, Star } from "lucide-react";

function ServiciosPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // States for filters
  const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get("categoria") || "");
  const [zoneFilter, setZoneFilter] = useState<string>("");
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);

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
      router.push("/servicios");
    } else {
      router.push(`/servicios?categoria=${cat}`);
    }
  };

  const filteredServices = services.filter((s) => {
    if (categoryFilter && s.category !== categoryFilter) return false;
    if (zoneFilter && !s.zone.includes(zoneFilter as any)) return false;
    if (featuredOnly && !s.featured) return false;
    if (verifiedOnly && !s.verified) return false;
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Profesionales y Servicios</h1>
          <p className="text-slate-500">Contratá oficios verificados con garantía de satisfacción en tu zona.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4">Especialidad</h3>
              <div className="space-y-2">
                {SERVICE_CATEGORIES.map((cat, i) => (
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

            {/* Zone Filter */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4">Zona de Atención</h3>
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
            
            {/* Quality Filters */}
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={featuredOnly}
                  onChange={(e) => setFeaturedOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                />
                <span className="text-sm font-semibold text-slate-700">Mejor calificados</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500" 
                />
                <div className="flex items-center text-sm font-semibold text-slate-700">
                  <span>Solo verificados</span>
                  <ShieldCheck size={14} className="ml-1 text-green-500" />
                </div>
              </label>
            </div>

            {(categoryFilter || zoneFilter || featuredOnly || verifiedOnly) && (
              <button 
                onClick={() => {
                  setCategoryFilter("");
                  setZoneFilter("");
                  setFeaturedOnly(false);
                  setVerifiedOnly(false);
                  router.push("/servicios");
                }}
                className="w-full mt-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </aside>

          {/* Service Grid */}
          <main className="flex-1">
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-slate-500">
                Mostrando <span className="font-bold text-slate-900">{filteredServices.length}</span> profesionales
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
            
            {filteredServices.length === 0 && (
              <div className="py-20 text-center bg-white rounded-3xl border border-slate-100">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No encontramos profesionales</h3>
                <p className="text-slate-500">Probá buscando en otras zonas o eliminando filtros.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}


export default function ServiciosPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <ServiciosPage />
    </Suspense>
  );
}