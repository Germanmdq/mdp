"use client";

import Link from "next/link";
import { Service } from "@/lib/data";
import { ShieldCheck, Star, Clock, CheckCircle2, MapPin, Heart, Zap } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { isServiceFavorite, toggleServiceFavorite } = useFavorites();
  const isFav = isServiceFavorite(service.id);

  return (
    <Link href={`/servicios/${service.id}`}>
      <div className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 ${service.featured ? 'border-amber-200 ring-1 ring-amber-100' : 'border-slate-100'}`}>
        
        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
          {service.featured && (
            <div className="flex items-center space-x-1 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
              <Zap size={10} fill="currentColor" />
              <span>DESTACADO</span>
            </div>
          )}
        </div>

        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleServiceFavorite(service.id);
          }}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-400 backdrop-blur-sm transition-all hover:scale-110 hover:text-red-500 shadow-sm"
        >
          <Heart size={16} className={isFav ? "fill-red-500 text-red-500" : ""} />
        </button>

        {/* Cover Photo Area (Upper half) */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <img
            src={service.image}
            alt={service.professionalName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-blue-600 px-2 py-1 text-[10px] font-bold text-white shadow-sm">
            <ShieldCheck size={12} />
            MDP Verificado
          </div>
        </div>

        {/* Content Info (Lower half) */}
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-blue-600">{service.category}</div>
          
          <h3 className="mb-1 text-sm font-semibold text-slate-800 line-clamp-2 min-h-[40px]">
            {service.name}
          </h3>
          
          <p className="text-xs text-slate-500 mb-3">por {service.professionalName}</p>
          
          <div className="mt-auto">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase text-slate-400">Desde</span>
                <div className="text-lg font-semibold text-slate-900">${service.priceFrom.toLocaleString("es-AR")}</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-bold text-slate-900">{service.rating.toFixed(1)}</span>
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500 pt-3 border-t border-slate-100">
              <div className="flex items-center">
                <MapPin size={12} className="mr-1 text-slate-400 shrink-0" />
                <span className="truncate max-w-[100px]">{service.zone[0]}</span>
              </div>
              <div className="flex items-center">
                <Clock size={12} className="mr-1 text-slate-400 shrink-0" />
                <span>{service.responseTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
