'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { formatPrice, cn } from '@/lib/utils';
import { 
    ChevronLeft, CreditCard, Phone, MapPin, 
    CheckCircle2, ShoppingBag, Truck, Lock, 
    ArrowLeft, User, Mail, Clock, Info, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BranchReviews from '@/components/BranchReviews';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const BRANCHES = [
    "Simba Supermarket Remera",
    "Simba Supermarket Kimironko",
    "Simba Supermarket Kacyiru",
    "Simba Supermarket Nyamirambo",
    "Simba Supermarket Gikondo",
    "Simba Supermarket Kanombe",
    "Simba Supermarket Kinyinya",
    "Simba Supermarket Kibagabaga",
    "Simba Supermarket Nyanza"
];

const PICKUP_TIMES = [
    "ASAP (within 45 mins)",
    "Today, 14:00 - 15:00",
    "Today, 15:00 - 16:00",
    "Today, 16:00 - 17:00",
    "Today, 17:00 - 18:00",
    "Tomorrow Morning",
];

const DEPOSIT_AMOUNT = 500; // RWF

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user, login, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  
  const [checkoutType, setCheckoutType] = useState<'pickup' | 'delivery'>('pickup');
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]);
  const [selectedTime, setSelectedTime] = useState(PICKUP_TIMES[0]);
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'card'>('momo');
  const [isSuccess, setIsSuccess] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMomoPrompt, setShowMomoPrompt] = useState(false);

  // Delivery state
  const [district, setDistrict] = useState('');
  const [sector, setSector] = useState('');
  const [phone, setPhone] = useState('');
  const [recipientName, setRecipientName] = useState(user?.name || '');

  useEffect(() => {
    if (user) {
        setRecipientName(user.name);
    }
  }, [user]);

  const handlePlaceOrder = () => {
    if (checkoutType === 'delivery' && (!district || !sector || !phone)) {
        toast.error("Please complete delivery information");
        return;
    }
    if (!phone && checkoutType === 'pickup') {
        toast.error("Please provide a phone number for MoMo deposit");
        return;
    }
    
    setIsLoading(true);
    // Simulate MoMo Deposit Prompt
    setTimeout(() => {
        setIsLoading(false);
        setShowMomoPrompt(true);
    }, 1500);
  };

  const confirmMomoPayment = () => {
    setIsLoading(true);
    setShowMomoPrompt(false);
    setTimeout(() => {
        setIsSuccess(true);
        clearCart();
        setIsLoading(false);
        toast.success("Deposit paid! Order sent to branch.", { duration: 5000 });
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 max-w-md bg-white dark:bg-slate-800 p-12 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-700"
        >
          <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-500/20">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-3xl font-black dark:text-white tracking-tight mb-2">Order Confirmed!</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
                {checkoutType === 'pickup' 
                    ? `Your order #SMB-8829 is being prepared at ${selectedBranch}. See you at ${selectedTime}!`
                    : `Your order #SMB-8829 is on its way to your location.`}
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 pb-20">
      <Navbar search={search} setSearch={setSearch} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <Link href="/" className="group inline-flex items-center gap-2 text-slate-500 hover:text-orange-500 mb-12 transition-all font-bold uppercase tracking-widest text-xs">
          <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 group-hover:bg-orange-500 group-hover:text-white transition-all">
            <ChevronLeft className="w-4 h-4" />
          </div>
          Back to Store
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-4xl font-black dark:text-white tracking-tight">{t.checkout}</h1>
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                </div>

                {/* Checkout Type Selector */}
                <div className="flex p-2 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border dark:border-slate-700">
                    <button 
                        onClick={() => setCheckoutType('pickup')}
                        className={cn(
                            "flex-1 py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2",
                            checkoutType === 'pickup' ? "bg-orange-500 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900"
                        )}
                    >
                        <MapPin className="w-5 h-5" />
                        {t.pickup}
                    </button>
                    <button 
                        onClick={() => setCheckoutType('delivery')}
                        className={cn(
                            "flex-1 py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2",
                            checkoutType === 'delivery' ? "bg-orange-500 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900"
                        )}
                    >
                        <Truck className="w-5 h-5" />
                        {t.delivery}
                    </button>
                </div>

                {checkoutType === 'pickup' ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-sm border dark:border-slate-700 space-y-8"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-2xl flex items-center justify-center font-black text-xl">1</div>
                            <div>
                                <h2 className="text-xl font-black dark:text-white">{t.pickup}</h2>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{t.selectBranch}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.selectBranch}</label>
                                <select 
                                    value={selectedBranch}
                                    onChange={(e) => setSelectedBranch(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl p-4 outline-none focus:border-orange-500 transition-all dark:text-white font-medium"
                                >
                                    {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.pickupTime}</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <select 
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl p-4 pl-12 outline-none focus:border-orange-500 transition-all dark:text-white font-medium"
                                    >
                                        {PICKUP_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-[2rem] border border-blue-100 dark:border-blue-900/30 flex gap-4">
                            <Info className="w-6 h-6 text-blue-500 shrink-0" />
                            <div>
                                <h4 className="font-bold text-blue-900 dark:text-blue-200 text-sm">{t.momoDeposit}</h4>
                                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 leading-relaxed">
                                    {t.depositDesc}
                                </p>
                            </div>
                        </div>

                        <div className="pt-8 border-t dark:border-slate-700">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">{t.branchReviews}</h3>
                            <BranchReviews branch={selectedBranch} />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-sm border dark:border-slate-700 space-y-8"
                    >
                        <div className="text-center py-12">
                            <Truck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-500 font-medium">Standard Kigali delivery available. <br/> Most customers prefer pick-up!</p>
                            <button onClick={() => setCheckoutType('pickup')} className="mt-4 text-orange-500 font-bold hover:underline">Switch to Pick-up</button>
                        </div>
                    </motion.div>
                )}

                {/* Shared Contact Info */}
                <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-sm border dark:border-slate-700 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-2xl flex items-center justify-center font-black text-xl">2</div>
                        <h2 className="text-xl font-black dark:text-white">Contact Information</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.recipientName}</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input 
                                    type="text" 
                                    value={recipientName}
                                    onChange={(e) => setRecipientName(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl p-4 pl-12 outline-none focus:border-orange-500 transition-all dark:text-white font-medium" 
                                    placeholder={t.recipientName} 
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.phone}</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input 
                                    type="tel" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl p-4 pl-12 outline-none focus:border-orange-500 transition-all dark:text-white font-medium" 
                                    placeholder="078x xxx xxx" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar Summary */}
            <div className="space-y-8">
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-slate-900 dark:bg-slate-800 text-white rounded-[3rem] p-8 shadow-2xl sticky top-24 overflow-hidden border border-white/5"
                >
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                            <ShoppingBag className="w-6 h-6 text-orange-500" />
                            {t.orderSummary}
                        </h3>
                        
                        <div className="space-y-4 mb-8 max-h-60 overflow-y-auto custom-scroll pr-2">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-start gap-4">
                                    <p className="text-sm font-bold flex-1 truncate">{item.name}</p>
                                    <p className="text-sm font-black text-orange-500">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-white/10 pt-8 space-y-4">
                            <div className="flex justify-between text-slate-400 text-sm font-bold">
                                <span>{t.subtotal}</span>
                                <span className="text-white">{formatPrice(totalPrice)}</span>
                            </div>
                            <div className="flex justify-between text-slate-400 text-sm font-bold">
                                <span>{t.momoDeposit}</span>
                                <span className="text-orange-500 font-black">{formatPrice(DEPOSIT_AMOUNT)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-6">
                                <span className="text-xl font-black">{t.total}</span>
                                <div className="text-right">
                                    <span className="text-3xl font-black text-orange-500 block leading-none">{formatPrice(totalPrice + DEPOSIT_AMOUNT)}</span>
                                    <p className="text-[10px] text-slate-500 font-medium mt-1">Includes RWF 500 deposit</p>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handlePlaceOrder}
                            disabled={cart.length === 0 || isLoading}
                            className="w-full bg-white text-slate-900 py-5 rounded-[2rem] font-black text-lg mt-10 hover:bg-orange-500 hover:text-white transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <Lock className="w-5 h-5" />
                                    {t.confirmAndPay}
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>

                {/* Trust Signage */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border dark:border-slate-700">
                    <div className="flex items-center gap-4 mb-4">
                        <ShieldCheck className="w-8 h-8 text-green-500" />
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Secure Checkout</p>
                            <p className="font-bold dark:text-white">Encrypted Payments</p>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Your transaction is secured with industry-standard encryption. Simba Supermarket never stores your MoMo PIN.
                    </p>
                </div>
            </div>
        </div>
      </main>

      {/* MoMo Prompt Modal */}
      <AnimatePresence>
        {showMomoPrompt && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    className="relative bg-white dark:bg-slate-800 p-8 rounded-[3rem] shadow-2xl max-w-sm w-full text-center"
                >
                    <div className="w-20 h-20 bg-yellow-400 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white font-black text-2xl">MoMo</div>
                    <h3 className="text-2xl font-black dark:text-white mb-2">{t.checkPhone}</h3>
                    <p className="text-slate-500 font-medium mb-8">
                        {t.momoPromptDesc} <span className="font-bold text-slate-900 dark:text-white">{phone}</span>.
                    </p>
                    <button 
                        onClick={confirmMomoPayment}
                        className="w-full bg-slate-900 dark:bg-orange-500 text-white py-4 rounded-2xl font-black transition-all hover:bg-orange-600 active:scale-95"
                    >
                        {t.iHavePaid}
                    </button>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
}
