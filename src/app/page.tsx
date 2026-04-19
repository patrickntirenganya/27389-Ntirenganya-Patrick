'use client';

import React, { useState, useMemo } from 'react';
import productsData from '@/data/simba_products.json';
import { Product } from '@/types';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import { useLanguage } from '@/hooks/useLanguage';
import { SlidersHorizontal, Search } from 'lucide-react';

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const { t } = useLanguage();

  const products = productsData.products as Product[];

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category))).sort();
  }, [products]);

  // Filter and Sort products
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
        return 0; // Default popularity (order in JSON)
      });
  }, [products, search, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        search={search} 
        setSearch={setSearch} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      <main className="max-w-7xl mx-auto px-4 py-8 flex gap-8 flex-1 w-full">
        
        <Sidebar 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <section className="flex-1">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                {selectedCategory || t.allProducts}
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                Showing {filteredProducts.length} items
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-500 hidden sm:inline">{t.sortBy}:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-sm font-bold border-none focus:ring-0 cursor-pointer dark:text-white outline-none"
                >
                  <option value="popularity">{t.popularity}</option>
                  <option value="lowToHigh">{t.lowToHigh}</option>
                  <option value="highToLow">{t.highToLow}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="bg-slate-100 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Search className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">No products found</h3>
              <p className="text-slate-500">Try adjusting your search or filters</p>
            </div>
          )}
        </section>
      </main>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">© 2026 Simba Supermarket Rebuild. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
