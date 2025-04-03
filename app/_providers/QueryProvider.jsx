"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

const QueryProvider = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            cacheTime: 5 * 60 * 100, // 5minutos
            staleTime: 60 * 100, // 1minuto
            refetchOnWindowFocus: false,
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 3000),
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children} 
    </QueryClientProvider>
  );
};

export default QueryProvider;
