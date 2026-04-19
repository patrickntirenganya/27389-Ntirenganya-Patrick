'use client';

import React from 'react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/hooks/useLanguage';
import { formatPrice } from '@/lib/utils';
import { Heart, Plus } from 'lucide-react';

import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square rounded-xl bg-slate-50 dark:bg-slate-900 mb-4 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <button className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-50 dark:hover:bg-red-900/30">
            <Heart className="w-4 h-4 text-slate-600 dark:text-slate-300 hover:text-red-500" />
          </button>
        </div>
      </Link>
      
      <div className="space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
          {product.category}
        </span>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-slate-800 dark:text-white truncate hover:text-orange-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {formatPrice(product.price)}
        </p>
      </div>

      <button 
        onClick={() => addToCart(product)}
        className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-all active:scale-95"
      >
        <Plus className="w-4 h-4" />
        {t.addToCart}
      </button>
    </div>
  );
};

export default ProductCard;
