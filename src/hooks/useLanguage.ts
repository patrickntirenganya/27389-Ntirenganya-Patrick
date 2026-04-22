'use client';

import { useState, useEffect, useCallback } from 'react';

export type Language = 'EN' | 'FR' | 'RW';

const productTermTranslations: Record<string, Record<Language, string>> = {
  // Categories
  'Fresh Food': { EN: 'Fresh Food', FR: 'Produits Frais', RW: 'Ibiribwa Bishya' },
  'Food Cupboard': { EN: 'Food Cupboard', FR: 'Épicerie', RW: 'Ibikenerwa mu Gikoni' },
  'Beverages': { EN: 'Beverages', FR: 'Boissons', RW: 'Ibinyobwa' },
  'Baby Products': { EN: 'Baby Products', FR: 'Produits pour Bébés', RW: 'Iby\'Abana' },
  'Health & Beauty': { EN: 'Health & Beauty', FR: 'Santé et Beauté', RW: 'Isuku n\'Ubuzima' },
  'Household & Cleaning': { EN: 'Household & Cleaning', FR: 'Maison et Nettoyage', RW: 'Isuku yo mu Rugo' },
  'Electronics & Kitchenware': { EN: 'Electronics & Kitchenware', FR: 'Électronique et Cuisine', RW: 'Ibijyanye n\'Ikoranabuhanga' },
  'Snacks & Sweets': { EN: 'Snacks & Sweets', FR: 'Snacks et Sucreries', RW: 'Ibiryo byo kurya uducye' },
  
  // Units
  'Pcs': { EN: 'Pcs', FR: 'Pcs', RW: 'Ibigize' },
  'Kg': { EN: 'Kg', FR: 'Kg', RW: 'Kg' },
  'g': { EN: 'g', FR: 'g', RW: 'g' },
  'ml': { EN: 'ml', FR: 'ml', RW: 'ml' },
  'L': { EN: 'L', FR: 'L', RW: 'L' },

  // Common Product Words
  'Milk': { EN: 'Milk', FR: 'Lait', RW: 'Amata' },
  'Bread': { EN: 'Bread', FR: 'Pain', RW: 'Umugati' },
  'Water': { EN: 'Water', FR: 'Eau', RW: 'Amazi' },
  'Sugar': { EN: 'Sugar', FR: 'Sucre', RW: 'Isukari' },
  'Rice': { EN: 'Rice', FR: 'Riz', RW: 'Umuceri' },
  'Oil': { EN: 'Oil', FR: 'Huile', RW: 'Amavuta' },
  'Salt': { EN: 'Salt', FR: 'Sel', RW: 'Umunyu' },
  'Flour': { EN: 'Flour', FR: 'Farine', RW: 'Ifu' },
  'Coffee': { EN: 'Coffee', FR: 'Café', RW: 'Ikawa' },
  'Tea': { EN: 'Tea', FR: 'Thé', RW: 'Icyayi' },
  'Butter': { EN: 'Butter', FR: 'Beurre', RW: 'Amavuta y\'inka' },
  'Cheese': { EN: 'Cheese', FR: 'Fromage', RW: 'Ibiryo bikozwe mu mata' },
  'Egg': { EN: 'Egg', FR: 'Œuf', RW: 'Igi' },
  'Chicken': { EN: 'Chicken', FR: 'Poulet', RW: 'Inkoko' },
  'Beef': { EN: 'Beef', FR: 'Bœuf', RW: 'Inyama z\'inka' },
  'Fish': { EN: 'Fish', FR: 'Poisson', RW: 'Ifi' },
  'Fresh': { EN: 'Fresh', FR: 'Frais', RW: 'Gishya' },
  'Whole': { EN: 'Whole', FR: 'Entier', RW: 'Wuzuye' },
  'Low Fat': { EN: 'Low Fat', FR: 'Faible en gras', RW: 'Irinda ibinure' },
  'Powder': { EN: 'Powder', FR: 'Poudre', RW: 'Ifu' },
  'Instant': { EN: 'Instant', FR: 'Instantané', RW: 'Ako kanya' },
  'Organic': { EN: 'Organic', FR: 'Biologique', RW: 'Umwimerere' },
};

