'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getCart, updateCart } from '../lib/api';

export function useFavorites() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const getFavorites = () => {
    if (typeof window === 'undefined') return [];

    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  };

  const saveFavorites = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return favorites;
  };

  const favoritesQuery = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    enabled: isAuthenticated,
    staleTime: Infinity,
  });

  const addToFavorites = useMutation({
    mutationFn: (product) => {
      const currentFavorites = getFavorites();
      if (!currentFavorites.some(fav => fav.id === product.id)) {
        const newFavorites = [...currentFavorites, product];
        return saveFavorites(newFavorites);
      }
      return currentFavorites;
    },
    onSuccess: (updatedFavorites) => {
      queryClient.setQueryData(['favorites'], updatedFavorites);
    },
  });

  const removeFromFavorites = useMutation({
    mutationFn: (productId) => {
      const currentFavorites = getFavorites();
      const newFavorites = currentFavorites.filter(product => product.id !== productId);
      return saveFavorites(newFavorites);
    },
    onSuccess: (updatedFavorites) => {
      queryClient.setQueryData(['favorites'], updatedFavorites);
    },
  });

  const isFavorite = (productId) => {
    const favorites = favoritesQuery.data || [];
    return favorites.some(product => product.id === productId);
  };

  return {
    favorites: favoritesQuery.data || [],
    isLoading: favoritesQuery.isLoading,
    error: favoritesQuery.error,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
}

export function useOrders() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const getOrders = () => {
    if (typeof window === 'undefined') return [];
    const storedOrders = localStorage.getItem('userOrders');
    return storedOrders ? JSON.parse(storedOrders) : [];
  };

  const saveOrders = (orders) => {
    localStorage.setItem('userOrders', JSON.stringify(orders));
    return orders;
  };

  const generateOrderNumber = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const prefix = letters.charAt(Math.floor(Math.random() * letters.length)) +
      letters.charAt(Math.floor(Math.random() * letters.length));
    const numbers = Math.floor(10000000 + Math.random() * 90000000);
    return `${prefix}${numbers}`;
  };

  const ordersQuery = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    enabled: isAuthenticated,
    staleTime: Infinity,
  });

  const createOrder = useMutation({
    mutationFn: async (deliveryDate = null) => {
      if (!isAuthenticated) {
        throw new Error('Must be authenticated to create an order');
      }

      const currentCart = await getCart();
      const currentOrders = getOrders();

      if (!currentCart.products || currentCart.products.length === 0) {
        throw new Error('Cannot create order with empty cart');
      }

      const newOrder = {
        id: Date.now().toString(),
        orderNumber: generateOrderNumber(),
        date: new Date().toISOString(),
        products: [...currentCart.products],
        totalAmount: currentCart.total || 0,
        subtotal: currentCart.total ? (currentCart.total - currentCart.taxes) : 0,
        taxes: currentCart.taxes || 0,
        deliveredDate: deliveryDate,
        totalItems: currentCart.products.length,
        status: 'pendiente'
      };

      const updatedOrders = [...currentOrders, newOrder];

      await updateCart({ products: [], total: 0, taxes: 0, cartItems: 0 });

      return saveOrders(updatedOrders);
    },
    onSuccess: (result) => {
      queryClient.setQueryData(['orders'], result);
      queryClient.setQueryData(['cart'], { products: [], total: 0, taxes: 0, cartItems: 0 });
    },
    onError: (err) => {
      console.error('Failed to create order:', err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ orderId, status, deliveredDate = null }) => {
      if (!isAuthenticated) {
        throw new Error('Must be authenticated to update an order');
      }

      const currentOrders = getOrders();

      const updatedOrders = currentOrders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            status,
            ...(deliveredDate && { deliveredDate }),
          };
        }
        return order;
      });

      return saveOrders(updatedOrders);
    },
    onSuccess: (result) => {
      queryClient.setQueryData(['orders'], result);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    }
  });

  const deleteOrder = useMutation({
    mutationFn: async (orderId) => {
      if (!isAuthenticated) {
        throw new Error('Must be authenticated to delete an order');
      }

      const currentOrders = getOrders();
      const updatedOrders = currentOrders.filter(order => order.id !== orderId);
      return saveOrders(updatedOrders);
    },
    onSuccess: (result) => {
      queryClient.setQueryData(['orders'], result);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    }
  });

  return {
    createOrder,
    updateOrderStatus,
    deleteOrder,
    orders: ordersQuery.data || [],
    isLoading: ordersQuery.isLoading,
    error: ordersQuery.error,
  };
}