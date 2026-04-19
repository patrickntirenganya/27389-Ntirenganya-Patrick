'use client';

import React from 'react';
import { ShoppingBasket, Search, ShoppingCart, Globe, Moon, Sun, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage, Language } from '@/hooks/useLanguage';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface NavbarProps {
  search: string;
  setSearch: (s: string) => void;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ search, setSearch, onCartClick }) => {
  const { totalItems } = useCart();
  const { lang, t, changeLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
          <div className="bg-orange-500 p-1.5 rounded-lg shadow-sm shadow-orange-200">
            <ShoppingBasket className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white hidden sm:block">SIMBA</h1>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.search}
            className="w-full bg-slate-100 dark:bg-slate-700 border-none rounded-full py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-orange-500 transition-all outline-none text-sm dark:text-white dark:placeholder-slate-400 shadow-inner"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Theme Toggle */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-orange-500 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Language Toggle */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-orange-500 transition-colors p-2">
              <Globe className="w-5 h-5" />
              <span className="hidden sm:inline">{lang}</span>
            </button>
            <div className="absolute top-full right-0 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl shadow-xl py-2 hidden group-hover:block min-w-[120px]">
              {(['EN', 'FR', 'RW'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => changeLanguage(l)}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors",
                    lang === l ? "text-orange-500 font-bold" : "text-slate-600 dark:text-slate-300"
                  )}
                >
                  {l === 'EN' ? 'English' : l === 'FR' ? 'Français' : 'Kinyarwanda'}
                </button>
              ))}
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

          {/* Cart */}
          <button 
            onClick={onCartClick}
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-orange-500 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-800">
                {totalItems}
              </span>
            )}
          </button>

          {/* Profile */}
          <button className="hidden sm:flex items-center gap-2 bg-slate-800 dark:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition-all">
            <User className="w-4 h-4" />
            {t.signIn}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
