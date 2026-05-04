"use client";

import { useEffect } from "react";

export default function ProductViewTracker({ productId }: { productId: string }) {
  useEffect(() => {
    try {
      const stored = localStorage.getItem("mdp_viewed_products");
      const ids: string[] = stored ? JSON.parse(stored) : [];
      // Remove if already exists and add to front
      const updated = [productId, ...ids.filter(id => id !== productId)].slice(0, 20);
      localStorage.setItem("mdp_viewed_products", JSON.stringify(updated));
    } catch {}
  }, [productId]);

  return null;
}
