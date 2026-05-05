"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="relative h-24 w-24">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
        {/* Spinning Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
        {/* Center Logo/Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-black italic text-blue-600">MDP</span>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center gap-2">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900">Cargando Experiencia</h2>
        <div className="flex gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
          <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
          <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
