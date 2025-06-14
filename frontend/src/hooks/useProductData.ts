// hooks/useProductData.ts
import { useQuery } from '@tanstack/react-query';
import { fetchProductos } from '../services/api';
import type { Producto } from '@/types/product.types';

export function useProductData() {
  return useQuery<Producto[]>({
    queryKey: ['productos'],
    queryFn: fetchProductos,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
