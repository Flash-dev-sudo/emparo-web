import { useState, useEffect } from 'react';
import { CartItem } from '@/types/menu';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('emparoCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('emparoCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    console.log('useCart: Adding item to cart', item);
    setCart(prevCart => {
      console.log('useCart: Current cart before adding:', prevCart);
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        console.log('useCart: Item exists, updating quantity');
        const newCart = prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        console.log('useCart: New cart after update:', newCart);
        return newCart;
      } else {
        console.log('useCart: Adding new item to cart');
        const newCart = [...prevCart, { ...item, quantity: 1 }];
        console.log('useCart: New cart after adding:', newCart);
        return newCart;
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };
}
