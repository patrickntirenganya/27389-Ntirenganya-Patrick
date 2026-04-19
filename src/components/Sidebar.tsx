'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface SidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  const { t } = useLanguage();

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-2 custom-scroll">
      <h2 className="font-bold text-lg mb-4 text-slate-800 dark:text-white">{t.categories}</h2>
      <div className="space-y-1">
        <button 
          onClick={() => onSelectCategory(null)}
          className={cn(
            "w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 text-sm font-medium",
            selectedCategory === null 
              ? "bg-orange-500 text-white shadow-md shadow-orange-100" 
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
          )}
        >
          <span>{t.allProducts}</span>
          <ChevronRight className={cn("w-4 h-4 opacity-50", selectedCategory === null && "opacity-100")} />
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 text-sm font-medium",
              selectedCategory === category 
                ? "bg-orange-500 text-white shadow-md shadow-orange-100" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            )}
          >
            <span className="truncate">{category}</span>
            <ChevronRight className={cn("w-4 h-4 opacity-50", selectedCategory === category && "opacity-100")} />
          </button>
        ))}
      </div>

      <div className="mt-12 p-6 bg-slate-900 dark:bg-slate-800 rounded-2xl text-white relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="font-bold mb-2">Simba Rewards</h3>
          <p className="text-xs text-slate-300 mb-4">Earn points on every purchase and get exclusive discounts.</p>
          <button className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest hover:bg-orange-600 transition-colors">
            Join Now
          </button>
        </div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl group-hover:bg-orange-500/30 transition-all"></div>
      </div>
    </aside>
  );
};

export default Sidebar;
