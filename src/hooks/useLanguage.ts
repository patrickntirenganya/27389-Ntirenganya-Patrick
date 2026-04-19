'use client';

import { useState, useEffect } from 'react';

export type Language = 'EN' | 'FR' | 'RW';

const translations = {
  EN: {
    search: "Search products, brands, categories...",
    cart: "Cart",
    signIn: "Sign In",
    categories: "Categories",
    allProducts: "All Products",
    recommended: "Recommended for you",
    addToCart: "Add to Cart",
    total: "Total",
    checkout: "Checkout",
    sortBy: "Sort by",
    popularity: "Popularity",
    lowToHigh: "Price: Low to High",
    highToLow: "Price: High to Low",
  },
  FR: {
    search: "Rechercher des produits, marques...",
    cart: "Panier",
    signIn: "Se connecter",
    categories: "Catégories",
    allProducts: "Tous les produits",
    recommended: "Recommandé pour vous",
    addToCart: "Ajouter au panier",
    total: "Total",
    checkout: "Commander",
    sortBy: "Trier par",
    popularity: "Popularité",
    lowToHigh: "Prix: Croissant",
    highToLow: "Prix: Décroissant",
  },
  RW: {
    search: "Shaka ibicuruzwa...",
    cart: "Ikarita",
    signIn: "Injira",
    categories: "Ibyiciro",
    allProducts: "Ibicuruzwa byose",
    recommended: "Ibyatoranyijwe",
    addToCart: "Shyira mu ikarita",
    total: "Hose",
    checkout: "Ishura",
    sortBy: "Tondeka",
    popularity: "Ibikunzwe",
    lowToHigh: "Igiciro: Gito",
    highToLow: "Igiciro: Kinini",
  }
};

export function useLanguage() {
  const [lang, setLang] = useState<Language>('EN');

  useEffect(() => {
    const saved = localStorage.getItem('simba_lang') as Language;
    if (saved && translations[saved]) {
      setLang(saved);
    }
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('simba_lang', newLang);
  };

  return { lang, t: translations[lang], changeLanguage };
}
