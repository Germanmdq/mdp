"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, Service, products as allProducts, services as allServices } from "@/lib/data";

interface FavoritesContextType {
  favoriteProducts: string[];
  favoriteServices: string[];
  toggleProductFavorite: (id: string) => void;
  toggleServiceFavorite: (id: string) => void;
  isProductFavorite: (id: string) => boolean;
  isServiceFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);
  const [favoriteServices, setFavoriteServices] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage
    const storedProducts = localStorage.getItem("mdp_fav_products");
    const storedServices = localStorage.getItem("mdp_fav_services");
    if (storedProducts) setFavoriteProducts(JSON.parse(storedProducts));
    if (storedServices) setFavoriteServices(JSON.parse(storedServices));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mdp_fav_products", JSON.stringify(favoriteProducts));
      localStorage.setItem("mdp_fav_services", JSON.stringify(favoriteServices));
    }
  }, [favoriteProducts, favoriteServices, isLoaded]);

  const toggleProductFavorite = (id: string) => {
    setFavoriteProducts((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const toggleServiceFavorite = (id: string) => {
    setFavoriteServices((prev) =>
      prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
    );
  };

  const isProductFavorite = (id: string) => favoriteProducts.includes(id);
  const isServiceFavorite = (id: string) => favoriteServices.includes(id);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteProducts,
        favoriteServices,
        toggleProductFavorite,
        toggleServiceFavorite,
        isProductFavorite,
        isServiceFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
