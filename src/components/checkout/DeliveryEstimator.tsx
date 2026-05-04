"use client";

import { useEffect, useState } from "react";
import { Zap, Clock, Bike } from "lucide-react";

interface DeliveryEstimate {
  label: string;
  timeWindow: string;
  motosDisponibles: number;
  demanda: "baja" | "media" | "alta";
  color: string;
  urgent: boolean;
}

function calcDelivery(): DeliveryEstimate {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();

  // Simulated available motos — varies by time of day
  const baseMotos =
    hour >= 11 && hour <= 14 ? 8 :   // almuerzo — pico
    hour >= 19 && hour <= 22 ? 5 :   // cena — alto
    hour >= 8  && hour <= 18 ? 11 :  // horario normal
    2;                                 // madrugada — pocas

  // Add slight randomness ±2
  const motosDisponibles = Math.max(1, baseMotos + Math.floor(Math.random() * 5) - 2);

  const demanda: DeliveryEstimate["demanda"] =
    motosDisponibles <= 3 ? "alta" :
    motosDisponibles <= 6 ? "media" : "baja";

  // Estimated minutes based on demand + motos
  const baseMinutes =
    demanda === "alta"  ? 75 :
    demanda === "media" ? 45 : 25;

  const eta = new Date(now.getTime() + baseMinutes * 60 * 1000);
  const etaEnd = new Date(eta.getTime() + 20 * 60 * 1000);

  const fmt = (d: Date) =>
    d.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });

  const isToday = hour >= 8 && hour <= 22 && baseMinutes < 120;

  if (isToday) {
    return {
      label: `Llega hoy entre ${fmt(eta)} y ${fmt(etaEnd)}`,
      timeWindow: `~${baseMinutes} min estimados`,
      motosDisponibles,
      demanda,
      color: demanda === "baja" ? "text-green-600" : demanda === "media" ? "text-amber-600" : "text-orange-600",
      urgent: demanda === "baja" && motosDisponibles >= 7,
    };
  }

  // Next day delivery
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayName = tomorrow.toLocaleDateString("es-AR", { weekday: "long" });

  return {
    label: `Llega el ${dayName} entre 9:00 y 13:00`,
    timeWindow: "Entrega programada para mañana",
    motosDisponibles,
    demanda,
    color: "text-blue-600",
    urgent: false,
  };
}

export default function DeliveryEstimator() {
  const [estimate, setEstimate] = useState<DeliveryEstimate | null>(null);

  useEffect(() => {
    setEstimate(calcDelivery());
    // Refresh every 2 min
    const interval = setInterval(() => setEstimate(calcDelivery()), 120_000);
    return () => clearInterval(interval);
  }, []);

  if (!estimate) {
    return (
      <div className="h-5 w-48 animate-pulse rounded bg-slate-200" />
    );
  }

  const demandaLabel = {
    baja: "Demanda baja",
    media: "Demanda media",
    alta: "Alta demanda",
  }[estimate.demanda];

  const demandaColor = {
    baja: "bg-green-100 text-green-700",
    media: "bg-amber-100 text-amber-700",
    alta: "bg-orange-100 text-orange-700",
  }[estimate.demanda];

  return (
    <div>
      <div className={`font-semibold ${estimate.color} flex items-center gap-1.5`}>
        {estimate.urgent && <Zap size={14} className="fill-current" />}
        {estimate.label}
      </div>
      <div className="mt-1.5 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <Clock size={11} />
          <span>{estimate.timeWindow}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <Bike size={11} />
          <span>{estimate.motosDisponibles} motos disponibles</span>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${demandaColor}`}>
          {demandaLabel}
        </span>
      </div>
    </div>
  );
}
