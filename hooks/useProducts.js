import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, getCategories, getRelatedProducts, getProductById } from "../lib/api";

export const useProducts = (page = 1, category = 'all') => {
  return useQuery({
    queryKey: ['products', { page, category }],
    queryFn: () => getProducts({ page, category  }),
    keepPreviousData: true, // mantiene datos mientras carga otra pagina
  })
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 24 * 60 * 60 * 1000,
  }
  )
}

export const useProduct = (id) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    onSuccess: (data) => {
      queryClient.prefetchQuery({
        queryKey: ['relatedProducts', data.category, id],
        queryFn: () => getRelatedProducts(data.category, id)
      })
    }
  })
}

export const usePrefetchProduct = (id) => {
  const queryClient = useQueryClient();
  const prefetch = () => {
    if (id) {
      queryClient.prefetchQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(id)
      })
    }
  }
  return { prefetch }
}

export function useRelatedProducts(category, productId) {
  return useQuery({
    queryKey: ['relatedProducts', category, productId],
    queryFn: () => getRelatedProducts(category, productId),
    enabled: !!category, 
    staleTime: 5 * 60 * 1000 
  });
}

