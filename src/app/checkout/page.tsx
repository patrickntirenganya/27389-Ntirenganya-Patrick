'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/hooks/useLanguage';
import { formatPrice, cn } from '@/lib/utils';
import { ChevronLeft, CreditCard, Phone, MapPin, CheckCircle2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'card'>('momo');
  const [isSuccess, setIsSuccess] = useState(false);
  const [search, setSearch] = useState('');

  const handlePlaceOrder = () => {
    setIsSuccess(true);
    setTimeout(() => {
        clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-100 dark:shadow-none">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-black dark:text-white tracking-tight">Order Received!</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Thank you for shopping with Simba. Your order #SMB-8829 is being prepared. We'll send you a MoMo prompt shortly.
          </p>
          <Link href="/" className="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-bold transition-all hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <Navbar search={search} setSearch={setSearch} onCartClick={() => {}} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-500 mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Continue Shopping
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Delivery */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl flex items-center justify-center font-black">1</div>
                <h2 className="text-xl font-bold dark:text-white">Delivery Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                    <input type="text" className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500 dark:text-white" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
                    <input type="tel" className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500 dark:text-white" placeholder="+250 78x xxx xxx" />
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Delivery Address</label>
                    <textarea className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500 h-24 dark:text-white" placeholder="Street, Apartment, Neighborhood in Kigali..."></textarea>
                </div>
              </div>
            </div>

            {/* Step 2: Payment */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl flex items-center justify-center font-black">2</div>
                <h2 className="text-xl font-bold dark:text-white">Payment Method</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => setPaymentMethod('momo')}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left",
                    paymentMethod === 'momo' 
                      ? "border-orange-500 bg-orange-50/50 dark:bg-orange-900/10" 
                      : "border-slate-100 dark:border-slate-700 hover:border-slate-200"
                  )}
                >
                  <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-white font-black text-xs">MoMo</div>
                  <div>
                    <p className="font-bold dark:text-white">MTN Mobile Money</p>
                    <p className="text-xs text-slate-500">Fast and secure</p>
                  </div>
                </button>

                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left",
                    paymentMethod === 'card' 
                      ? "border-orange-500 bg-orange-50/50 dark:bg-orange-900/10" 
                      : "border-slate-100 dark:border-slate-700 hover:border-slate-200"
                  )}
                >
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <p className="font-bold dark:text-white">Credit / Debit Card</p>
                    <p className="text-xs text-slate-500">Visa, Mastercard</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-slate-900 dark:bg-slate-800 text-white rounded-3xl p-6 shadow-xl sticky top-24">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-500" />
                Order Summary
              </h3>
              
              <div className="space-y-4 mb-8 max-h-60 overflow-y-auto custom-scroll pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.quantity} x {formatPrice(item.price)}</p>
                    </div>
                    <p className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
                {cart.length === 0 && <p className="text-slate-400 italic text-center py-4">Your cart is empty</p>}
              </div>

              <div className="border-t border-slate-800 dark:border-slate-700 pt-6 space-y-4">
                <div className="flex justify-between text-slate-400">
                  <span className="text-sm">Subtotal</span>
                  <span className="font-medium text-white">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span className="text-sm">Delivery</span>
                  <span className="font-medium text-green-400">FREE</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-black text-orange-500">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={cart.length === 0}
                className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-lg mt-8 hover:bg-orange-500 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Place Order
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                <MapPin className="w-3 h-3" />
                Simba Supermarket, Kigali
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
