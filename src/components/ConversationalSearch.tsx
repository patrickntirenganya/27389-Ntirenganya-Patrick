'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, X, Send, Bot, User, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import productsData from '@/data/simba_products.json';
import { formatPrice, cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  products?: Product[];
}

export default function ConversationalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Simba's AI assistant. What are you looking for today? (e.g., 'I need fresh milk' or 'something for breakfast')" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // In a real app, this would call Groq API
      // Here we simulate the AI logic
      const products = productsData.products as Product[];
      
      // Simple keyword matching for demo
      const matchedProducts = products.filter(p => 
        userMessage.toLowerCase().split(' ').some(word => 
          word.length > 2 && (
            p.name.toLowerCase().includes(word) || 
            p.category.toLowerCase().includes(word) ||
            p.description?.toLowerCase().includes(word)
          )
        )
      ).slice(0, 3);

      setTimeout(() => {
        let response = "";
        if (matchedProducts.length > 0) {
          response = `I found some ${matchedProducts[0].category.toLowerCase()} items that might match what you're looking for:`;
        } else {
          response = "I couldn't find exactly that, but here are some popular items at Simba right now!";
          matchedProducts.push(...products.slice(0, 2));
        }

        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: response,
          products: matchedProducts
        }]);
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      toast.error("Failed to search. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 lg:bottom-10 lg:right-10 z-[60] bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:bg-orange-500 transition-all group active:scale-95"
      >
        <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
        <span className="absolute -top-2 -left-2 bg-orange-500 text-[10px] font-black px-2 py-1 rounded-full animate-bounce">AI</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 100 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[80vh] sm:h-[600px]"
            >
              {/* Header */}
              <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black dark:text-white leading-none">Simba AI Assistant</h3>
                    <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mt-1">Online & Ready</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Chat Content */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
                {messages.map((m, i) => (
                  <div key={i} className={cn("flex flex-col", m.role === 'user' ? "items-end" : "items-start")}>
                    <div className={cn(
                      "max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm",
                      m.role === 'user' 
                        ? "bg-slate-900 text-white rounded-tr-none" 
                        : "bg-slate-100 dark:bg-slate-700 dark:text-white rounded-tl-none"
                    )}>
                      {m.content}
                    </div>
                    
                    {m.products && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 w-full">
                        {m.products.map(p => (
                          <div key={p.id} className="bg-white dark:bg-slate-900 border dark:border-slate-700 p-3 rounded-2xl flex gap-3 group">
                            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden flex-shrink-0">
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold dark:text-white truncate">{p.name}</p>
                              <p className="text-[10px] text-orange-500 font-black mt-1">{formatPrice(p.price)}</p>
                              <button 
                                onClick={() => addToCart(p)}
                                className="mt-2 text-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-orange-500 hover:text-white px-3 py-1.5 rounded-lg font-black transition-all flex items-center gap-1"
                              >
                                <ShoppingCart className="w-3 h-3" />
                                Add
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-slate-400 italic text-xs">
                    <Bot className="w-4 h-4 animate-bounce" />
                    Simba is thinking...
                  </div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSearch} className="p-6 border-t dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                <div className="relative">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl py-4 pl-6 pr-14 outline-none focus:ring-2 focus:ring-orange-500 transition-all dark:text-white shadow-inner font-medium"
                  />
                  <button 
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900 dark:bg-orange-500 text-white p-3 rounded-xl hover:bg-orange-500 transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
