"use client";

import Link from "next/link";
import { Product } from "@/lib/data";
import { Shield, MapPin, Star, Zap, Heart } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isProductFavorite, toggleProductFavorite } = useFavorites();
  const isFav = isProductFavorite(product.id);

  return (
    <Link href={`/productos/${product.id}`} className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 border-slate-100">
        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
          {product.condition === "new" && (
            <div className="w-fit rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
              NUEVO
            </div>
          )}
        </div>

        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleProductFavorite(product.id);
          }}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-400 backdrop-blur-sm transition-all hover:scale-110 hover:text-red-500 shadow-sm"
        >
          <Heart size={16} className={isFav ? "fill-red-500 text-red-500" : ""} />
        </button>

        {/* Image — fixed height so all cards align */}
        <div className="relative h-40 w-full shrink-0 overflow-hidden bg-slate-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {product.shipping.free_shipping && (
            <div className="absolute bottom-2 right-2 flex items-center space-x-1 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-semibold text-blue-600 backdrop-blur-sm border border-blue-100">
              <Shield size={10} fill="currentColor" />
              <span>ENVÍO GRATIS</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-slate-500 truncate">{product.category_id}</div>
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-slate-800 transition-colors group-hover:text-blue-600 min-h-[40px]">
            {product.title}
          </h3>
          
          <div className="mt-auto">
            <div className="flex items-baseline space-x-2">
              <span className="text-lg font-bold text-slate-900">${product.price.toLocaleString("es-AR")}</span>
              {product.original_price && (
                <span className="text-xs text-slate-400 line-through">${product.original_price.toLocaleString("es-AR")}</span>
              )}
            </div>
            
            <div className="mt-3 flex items-center justify-between border-t border-slate-50 pt-3 text-[10px] text-slate-500">
              <div className="flex items-center">
                <MapPin size={12} className="mr-1 text-slate-400" />
                <span>{(product.shipping.logistic_type === "fulfillment" ? "Full" : "Envío a acordar")}</span>
              </div>
              <div className="flex items-center">
                <Star size={12} className="mr-1 text-amber-400 fill-amber-400" />
                <span>{"4.8"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
