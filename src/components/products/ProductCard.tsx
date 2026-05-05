"use client";

import Link from "next/link";
import { Product } from "@/lib/data";
import { Zap, Heart, Star } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isProductFavorite, toggleProductFavorite } = useFavorites();
  const isFav = isProductFavorite(product.id);

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  return (
    <Link href={`/productos/${product.id}`} className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-transparent bg-white shadow-none transition-all hover:shadow-lg border-b-slate-100">
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleProductFavorite(product.id);
          }}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-400 backdrop-blur-sm transition-all hover:scale-110 hover:text-red-500 shadow-sm md:opacity-0 group-hover:opacity-100"
        >
          <Heart size={18} className={isFav ? "fill-red-500 text-red-500" : ""} />
        </button>

        {/* Image — contain on white background */}
        <div className="relative h-48 w-full shrink-0 overflow-hidden bg-white p-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4 border-t border-slate-50">
          <h3 className="mb-1 line-clamp-2 text-[13px] font-normal text-slate-800 transition-colors min-h-[40px]">
            {product.title}
          </h3>
          
          <div className="mt-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-normal text-slate-900">${product.price.toLocaleString("es-AR")}</span>
              {discount && (
                <span className="text-xs font-semibold text-green-600">{discount}% OFF</span>
              )}
            </div>
            
            {product.shipping.free_shipping && (
              <div className="mt-1 text-[12px] font-bold text-green-600">
                Envío gratis
              </div>
            )}

            {product.shipping.logistic_type === "fulfillment" && (
              <div className="mt-1 flex items-center gap-1">
                 <span className="text-[12px] font-bold italic text-green-600">FULL</span>
                 <Zap size={12} className="text-green-600 fill-green-600" />
              </div>
            )}
            
            <div className="mt-2 flex items-center gap-1">
               <span className="text-[12px] text-slate-500">por {product.seller.nickname}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
