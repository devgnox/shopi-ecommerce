'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCart, updateCart } from '../lib/api';
import { useState, useCallback, createContext, useContext } from 'react';
import { useOrders } from './useUser';
import { useAuth } from './useAuth';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() =>{setIsCartOpen(prev => !prev)}, []);

  const cartQuery = useCart();
  const cartMutations = useCartMutations();
  const { orders, ...ordersMutations } = useOrders();
  const { isAuthenticated } = useAuth();

  
  const value = {
    ...cartQuery,
    ...cartMutations,
    orders,
    ...(isAuthenticated ? ordersMutations : {}),
    isCartOpen,
    openCart,
    closeCart,
    toggleCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext debe ser usado dentro de un CartProvider');
  }
  return context;
}

export function useCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: Infinity, 
  });
}

export function useCartMutations() {
  const queryClient = useQueryClient();
  
  const addToCart = useMutation({
    mutationFn: async ({product, quantity, size, color}) => {
      const currentCart = await getCart();
      
      if(!color) color="blue";
      if(!size) size="S";
      if(!quantity) quantity=1;

      const variant=`${size}-${color}`;

      const existingItem = currentCart.products.find(item => item.id === product.id && item.variant==variant);
      
      let updatedProducts;

      if (existingItem) {
        updatedProducts = currentCart.products.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity  } 
            : item
        );
      } else {
        updatedProducts = [...currentCart.products, { ...product, quantity,size, color, variant }];
      }
      
      const total = updatedProducts.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );

      const taxes=total*0.22;
      
      const updatedCart = { products: updatedProducts, total, taxes, cartItems:updatedProducts.length };
      return updateCart(updatedCart);
    },
    onMutate: async ({product, quantity, size, color}) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      
      const previousCart = queryClient.getQueryData(['cart']);
      
      if(!color) color="blue";
      if(!size) size="S";
      if(!quantity) quantity=1;

      const variant=`${size}-${color}`;

      const existingItem = previousCart.products.find(item => item.id === product.id && item.variant==variant);
      
      let updatedProducts;
      if (existingItem) {
        updatedProducts = previousCart.products.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity, } 
            : item
        );
      } else {
        updatedProducts = [...previousCart.products, { ...product, quantity,size, color, variant }];
      }
      
      const total = updatedProducts.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );

      const taxes=total*0.22;
      
      queryClient.setQueryData(['cart'], { products: updatedProducts, total, taxes, cartItems:updatedProducts.length });
      
      return { previousCart };
    },
    onError: (err, newProduct, context) => {
      queryClient.setQueryData(['cart'], context.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
  
  const updateCartItem = useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const currentCart = await getCart();
      
      let updatedProducts;
      if (quantity <= 0) {
        updatedProducts = currentCart.products.filter(item => item.id !== productId);
      } else {
        updatedProducts = currentCart.products.map(item => 
          item.id === productId ? { ...item, quantity } : item
        );
      }

      const total = updatedProducts.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );

      const taxes=total*0.22;
      
      const updatedCart = { products: updatedProducts, total, taxes, cartItems:updatedProducts.length };
      return updateCart(updatedCart);
    },
    onMutate: async ({ productId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      
      const previousCart = queryClient.getQueryData(['cart']);
      
      let updatedProducts;
      if (quantity <= 0) {
        updatedProducts = previousCart.products.filter(item => item.id !== productId);
      } else {
        updatedProducts = previousCart.products.map(item => 
          item.id === productId ? { ...item, quantity } : item
        );
      }
      
      const total = updatedProducts.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );
      
      const taxes=total*0.22;

      queryClient.setQueryData(['cart'], { products: updatedProducts, total, taxes, cartItems:updatedProducts.length });
      
      return { previousCart };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['cart'], context.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
  
  const removeFromCart = useMutation({
    mutationFn: async (productId) => {
      const currentCart = await getCart();
      
      const updatedProducts = currentCart.products.filter(item => item.id !== productId);
      
      const total = updatedProducts.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );
      
      const taxes=total*0.22;

      const updatedCart = { products: updatedProducts, total, taxes, cartItems:updatedProducts.length };
      
      return updateCart(updatedCart);
    },
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      
      const previousCart = queryClient.getQueryData(['cart']);
      
      const updatedProducts = previousCart.products.filter(item => item.id !== productId);
      
      const total = updatedProducts.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );

      const taxes=total*0.22;
      
      queryClient.setQueryData(['cart'], { products: updatedProducts, total, taxes, cartItems:updatedProducts.length });
      
      return { previousCart };
    },
    onError: (err, productId, context) => {
      queryClient.setQueryData(['cart'], context.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
  
  const clearCart = useMutation({
    mutationFn: async () => {
      return updateCart({ products: [], total: 0, taxes:0,cartItems:0  });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      
      const previousCart = queryClient.getQueryData(['cart']);
      
      queryClient.setQueryData(['cart'], { products: [], total: 0, taxes:0, cartItems:0 });
      
      return { previousCart };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['cart'], context.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
  
  return { addToCart, updateCartItem, removeFromCart, clearCart };
}