const translations = {
  EN: {
    heroTitle: "Rwanda's #1 Supermarket",
    heroSubtitle: "Freshness Delivered to Your Door",
    heroDescription: "Shop Rwanda's best groceries, electronics, and daily essentials with instant MoMo checkout.",
    startShopping: "Start Shopping",
    ourStores: "Our Stores",
    fastDelivery: "45-min Delivery",
    fastDeliveryDesc: "Kigali within 45 minutes",
    secureMoMo: "Secure MoMo",
    secureMoMoDesc: "100% encrypted payments",
    freshProducts: "Fresh Products",
    freshProductsDesc: "Guaranteed quality",
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
    pickup: "Pick-up",
    delivery: "Delivery",
    selectBranch: "Select Branch",
    pickupTime: "Pick-up Time",
    momoDeposit: "MoMo Deposit",
    confirmOrder: "Confirm Order",
    noProducts: "No products found",
    outOfStock: "Out of stock",
    orderStatus: "Order Status",
    readyForPickup: "Ready for Pick-up",
    pending: "Pending",
    completed: "Completed",
    recipientName: "Recipient Name",
    phone: "MoMo Phone Number",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    depositRequired: "MoMo Deposit Required",
    depositDesc: "To confirm your pick-up, a non-refundable deposit of 500 RWF is required.",
    confirmAndPay: "Confirm & Pay Deposit",
    branchReviews: "Branch Reviews",
    checkPhone: "Check your phone!",
    momoPromptDesc: "We sent a prompt to your phone. Enter your PIN to pay the deposit.",
    iHavePaid: "I have paid",
    items: "items",
    viewAll: "View all",
    online: "Online",
    deliverTo: "Deliver to",
    signedInAs: "Signed in as",
    dashboard: "Dashboard",
    signOut: "Sign Out",
  },
  FR: {
    heroTitle: "Le Supermarché n°1 du Rwanda",
    heroSubtitle: "La fraîcheur livrée chez vous",
    heroDescription: "Achetez les meilleurs produits d'épicerie, d'électronique et d'essentiels quotidiens du Rwanda avec paiement MoMo instantané.",
    startShopping: "Commencer vos achats",
    ourStores: "Nos Magasins",
    fastDelivery: "Livraison 45-min",
    fastDeliveryDesc: "Kigali en 45 minutes",
    secureMoMo: "MoMo Sécurisé",
    secureMoMoDesc: "Paiements 100% cryptés",
    freshProducts: "Produits Frais",
    freshProductsDesc: "Qualité garantie",
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
    pickup: "Retrait",
    delivery: "Livraison",
    selectBranch: "Choisir la succursale",
    pickupTime: "Heure de retrait",
    momoDeposit: "Dépôt MoMo",
    confirmOrder: "Confirmer la commande",
    noProducts: "Aucun produit trouvé",
    outOfStock: "Rupture de stock",
    orderStatus: "Statut de la commande",
    readyForPickup: "Prêt pour le retrait",
    pending: "En attente",
    completed: "Terminé",
    recipientName: "Nom du destinataire",
    phone: "Numéro MoMo",
    orderSummary: "Résumé de la commande",
    subtotal: "Sous-total",
    depositRequired: "Dépôt MoMo requis",
    depositDesc: "Pour confirmer votre retrait, un dépôt non remboursable de 500 RWF est requis.",
    confirmAndPay: "Confirmer et payer le dépôt",
    branchReviews: "Avis sur la succursale",
    checkPhone: "Vérifiez votre téléphone!",
    momoPromptDesc: "Nous avons envoyé une notification. Entrez votre PIN pour payer le dépôt.",
    iHavePaid: "J'ai payé",
    items: "articles",
    viewAll: "Voir tout",
    online: "En ligne",
    deliverTo: "Livrer à",
    signedInAs: "Connecté en tant que",
    dashboard: "Tableau de bord",
    signOut: "Se déconnecter",
  },
  RW: {
    heroTitle: "Simba Supermarket ya mbere mu Rwanda",
    heroSubtitle: "Ibiribwa bishya bigezwa iwawe",
    heroDescription: "Gura ibiribwa byiza, ibikoresho by'ikoranabuhanga, n'ibindi by'ibanze ukoresheje MoMo.",
    startShopping: "Tangira Gura",
    ourStores: "Amaduka yacu",
    fastDelivery: "Iminota 45",
    fastDeliveryDesc: "Muri Kigali mu minota 45",
    secureMoMo: "MoMo Ifite Umutekano",
    secureMoMoDesc: "Kwishura bifite umutekano 100%",
    freshProducts: "Ibiribwa Bishya",
    freshProductsDesc: "Ubwiza bwizewe",
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
    pickup: "Gufata",
    delivery: "Kugezwaho",
    selectBranch: "Hitamo Ishami",
    pickupTime: "Igihe cyo gufata",
    momoDeposit: "Ingwate ya MoMo",
    confirmOrder: "Emeza Iyakira",
    noProducts: "Nta bicuruzwa byabonetse",
    outOfStock: "Byashize",
    orderStatus: "Imiterere y'iyakira",
    readyForPickup: "Biteguye gufatwa",
    pending: "Bitegereje",
    completed: "Byarangiye",
    recipientName: "Izina ry'uwakira",
    phone: "Nimero ya MoMo",
    orderSummary: "Incamake",
    subtotal: "Igiteranyo gito",
    depositRequired: "Ingwate ya MoMo irakenewe",
    depositDesc: "Kugira ngo wemereze gufata ibintu, ubanza kwishyura 500 RWF nk'ingwate.",
    confirmAndPay: "Emeza kandi wishyure",
    branchReviews: "Ibitekerezo ku ishami",
    checkPhone: "Reba muri terefoni yawe!",
    momoPromptDesc: "Tukwoherereje ubutumwa muri terefoni. Shyiramo PIN yawe wishyure ingwate.",
    iHavePaid: "Namaze kwishyura",
    items: "ibintu",
    viewAll: "Reba byose",
    online: "Kuri murandasi",
    deliverTo: "Kugeza i",
    signedInAs: "Winjiye nka",
    dashboard: "Ibiro",
    signOut: "Sohoka",
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
    // Dispatch a custom event to notify all components
    window.dispatchEvent(new Event('languageChange'));
  };

  // Sync state with local storage on event
  useEffect(() => {
    const syncLang = () => {
      const saved = localStorage.getItem('simba_lang') as Language;
      if (saved && saved !== lang) {
        setLang(saved);
      }
    };
    window.addEventListener('languageChange', syncLang);
    return () => window.removeEventListener('languageChange', syncLang);
  }, [lang]);

  const translateProduct = useCallback((text: string) => {
    if (lang === 'EN') return text;
    
    let translated = text;
    // Iterate through our term map and replace English words with translated ones
    Object.entries(productTermTranslations).forEach(([en, map]) => {
      const regex = new RegExp(`\\b${en}\\b`, 'gi');
      translated = translated.replace(regex, map[lang]);
    });
    
    return translated;
  }, [lang]);

  return { lang, t: translations[lang], changeLanguage, translateProduct };
}
