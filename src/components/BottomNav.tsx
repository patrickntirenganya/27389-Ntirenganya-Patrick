'use client';

import React from 'react';
import { Home, Search, ShoppingBag, User, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  onCartClick: () => void;
  onSearchClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onCartClick, onSearchClick }) => {
  const { totalItems } = useCart();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        
        <button 
          onClick={() => window.location.href = '/'}
          className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500"
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
        </button>

        <button 
          onClick={onSearchClick}
          className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500"
        >
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Search</span>
        </button>

        <div className="relative -top-8">
            <button 
                onClick={onCartClick}
                className="bg-orange-500 text-white p-4 rounded-full shadow-2xl shadow-orange-500/40 border-4 border-slate-50 dark:border-slate-900 transform active:scale-90 transition-transform"
            >
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-900">
                        {totalItems}
                    </span>
                )}
            </button>
        </div>

        <button className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500">
          <Heart className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Favs</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
        </button>

      </div>
    </div>
  );
};

export default BottomNav;
