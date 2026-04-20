'use client';

import React from 'react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/hooks/useLanguage';
import { formatPrice } from '@/lib/utils';
import { Heart, Plus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added!`, {
      icon: '🛒',
    });
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-2 md:p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square rounded-xl bg-slate-50 dark:bg-slate-900 mb-2 md:mb-4 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
        </div>
      </Link>
      
      <div className="space-y-1">
        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.1em] text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded">
          {product.category}
        </span>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold text-slate-800 dark:text-white truncate hover:text-orange-500 transition-colors leading-tight mt-1 text-xs md:text-base">
            {product.name}
          </h3>
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-1 md:mt-2">
            <p className="text-sm md:text-lg font-black text-slate-900 dark:text-slate-100">
            {formatPrice(product.price)}
            </p>
            <span className="text-[8px] md:text-[10px] text-slate-400 font-medium">{product.unit}</span>
        </div>
      </div>

      <button 
        onClick={handleAddToCart}
        className="w-full mt-2 md:mt-4 flex items-center justify-center gap-2 py-2 md:py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs md:text-sm font-black hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-all active:scale-95 shadow-lg shadow-slate-200 dark:shadow-none"
      >
        <Plus className="w-3 h-3 md:w-4 md:h-4" />
        <span className="hidden xs:inline">{t.addToCart}</span>
        <span className="xs:hidden">Add</span>
      </button>
    </motion.div>
  );
};

export default ProductCard;
