'use client';

import React from 'react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/hooks/useLanguage';
import { formatPrice } from '@/lib/utils';
import { Heart, Plus, Minus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const { t, translateProduct } = useLanguage();

  const cartItem = cart.find(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${translateProduct(product.name)} added!`, {
      icon: '🛒',
      id: `add-${product.id}` 
    });
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-2 md:p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col"
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
      
      <div className="space-y-1 flex-1">
        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.1em] text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded">
          {translateProduct(product.category)}
        </span>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold text-slate-800 dark:text-white truncate hover:text-orange-500 transition-colors leading-tight mt-1 text-xs md:text-base">
            {translateProduct(product.name)}
          </h3>
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-1 md:mt-2">
            <p className="text-sm md:text-lg font-black text-slate-900 dark:text-slate-100">
            {formatPrice(product.price)}
            </p>
            <span className="text-[8px] md:text-[10px] text-slate-400 font-medium">{translateProduct(product.unit)}</span>
        </div>
      </div>

      <div className="mt-2 md:mt-4 min-h-[40px] flex items-center justify-center">
        <AnimatePresence mode="wait">
            {cartItem ? (
                <motion.div 
                    key="quantity-controls"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center justify-between w-full bg-orange-500 text-white rounded-xl overflow-hidden shadow-lg shadow-orange-500/20"
                >
                    <button 
                        onClick={() => updateQuantity(product.id, -1)}
                        className="p-2 md:p-3 hover:bg-orange-600 transition-colors flex-1 flex justify-center"
                    >
                        <Minus className="w-4 h-4 font-black" />
                    </button>
                    <span className="w-8 text-center font-black text-sm md:text-base">{cartItem.quantity}</span>
                    <button 
                        onClick={() => updateQuantity(product.id, 1)}
                        className="p-2 md:p-3 hover:bg-orange-600 transition-colors flex-1 flex justify-center"
                    >
                        <Plus className="w-4 h-4 font-black" />
                    </button>
                </motion.div>
            ) : (
                <motion.button 
                    key="add-button"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={handleAddToCart}
                    className="w-full py-2.5 md:py-3 bg-white dark:bg-slate-900 text-orange-600 border-2 border-orange-500 rounded-xl text-xs md:text-sm font-black hover:bg-orange-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    <Plus className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden xs:inline uppercase tracking-widest">{t.addToCart}</span>
                    <span className="xs:hidden">Add</span>
                </motion.button>
            )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProductCard;
