'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import Cart from './Cart';

const CartContainer: React.FC = () => {
  const { isCartOpen, setIsCartOpen } = useCart();

  return (
    <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
  );
};

export default CartContainer;
