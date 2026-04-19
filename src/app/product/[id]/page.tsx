'use client';

import React, { use, useState } from 'react';
import productsData from '@/data/simba_products.json';
import { Product } from '@/types';
import Navbar from '@/components/Navbar';
import Cart from '@/components/Cart';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/hooks/useLanguage';
import { formatPrice } from '@/lib/utils';
import { ChevronLeft, ShoppingCart, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);
  const product = (productsData.products as Product[]).find(p => p.id === productId);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { addToCart } = useCart();
  const { t } = useLanguage();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link href="/" className="text-orange-500 hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar search={search} setSearch={setSearch} onCartClick={() => setIsCartOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-500 mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Shopping
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl overflow-hidden aspect-square shadow-inner flex items-center justify-center p-8">
            <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500" />
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-4 mb-2 tracking-tight">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-orange-600">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Experience the best quality with this {product.name}. Perfect for your daily needs at Simba Supermarket. High quality {product.unit} sourced just for you.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <Truck className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-xs font-bold dark:text-white">Free Delivery</p>
                    <p className="text-[10px] text-slate-500">Orders over 50,000 RWF</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-xs font-bold dark:text-white">Authentic Product</p>
                    <p className="text-[10px] text-slate-500">100% Guaranteed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto space-y-4">
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-all active:scale-[0.98] shadow-xl shadow-slate-200 dark:shadow-none"
              >
                <ShoppingCart className="w-6 h-6" />
                {t.addToCart}
              </button>
              
              <div className="flex items-center justify-center gap-6 text-slate-400 text-sm">
                <div className="flex items-center gap-1">
                  <RefreshCcw className="w-4 h-4" />
                  7-Day Returns
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  Secure Payment
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
