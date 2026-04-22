'use client';

import React, { useState, useMemo, useRef } from 'react';
import productsData from '@/data/simba_products.json';
import { Product } from '@/types';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ProductCard from '@/components/ProductCard';
import BottomNav from '@/components/BottomNav';
import Cart from '@/components/Cart';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/hooks/useLanguage';
import { SlidersHorizontal, Search, Sparkles, Zap, ShieldCheck, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { isCartOpen, setIsCartOpen, totalItems } = useCart();
  const [sortBy, setSortBy] = useState('popularity');
  const { t } = useLanguage();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const products = productsData.products as Product[];

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category))).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                             p.category.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'lowToHigh') return a.price - b.price;
        if (sortBy === 'highToLow') return b.price - a.price;
        return 0;
      });
  }, [products, search, selectedCategory, sortBy]);

  const focusSearch = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        const input = document.querySelector('input[type="text"]') as HTMLInputElement;
        input?.focus();
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-orange-200 pb-20 lg:pb-0 relative overflow-x-hidden">
      <Navbar 
        search={search} 
        setSearch={setSearch} 
      />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Hero Banner - Full Width */}
        {!search && !selectedCategory && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-[2.5rem] overflow-hidden mb-12 min-h-[400px] flex flex-col justify-center border border-slate-200 dark:border-slate-800 shadow-2xl"
          >
              <div className="absolute inset-0 z-0">
                  <img 
                      src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200" 
                      alt="Supermarket Background"
                      className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
              </div>

              <div className="relative z-10 max-w-xl px-8 md:px-12 py-12 text-white">
                  <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tight text-white drop-shadow-sm"
                  >
                      {t.heroTitle} <br/><span className="text-orange-500">{t.heroSubtitle}</span>
                  </motion.h2>
                  <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-slate-200 text-lg md:text-xl mb-10 font-medium leading-relaxed max-w-md"
                  >
                      {t.heroDescription}
                  </motion.p>
                  <div className="flex flex-wrap gap-4">
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black transition-all transform active:scale-95 shadow-xl shadow-orange-500/30 flex items-center gap-2 group">
                          {t.startShopping}
                          <Zap className="w-4 h-4 fill-current group-hover:animate-pulse" />
                      </button>
                      <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-black transition-all transform active:scale-95 border border-white/20">
                          {t.ourStores}
                      </button>
                  </div>
              </div>
          </motion.div>
        )}

        {/* Features Bar - Full Width */}
        {!search && !selectedCategory && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center gap-4 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                      <h4 className="font-bold dark:text-white">{t.fastDelivery}</h4>
                      <p className="text-xs text-slate-500">{t.fastDeliveryDesc}</p>
                  </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                      <h4 className="font-bold dark:text-white">{t.secureMoMo}</h4>
                      <p className="text-xs text-slate-500">{t.secureMoMoDesc}</p>
                  </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                      <h4 className="font-bold dark:text-white">{t.freshProducts}</h4>
                      <p className="text-xs text-slate-500">{t.freshProductsDesc}</p>
                  </div>
              </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <section className="flex-1 min-w-0">
            {/* Mobile Category Scroller */}
            <div className="flex lg:hidden overflow-x-auto pb-4 gap-3 no-scrollbar mb-6 -mx-4 px-4 scroll-smooth">
              <button 
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-black transition-all flex items-center gap-2 shadow-lg",
                  selectedCategory === null 
                    ? "bg-slate-900 text-white shadow-slate-200 dark:shadow-none" 
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700"
                )}
              >
                <LayoutGrid className="w-4 h-4" />
                {t.allProducts}
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-black transition-all flex items-center gap-2 shadow-lg",
                    selectedCategory === cat 
                      ? "bg-orange-500 text-white shadow-orange-200" 
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {selectedCategory || (search ? `Results for "${search}"` : t.allProducts)}
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Showing {filteredProducts.length} items found
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

            {/* Product Grid */}
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8"
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-24 text-center"
                >
                  <div className="bg-slate-100 dark:bg-slate-800 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 transform rotate-12">
                    <Search className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No products found</h3>
                  <p className="text-slate-500 font-medium">Try adjusting your search or filters to find what you're looking for.</p>
                  <button 
                    onClick={() => { setSearch(''); setSelectedCategory(null); }}
                    className="mt-8 text-orange-500 font-bold hover:underline"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

        {/* Persistent/Floating Cart Sidebar Overlay */}
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

      <footer className="bg-slate-900 text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h1 className="text-3xl font-black tracking-tight mb-6">SIMBA</h1>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Rwanda's most popular online supermarket. We bring quality, value, and convenience to your doorstep.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Store Locations</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Delivery Areas</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Follow Us</h4>
            <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-all cursor-pointer">
                    <span className="font-black text-sm">FB</span>
                </div>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-all cursor-pointer">
                    <span className="font-black text-sm">IG</span>
                </div>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-all cursor-pointer">
                    <span className="font-black text-sm">TW</span>
                </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-white/5 mt-20 pt-8 text-center text-slate-500 text-xs">
          <p>© 2026 Simba Supermarket Rebuild. All rights reserved. Patrick Ntirenganya.</p>
        </div>
      </footer>
    </div>
  );
}
