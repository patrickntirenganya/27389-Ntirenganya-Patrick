'use client';

import { useState, useEffect } from 'react';

export type Language = 'EN' | 'FR' | 'RW';

const categoryTranslations = {
  EN: {
    'Fresh Food': 'Fresh Food',
    'Food Cupboard': 'Food Cupboard',
    'Beverages': 'Beverages',
    'Baby Products': 'Baby Products',
    'Health & Beauty': 'Health & Beauty',
    'Household & Cleaning': 'Household & Cleaning',
    'Electronics & Kitchenware': 'Electronics & Kitchenware',
  },
  FR: {
    'Fresh Food': 'Produits Frais',
    'Food Cupboard': 'Épicerie',
    'Beverages': 'Boissons',
    'Baby Products': 'Produits pour Bébés',
    'Health & Beauty': 'Santé et Beauté',
    'Household & Cleaning': 'Maison et Nettoyage',
    'Electronics & Kitchenware': 'Électronique et Cuisine',
  },
  RW: {
    'Fresh Food': 'Ibiribwa Bishya',
    'Food Cupboard': 'Ibikenerwa mu Gikoni',
    'Beverages': 'Ibinyobwa',
    'Baby Products': 'Iby\'Abana',
    'Health & Beauty': 'Isuku n\'Ubuzima',
    'Household & Cleaning': 'Isuku yo mu Rugo',
    'Electronics & Kitchenware': 'Ibijyanye n\'Ikoranabuhanga',
  }
};

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
    categoriesList: categoryTranslations.EN,
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
    categoriesList: categoryTranslations.FR,
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
    categoriesList: categoryTranslations.RW,
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
