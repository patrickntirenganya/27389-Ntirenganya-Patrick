'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/hooks/useLanguage';
import { formatPrice, cn } from '@/lib/utils';
import { ChevronLeft, CreditCard, Phone, MapPin, CheckCircle2, ShoppingBag, Truck, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'card'>('momo');
  const [isSuccess, setIsSuccess] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceOrder = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        setIsSuccess(true);
        clearCart();
        setIsLoading(false);
        toast.success("Order placed successfully!", { duration: 5000 });
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 max-w-md bg-white dark:bg-slate-800 p-12 rounded-[3rem] shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-700"
        >
          <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-500/20">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-3xl font-black dark:text-white tracking-tight mb-2">Order Confirmed!</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
                Thank you for choosing Simba. Your order <span className="text-slate-900 dark:text-white font-bold">#SMB-8829</span> is being processed. 
                Keep your phone nearby for the MoMo prompt.
            </p>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-4 rounded-2xl font-black transition-all hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transform active:scale-95 shadow-xl shadow-slate-200 dark:shadow-none">
            <ArrowLeft className="w-5 h-5" />
            Return to Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar search={search} setSearch={setSearch} onCartClick={() => {}} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <Link href="/" className="group inline-flex items-center gap-2 text-slate-500 hover:text-orange-500 mb-12 transition-all font-bold uppercase tracking-widest text-xs">
          <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 group-hover:bg-orange-500 group-hover:text-white transition-all">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back to Store
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            
            <div className="flex items-center gap-4 mb-2">
                <h1 className="text-4xl font-black dark:text-white tracking-tight">Checkout</h1>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
            </div>

            {/* Delivery */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-2xl flex items-center justify-center font-black text-xl">1</div>
                <div>
                    <h2 className="text-xl font-black dark:text-white">Delivery Information</h2>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Where should we send your items?</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Recipient Name</label>
                    <input type="text" className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl p-4 outline-none focus:border-orange-500 transition-all dark:text-white font-medium" placeholder="e.g. Patrick Ntirenganya" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="tel" className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl p-4 pl-12 outline-none focus:border-orange-500 transition-all dark:text-white font-medium" placeholder="+250 78x xxx xxx" />
                    </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Detailed Address</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                        <textarea className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl p-4 pl-12 outline-none focus:border-orange-500 transition-all h-32 dark:text-white font-medium" placeholder="Street number, Building name, District in Kigali..."></textarea>
                    </div>
                </div>
              </div>
            </motion.div>

            {/* Payment */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-700"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-2xl flex items-center justify-center font-black text-xl">2</div>
                <div>
                    <h2 className="text-xl font-black dark:text-white">Payment Method</h2>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Secure and instant payment</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button 
                  onClick={() => setPaymentMethod('momo')}
                  className={cn(
                    "flex items-center gap-5 p-6 rounded-[2rem] border-2 transition-all text-left group",
                    paymentMethod === 'momo' 
                      ? "border-orange-500 bg-orange-50/50 dark:bg-orange-900/10 shadow-lg shadow-orange-500/10" 
                      : "border-slate-100 dark:border-slate-700 hover:border-slate-200"
                  )}
                >
                  <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-inner group-hover:scale-110 transition-transform">MoMo</div>
                  <div>
                    <p className="font-black dark:text-white leading-tight">MTN Mobile Money</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">Instant prompt on your phone</p>
                  </div>
                </button>

                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={cn(
                    "flex items-center gap-5 p-6 rounded-[2rem] border-2 transition-all text-left group",
                    paymentMethod === 'card' 
                      ? "border-orange-500 bg-orange-50/50 dark:bg-orange-900/10 shadow-lg shadow-orange-500/10" 
                      : "border-slate-100 dark:border-slate-700 hover:border-slate-200"
                  )}
                >
                  <div className="w-14 h-14 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CreditCard className="w-7 h-7 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <p className="font-black dark:text-white leading-tight">Credit / Debit Card</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">Visa, Mastercard, Amex</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="space-y-8">
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-900 dark:bg-slate-800 text-white rounded-[3rem] p-8 shadow-2xl sticky top-24 border border-white/5 overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                    <ShoppingBag className="w-6 h-6 text-orange-500" />
                    Order Summary
                </h3>
                
                <div className="space-y-6 mb-10 max-h-80 overflow-y-auto custom-scroll pr-2">
                    {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate text-slate-100">{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{item.quantity} x {formatPrice(item.price)}</p>
                        </div>
                        <p className="text-sm font-black text-orange-500 whitespace-nowrap">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                    ))}
                    {cart.length === 0 && (
                        <div className="text-center py-8">
                             <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto mb-4 opacity-50" />
                             <p className="text-slate-500 font-bold">Your cart is empty</p>
                        </div>
                    )}
                </div>

                <div className="border-t border-white/10 pt-8 space-y-4">
                    <div className="flex justify-between text-slate-400 text-sm font-bold">
                    <span>Subtotal</span>
                    <span className="text-white">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-sm font-bold">
                    <span>Delivery Fee</span>
                    <span className="text-green-400 font-black uppercase tracking-widest text-xs">Free</span>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                    <span className="text-xl font-black">Total</span>
                    <div className="text-right">
                        <span className="text-3xl font-black text-orange-500 block leading-none">{formatPrice(totalPrice)}</span>
                        <span className="text-[10px] text-slate-500 font-medium">All taxes included</span>
                    </div>
                    </div>
                </div>

                <button 
                    onClick={handlePlaceOrder}
                    disabled={cart.length === 0 || isLoading}
                    className="w-full bg-white text-slate-900 py-5 rounded-[2rem] font-black text-lg mt-10 hover:bg-orange-500 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-black/20 flex items-center justify-center gap-3"
                >
                    {isLoading ? (
                        <div className="w-6 h-6 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <Lock className="w-5 h-5" />
                            Place Order Now
                        </>
                    )}
                </button>
                
                <div className="mt-8 flex flex-col items-center gap-4 text-slate-500">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black">
                        <Truck className="w-3 h-3 text-orange-500" />
                        Delivering to Kigali
                    </div>
                    <p className="text-[9px] text-center text-slate-600 font-medium">
                        By placing your order, you agree to Simba Supermarket's <br/>Terms of Service and Privacy Policy.
                    </p>
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]"></div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
