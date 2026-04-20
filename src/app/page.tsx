'use client';

import React, { useState, useMemo } from 'react';
import productsData from '@/data/simba_products.json';
import { Product } from '@/types';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import { useLanguage } from '@/hooks/useLanguage';
import { SlidersHorizontal, Search, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const { t } = useLanguage();

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

  return (
    <div className="min-h-screen flex flex-col selection:bg-orange-200">
      <Navbar 
        search={search} 
        setSearch={setSearch} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 flex-1 w-full">
        
        <Sidebar 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <section className="flex-1 min-w-0">
          
          {/* Hero Banner */}
          {!search && !selectedCategory && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-[2.5rem] overflow-hidden mb-12 bg-slate-900 text-white p-8 md:p-12 min-h-[300px] flex flex-col justify-center"
            >
                <div className="relative z-10 max-w-lg">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-500 text-xs font-bold mb-6 border border-orange-500/30">
                        <Sparkles className="w-3 h-3" />
                        Weekend Special Offer
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight">
                        Freshness <br/>Delivered to <span className="text-orange-500">Your Door.</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-8 font-medium">
                        Shop Rwanda's best groceries, electronics, and daily essentials with instant MoMo checkout.
                    </p>
                    <div className="flex gap-4">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold transition-all transform active:scale-95 shadow-lg shadow-orange-500/20">
                            Shop Now
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-bold transition-all transform active:scale-95">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full hidden md:block">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 flex gap-4">
                        {[1, 2, 3].map(i => (
                             <div key={i} className="w-24 h-32 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 rotate-[15deg]"></div>
                        ))}
                    </div>
                </div>
            </motion.div>
          )}

          {/* Features Bar */}
          {!search && !selectedCategory && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="flex items-center gap-4 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center">
                        <Zap className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <h4 className="font-bold dark:text-white">Fast Delivery</h4>
                        <p className="text-xs text-slate-500">Kigali within 2 hours</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="font-bold dark:text-white">Secure MoMo</h4>
                        <p className="text-xs text-slate-500">100% encrypted payments</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h4 className="font-bold dark:text-white">Fresh Rewards</h4>
                        <p className="text-xs text-slate-500">Points on every order</p>
                    </div>
                </div>
            </div>
          )}

          {/* Mobile Category Scroller */}
          <div className="flex lg:hidden overflow-x-auto pb-4 gap-2 no-scrollbar mb-4 -mx-4 px-4">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm",
                selectedCategory === null ? "bg-orange-500 text-white shadow-orange-200" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              )}
            >
              {t.allProducts}
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm",
                  selectedCategory === cat ? "bg-orange-500 text-white shadow-orange-200" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300"
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
      </main>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
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
