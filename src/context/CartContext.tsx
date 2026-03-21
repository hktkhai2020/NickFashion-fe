// Cart Context - Shopping cart state management
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Cart, CartItem, AddToCartPayload } from '@/types';
import { cartService } from '@/services';
import { storage } from '@/utils/storage';

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  cartItems: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (data: AddToCartPayload) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const cartItems = cart?.items ?? [];
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart?.subtotal ?? 0;

  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await cartService.getCart();
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (data: AddToCartPayload) => {
    setIsLoading(true);
    try {
      const response = await cartService.addToCart(data);
      setCart(response.data);
      storage.set('cart', response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    setIsLoading(true);
    try {
      const response = await cartService.updateCartItem(itemId, quantity);
      setCart(response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    setIsLoading(true);
    try {
      const response = await cartService.removeFromCart(itemId);
      setCart(response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      await cartService.clearCart();
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshCart = async () => {
    await fetchCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        cartItems,
        itemCount,
        subtotal,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
