"use client";

import { useFavorites } from "@/contexts/FavoritesContext";
import { products, services } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";
import ServiceCard from "@/components/services/ServiceCard";
import { Heart, Package, Briefcase } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FavoritosPage() {
  const { favoriteProducts, favoriteServices } = useFavorites();
  const [activeTab, setActiveTab] = useState<"products" | "services">("products");

  const favoritedProductsList = products.filter((p) => favoriteProducts.includes(p.id));
  const favoritedServicesList = services.filter((s) => favoriteServices.includes(s.id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mis Favoritos</h1>
          <p className="text-sm text-slate-500">Gestioná los productos y servicios que guardaste.</p>
        </div>
      </div>

      <div className="flex space-x-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center space-x-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "products"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
          }`}
        >
          <Package size={18} />
          <span>Productos ({favoriteProducts.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`flex items-center space-x-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === "services"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
          }`}
        >
          <Briefcase size={18} />
          <span>Servicios ({favoriteServices.length})</span>
        </button>
      </div>

      <div className="pt-4">
        {activeTab === "products" && (
          <div>
            {favoritedProductsList.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {favoritedProductsList.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyState type="products" />
            )}
          </div>
        )}

        {activeTab === "services" && (
          <div>
            {favoritedServicesList.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {favoritedServicesList.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <EmptyState type="services" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ type }: { type: "products" | "services" }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Heart size={32} />
      </div>
      <h3 className="mb-2 text-lg font-bold text-slate-900">
        No tenés {type === "products" ? "productos" : "servicios"} favoritos
      </h3>
      <p className="mb-6 max-w-md text-sm text-slate-500">
        Cuando encuentres algo que te guste, tocala en el ícono del corazón para guardarlo acá y verlo más tarde.
      </p>
      <Link
        href={type === "products" ? "/productos" : "/servicios"}
        className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200"
      >
        Explorar {type === "products" ? "productos" : "servicios"}
      </Link>
    </div>
  );
}
