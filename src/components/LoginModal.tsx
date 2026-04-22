'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, Mail, Key, Eye, EyeOff, Lock, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, googleLogin, forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isForgotMode, setIsForgotMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isForgotMode) {
        await forgotPassword(email);
        toast.success("Password reset link sent to your email!");
        setIsForgotMode(false);
      } else {
        await login(email, password);
        toast.success("Welcome back!");
        onClose();
      }
    } catch (error) {
      toast.error(isForgotMode ? "Failed to send reset link" : "Login failed. Check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await googleLogin();
      toast.success("Welcome back with Google!");
      onClose();
    } catch (error) {
      toast.error("Google login failed");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 md:p-10">
              <button 
                onClick={onClose}
                className="absolute right-6 top-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {isForgotMode ? <Mail className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
                </div>
                <h2 className="text-2xl font-black dark:text-white">
                  {isForgotMode ? "Reset Password" : "Welcome to Simba"}
                </h2>
                <p className="text-slate-500 text-sm font-medium mt-1">
                  {isForgotMode ? "Enter your email to receive a reset link" : "Sign in to continue your shopping"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl p-4 pl-12 outline-none focus:border-orange-500 transition-all dark:text-white text-sm" 
                      placeholder="your@email.com" 
                    />
                  </div>
                </div>

                {!isForgotMode && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                      <button 
                        type="button"
                        onClick={() => setIsForgotMode(true)}
                        className="text-[10px] font-black text-orange-500 uppercase tracking-widest hover:underline"
                      >
                        Forgot?
                      </button>
                    </div>
                    <div className="relative">
                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-2xl p-4 pl-12 pr-12 outline-none focus:border-orange-500 transition-all dark:text-white text-sm" 
                        placeholder="••••••••" 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-2xl font-black transition-all hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transform active:scale-[0.98] flex items-center justify-center gap-3 mt-4"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    isForgotMode ? "Send Reset Link" : "Continue"
                  )}
                </button>
              </form>

              {!isForgotMode && (
                <>
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-700"></div></div>
                    <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white dark:bg-slate-800 px-4">Or continue with</div>
                  </div>

                  <button 
                    onClick={handleGoogleLogin}
                    disabled={isGoogleLoading}
                    className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white py-4 rounded-2xl font-black transition-all hover:border-orange-500 transform active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    {isGoogleLoading ? (
                      <div className="w-5 h-5 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Globe className="w-5 h-5 text-red-500" />
                        Google
                      </>
                    )}
                  </button>
                </>
              )}

              {isForgotMode && (
                <button 
                  onClick={() => setIsForgotMode(false)}
                  className="w-full mt-6 text-sm font-bold text-slate-500 hover:text-orange-500 transition-colors"
                >
                  Back to Login
                </button>
              )}

              <div className="mt-8 text-center">
                <p className="text-xs text-slate-400 font-medium">
                  By signing in, you agree to our <br/> 
                  <span className="text-slate-900 dark:text-white cursor-pointer hover:underline">Terms of Service</span> and <span className="text-slate-900 dark:text-white cursor-pointer hover:underline">Privacy Policy</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
