'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import productsData from '@/data/simba_products.json';
import { Product } from '@/types';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ProductCard from '@/components/ProductCard';
import BottomNav from '@/components/BottomNav';
import Cart from '@/components/Cart';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  SlidersHorizontal, Search, Zap, ShieldCheck, 
  LayoutGrid, ArrowRight, Download, Smartphone,
  Star, Clock, ChevronRight
} from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { isCartOpen, setIsCartOpen, totalItems } = useCart();
  const [sortBy, setSortBy] = useState('popularity');
  const { t, translateProduct, lang } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const products = productsData.products as Product[];

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category))).sort();
  }, [products]);

  const groupedProducts = useMemo(() => {
    const grouped: Record<string, Product[]> = {};
    
    products.forEach(p => {
      if (!grouped[p.category]) grouped[p.category] = [];
      grouped[p.category].push(p);
    });

    // Apply sorting to each group
    Object.keys(grouped).forEach(cat => {
      grouped[cat].sort((a, b) => {
        if (sortBy === 'lowToHigh') return a.price - b.price;
        if (sortBy === 'highToLow') return b.price - a.price;
        return 0;
      });
    });

    return grouped;
  }, [products, sortBy]);

  const filteredGroups = useMemo(() => {
    const result: Record<string, Product[]> = {};
    
    Object.entries(groupedProducts).forEach(([cat, items]) => {
      const filtered = items.filter(p => {
        const matchesSearch = translateProduct(p.name).toLowerCase().includes(search.toLowerCase()) ||
                             translateProduct(p.category).toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
      });

      if (filtered.length > 0) {
        result[cat] = filtered;
      }
    });

    return result;
  }, [groupedProducts, search, selectedCategory, translateProduct, lang]);

  const focusSearch = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        const input = document.querySelector('input[type="text"]') as HTMLInputElement;
        input?.focus();
    }, 500);
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen flex flex-col selection:bg-orange-200 pb-20 lg:pb-0 relative overflow-x-hidden bg-[#FAFAFA] dark:bg-slate-950">
      <Navbar 
        search={search} 
        setSearch={setSearch} 
      />

      {/* Getir Style Hero Section */}
      {!search && !selectedCategory && (
        <div className="relative bg-[#5d3ebc] overflow-hidden">
          {/* Animated background blobs */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400 rounded-full blur-[100px] animate-pulse delay-700"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 text-center md:text-left">
              <motion.img 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                src="https://www.simbaonlineshopping.com/images/simba_logo.png" 
                alt="Simba Logo" 
                className="h-16 mb-8 mx-auto md:mx-0 filter brightness-0 invert"
              />
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-black text-white leading-tight mb-6"
              >
                {t.heroSubtitle} <br/> 
                <span className="text-orange-400">{t.heroTitle.split(' ').slice(-1)}</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white/80 text-lg mb-10 max-w-lg mx-auto md:mx-0"
              >
                {t.heroDescription}
              </motion.p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => {
                    const el = document.getElementById('products-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-black transition-all transform active:scale-95 shadow-xl shadow-orange-500/20 flex items-center gap-3 group"
                >
                  {t.startShopping}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-4 rounded-xl font-black transition-all border border-white/20 flex items-center gap-3">
                  <Smartphone className="w-5 h-5" />
                  {t.ourStores}
                </button>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="hidden md:block flex-1"
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" 
                  alt="Simba Delivery"
                  className="rounded-[3rem] shadow-2xl border-8 border-white/10"
                />
                <div className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-2xl flex items-center gap-4 border border-slate-100 dark:border-slate-700">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Fastest in Kigali</p>
                    <p className="text-lg font-black dark:text-white">45 Minutes</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Feature Section (Getir Style) */}
      {!search && !selectedCategory && (
        <div className="bg-white dark:bg-slate-900 py-12 border-b dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center">
                  <Zap className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-black dark:text-white">{t.fastDelivery}</h3>
                <p className="text-slate-500 text-sm max-w-xs">{t.fastDeliveryDesc}</p>
             </div>
             <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-black dark:text-white">{t.secureMoMo}</h3>
                <p className="text-slate-500 text-sm max-w-xs">{t.secureMoMoDesc}</p>
             </div>
             <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center">
                  <Star className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-black dark:text-white">{t.freshProducts}</h3>
                <p className="text-slate-500 text-sm max-w-xs">{t.freshProductsDesc}</p>
             </div>
          </div>
        </div>
      )}

      <main id="products-section" className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <section className="flex-1 min-w-0">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {selectedCategory ? translateProduct(selectedCategory) : (search ? `Results for "${search}"` : t.allProducts)}
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-1 uppercase tracking-widest font-black">
                  {Object.values(filteredGroups).flat().length} {t.items}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-500 hidden sm:inline">{t.sortBy}:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-sm font-black border-none focus:ring-0 cursor-pointer dark:text-white outline-none"
                  >
                    <option value="popularity">{t.popularity}</option>
                    <option value="lowToHigh">{t.lowToHigh}</option>
                    <option value="highToLow">{t.highToLow}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Grouped Product Grid */}
            <AnimatePresence mode="popLayout">
              {Object.keys(filteredGroups).length > 0 ? (
                <div className="space-y-16">
                  {Object.entries(filteredGroups).map(([cat, items]) => (
                    <motion.div 
                      key={cat} 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between border-l-4 border-orange-500 pl-4">
                        <h3 className="text-xl font-black dark:text-white uppercase tracking-tight">
                          {translateProduct(cat)}
                        </h3>
                        {!selectedCategory && (
                          <button 
                            onClick={() => setSelectedCategory(cat)}
                            className="text-sm font-black text-orange-500 hover:underline flex items-center gap-1 uppercase tracking-widest"
                          >
                            {t.viewAll}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
                        {(selectedCategory ? items : items.slice(0, 8)).map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-24 text-center"
                >
                  <div className="bg-slate-100 dark:bg-slate-800 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 transform rotate-12">
                    <Search className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{t.noProducts}</h3>
                  <p className="text-slate-500 font-medium">Try adjusting your search or filters to find what you're looking for.</p>
                  <button 
                    onClick={() => { setSearch(''); setSelectedCategory(null); }}
                    className="mt-8 text-orange-500 font-bold hover:underline uppercase tracking-widest text-sm"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

        {/* Persistent Cart Sidebar */}
        <aside className={cn(
          "fixed top-24 right-4 w-80 z-40 transition-all duration-500 ease-in-out hidden lg:block",
          totalItems > 0 ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        )}>
           <Cart isOpen={true} onClose={() => {}} isInline={true} />
        </aside>
      </main>

      <BottomNav 
        onSearchClick={focusSearch} 
      />

      <footer className="bg-[#5d3ebc] text-white py-20 mt-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <img src="https://www.simbaonlineshopping.com/images/simba_logo.png" alt="" className="h-64 filter brightness-0 invert translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <img src="https://www.simbaonlineshopping.com/images/simba_logo.png" alt="Simba Logo" className="h-12 mb-8 filter brightness-0 invert" />
            <p className="text-white/60 max-w-sm leading-relaxed font-medium">
              Rwanda's most popular online supermarket. We bring quality, value, and convenience to your doorstep.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-black mb-6 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-4 text-white/60 text-sm font-bold">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Store Locations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Delivery Areas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-black mb-6 uppercase tracking-widest">App</h4>
            <div className="flex flex-col gap-4">
               <button className="bg-black/20 hover:bg-black/40 p-4 rounded-xl border border-white/10 flex items-center gap-4 transition-all">
                  <Download className="w-6 h-6" />
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase opacity-60">Get it on</p>
                    <p className="text-sm font-black">Google Play</p>
                  </div>
               </button>
               <button className="bg-black/20 hover:bg-black/40 p-4 rounded-xl border border-white/10 flex items-center gap-4 transition-all">
                  <Download className="w-6 h-6" />
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase opacity-60">Download on</p>
                    <p className="text-sm font-black">App Store</p>
                  </div>
               </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-white/10 mt-20 pt-8 text-center text-white/40 text-xs font-bold uppercase tracking-widest">
          <p>© 2026 Simba Supermarket Rebuild. All rights reserved. Patrick Ntirenganya.</p>
        </div>
      </footer>
    </div>
  );
}
