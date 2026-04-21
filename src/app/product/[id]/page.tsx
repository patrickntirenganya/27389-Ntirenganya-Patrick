'use client';

import React, { use, useState } from 'react';
import productsData from '@/data/simba_products.json';
import { Product } from '@/types';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/hooks/useLanguage';
import { formatPrice } from '@/lib/utils';
import { ChevronLeft, ShoppingCart, ShieldCheck, Truck, RefreshCcw, Star, Share2, Lock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);
  const products = productsData.products as Product[];
  const product = products.find(p => p.id === productId);
  
  const [search, setSearch] = useState('');
  const { addToCart } = useCart();
  const { t } = useLanguage();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center mx-auto rotate-12">
             <ShoppingBag className="w-12 h-12 text-slate-300" />
          </div>
          <h1 className="text-4xl font-black dark:text-white tracking-tight">Product Not Found</h1>
          <Link href="/" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-orange-600 transition-all">
            Return to Shopping
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added!`, { icon: '🛒' });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navbar search={search} setSearch={setSearch} />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <Link href="/" className="group inline-flex items-center gap-2 text-slate-500 hover:text-orange-500 mb-12 transition-all font-bold uppercase tracking-widest text-[10px]">
          <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-all">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back to browsing
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-50 dark:bg-slate-800 rounded-[3rem] overflow-hidden aspect-square shadow-inner flex items-center justify-center p-8 md:p-16 border border-slate-100 dark:border-slate-700"
          >
            <img 
                src={product.image} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-700 cursor-zoom-in" 
            />
          </motion.div>

          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-orange-500/20">
                    {product.category}
                </span>
                <button 
                    onClick={handleShare}
                    className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-orange-500 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                    <Share2 className="w-5 h-5" />
                </button>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-4 mb-4 tracking-tight leading-[1.1]">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-yellow-400">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">(4.8 / 5.0)</span>
              </div>
              <div className="flex items-baseline gap-3">
                <p className="text-4xl font-black text-orange-600">
                    {formatPrice(product.price)}
                </p>
                <span className="text-slate-400 font-bold text-sm">per {product.unit}</span>
              </div>
            </div>

            <div className="space-y-8 mb-12">
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
                Experience the premium quality of <span className="text-slate-900 dark:text-white font-bold">{product.name}</span>. 
                Sourced specifically for Simba Supermarket customers, this item meets Rwanda's highest standards of quality and freshness.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-black dark:text-white">Free Delivery</p>
                    <p className="text-xs text-slate-500 font-medium">Orders over 50k RWF</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-black dark:text-white">Guaranteed</p>
                    <p className="text-xs text-slate-500 font-medium">100% Authentic</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-all active:scale-[0.98] shadow-2xl shadow-slate-200 dark:shadow-none"
              >
                <ShoppingCart className="w-6 h-6" />
                {t.addToCart}
              </button>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-8 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2">
                  <RefreshCcw className="w-3 h-3" />
                  7-Day Returns
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-3 h-3" />
                  Secure Payment
                </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
            <div className="mt-32">
                <div className="flex items-center gap-4 mb-12">
                    <h3 className="text-3xl font-black dark:text-white tracking-tight">You might also like</h3>
                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {relatedProducts.map(rp => (
                        <ProductCard key={rp.id} product={rp} />
                    ))}
                </div>
            </div>
        )}
      </main>

      <footer className="bg-slate-900 text-white py-20 mt-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-black tracking-tight mb-4">SIMBA</h1>
            <p className="text-slate-500 text-sm italic">Premium shopping experience for modern Rwanda.</p>
        </div>
      </footer>
    </div>
  );
}

// Fixed missing import
import { ShoppingBag } from 'lucide-react';
