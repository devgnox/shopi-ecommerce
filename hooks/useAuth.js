'use client';
import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login, register } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser!=undefined && storedToken!=undefined) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);
  
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setUser(data.user);
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['user'], context.user);
    },
  });
  
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      loginMutation.mutate({
        username: "emilys",
        password: 'emilyspass'
      });
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['user'], context.user);
    },
  });
  
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);


  const value = {
    user,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    loginLoading: loginMutation.isPending,
    registerLoading: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe estar dentro de AuthProvider');
  }
  return context;
}