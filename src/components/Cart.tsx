'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/hooks/useLanguage';
import { formatPrice } from '@/lib/utils';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  isInline?: boolean;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, isInline = false }) => {
  const { cart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const { t } = useLanguage();

  if (isInline) {
    return (
      <div className="h-full w-full bg-white dark:bg-slate-900 shadow-xl rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-xl shadow-lg shadow-orange-500/20">
                <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
                <h2 className="text-xl font-black dark:text-white leading-tight">{t.cart}</h2>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{totalItems} Items</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scroll">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4 py-12">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p className="font-bold text-sm">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-3 p-2 rounded-xl border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{item.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-600 font-black text-xs">{formatPrice(item.price)}</span>
                    <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border dark:border-slate-700 scale-90 origin-right">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all"><Minus className="w-2.5 h-2.5" /></button>
                      <span className="w-6 text-center text-[10px] font-black">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-all"><Plus className="w-2.5 h-2.5" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-black dark:text-white">Total</span>
              <span className="text-xl font-black text-orange-600">{formatPrice(totalPrice)}</span>
            </div>
            <Link 
              href="/checkout"
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-2 group"
            >
              {t.checkout}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500 p-2 rounded-xl shadow-lg shadow-orange-500/20">
                    <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-black dark:text-white leading-tight">{t.cart}</h2>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{totalItems} Items selected</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-all active:scale-90"
              >
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
              <AnimatePresence mode="popLayout">
                {cart.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="h-full flex flex-col items-center justify-center text-slate-400 space-y-6"
                    >
                        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center rotate-12">
                            <ShoppingBag className="w-12 h-12 opacity-20" />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-slate-800 dark:text-white text-lg">Your cart is lonely</p>
                            <p className="text-sm font-medium">Add some items to start shopping!</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-2xl font-bold hover:bg-orange-500 transition-colors"
                        >
                            Explore Products
                        </button>
                    </motion.div>
                ) : (
                    cart.map((item) => (
                    <motion.div 
                        layout
                        key={item.id} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-4 group bg-white dark:bg-slate-800/50 p-3 rounded-2xl border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all"
                    >
                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate mb-1">
                                {item.name}
                            </h4>
                            <p className="text-orange-600 font-black text-sm">
                                {formatPrice(item.price)}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border dark:border-slate-700">
                            <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all active:scale-75"
                            >
                                <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all active:scale-75"
                            >
                                <Plus className="w-3 h-3" />
                            </button>
                            </div>
                            <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                            >
                            <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        </div>
                    </motion.div>
                    ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-6">
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-slate-500 text-sm font-bold uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-slate-900 dark:text-white">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-500 text-sm font-bold uppercase tracking-widest">
                    <span>Delivery</span>
                    <span className="text-green-500 font-black">FREE</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                    <span className="text-xl font-black dark:text-white">Total</span>
                    <span className="text-3xl font-black text-orange-600">{formatPrice(totalPrice)}</span>
                    </div>
                </div>
                <Link 
                  href="/checkout"
                  onClick={onClose}
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-slate-200 dark:shadow-none hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
                >
                  {t.checkout}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
