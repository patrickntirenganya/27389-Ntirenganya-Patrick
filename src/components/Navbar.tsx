'use client';

import React, { useState } from 'react';
import { ShoppingBasket, Search, ShoppingCart, Globe, Moon, Sun, User, MapPin, ChevronDown, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage, Language } from '@/hooks/useLanguage';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import LoginModal from './LoginModal';

interface NavbarProps {
  search: string;
  setSearch: (s: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ search, setSearch }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const { lang, t, changeLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Logo & Address */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.location.href = '/'}>
            <div className="bg-orange-500 p-2 rounded-2xl shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <ShoppingBasket className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">SIMBA</h1>
              <span className="text-[8px] font-black text-orange-500 uppercase tracking-[0.3em] leading-none mt-1">Online</span>
            </div>
          </div>

          {/* Address Selector (Getir Style) */}
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700 cursor-pointer hover:border-orange-500 transition-all group">
            <div className="bg-white dark:bg-slate-800 p-1.5 rounded-lg shadow-sm">
                <MapPin className="w-4 h-4 text-orange-500" />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Deliver to</span>
                <div className="flex items-center gap-1">
                    <span className="text-xs font-bold dark:text-white">Kigali, Rwanda</span>
                    <ChevronDown className="w-3 h-3 text-orange-500 group-hover:translate-y-0.5 transition-transform" />
                </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md relative">
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
            onClick={() => setIsCartOpen(true)}
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
          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white px-3 md:px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border dark:border-slate-700">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-[10px] text-white">
                  {user?.name.charAt(0)}
                </div>
                <span className="hidden md:inline truncate max-w-[100px]">{user?.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              <div className="absolute top-full right-0 mt-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl shadow-2xl py-2 hidden group-hover:block min-w-[160px] overflow-hidden">
                <div className="px-4 py-2 border-b dark:border-slate-700">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Signed in as</p>
                  <p className="text-xs font-bold dark:text-white truncate">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center gap-2 font-bold"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-slate-800 dark:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition-all"
            >
              <User className="w-4 h-4" />
              {t.signIn}
            </button>
          )}
        </div>
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </nav>
  );
};

export default Navbar;
