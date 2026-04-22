'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import { 
    ChevronRight, LayoutGrid, Utensils, Beer, Sparkles, Laptop, 
    Baby, Home, ShoppingBag, Pizza 
} from 'lucide-react';

interface SidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const getCategoryIcon = (category: string) => {
    switch (category) {
        case 'Fresh Food': return <Pizza className="w-4 h-4" />;
        case 'Food Cupboard': return <Utensils className="w-4 h-4" />;
        case 'Beverages': return <Beer className="w-4 h-4" />;
        case 'Baby Products': return <Baby className="w-4 h-4" />;
        case 'Health & Beauty': return <Sparkles className="w-4 h-4" />;
        case 'Household & Cleaning': return <Home className="w-4 h-4" />;
        case 'Electronics & Kitchenware': return <Laptop className="w-4 h-4" />;
        default: return <ShoppingBag className="w-4 h-4" />;
    }
};

const Sidebar: React.FC<SidebarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  const { t, translateProduct } = useLanguage();

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-4 custom-scroll">
      <h2 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-slate-400 dark:text-slate-500">{t.categories}</h2>
      <div className="space-y-1.5">
        <button 
          onClick={() => onSelectCategory(null)}
          className={cn(
            "w-full flex items-center justify-between p-3 rounded-2xl transition-all duration-300 text-sm font-bold group",
            selectedCategory === null 
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl shadow-slate-200 dark:shadow-none" 
              : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm"
          )}
        >
          <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-xl transition-colors", selectedCategory === null ? "bg-white/10" : "bg-slate-100 dark:bg-slate-800 group-hover:bg-orange-500 group-hover:text-white")}>
                <LayoutGrid className="w-4 h-4" />
              </div>
              <span>{t.allProducts}</span>
          </div>
          <ChevronRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", selectedCategory === null ? "opacity-100" : "opacity-0")} />
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "w-full flex items-center justify-between p-3 rounded-2xl transition-all duration-300 text-sm font-bold group",
              selectedCategory === category 
                ? "bg-orange-500 text-white shadow-xl shadow-orange-500/20" 
                : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm"
            )}
          >
            <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-xl transition-colors", selectedCategory === category ? "bg-white/10" : "bg-slate-100 dark:bg-slate-800 group-hover:bg-orange-500 group-hover:text-white")}>
                    {getCategoryIcon(category)}
                </div>
                <span className="truncate max-w-[120px]">
                    {translateProduct(category)}
                </span>
            </div>
            <ChevronRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", selectedCategory === category ? "opacity-100" : "opacity-0")} />
          </button>
        ))}
      </div>

      <div className="mt-12 p-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-[2.5rem] text-white relative overflow-hidden group shadow-xl shadow-orange-500/20">
        <div className="relative z-10">
          <h3 className="text-xl font-black mb-2 leading-tight">Simba <br/>Rewards</h3>
          <p className="text-orange-100 text-[10px] font-bold uppercase tracking-wider mb-6">Earn points on every order</p>
          <button className="bg-white text-orange-600 text-[10px] font-black px-4 py-2.5 rounded-xl uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all transform active:scale-95 shadow-lg">
            Join Program
          </button>
        </div>
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute top-4 right-4 w-12 h-12 bg-white/5 rounded-lg rotate-12 border border-white/10"></div>
      </div>
    </aside>
  );
};

export default Sidebar;
