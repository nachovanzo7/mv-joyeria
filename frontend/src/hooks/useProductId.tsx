// hooks/useProductById.ts
import { useQuery } from '@tanstack/react-query'
import { fetchProductoById } from '@/services/api'
import type { Producto } from '@/types/product.types'

export function useProductById(id: string | number) {
  return useQuery<Producto>({
    queryKey: ['producto', id],
    queryFn: () => fetchProductoById(id),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
