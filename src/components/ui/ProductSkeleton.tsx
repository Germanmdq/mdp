"use client";

export default function ProductSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 space-y-4 animate-pulse">
      <div className="aspect-square w-full rounded-xl bg-slate-100" />
      <div className="space-y-2">
        <div className="h-4 w-2/3 rounded bg-slate-100" />
        <div className="h-4 w-1/2 rounded bg-slate-100" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="h-6 w-1/3 rounded bg-slate-100" />
        <div className="h-6 w-1/4 rounded bg-slate-100" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
