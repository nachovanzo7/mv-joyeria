import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchProductoById } from '@/services/api'
import type { Producto } from '@/types/product.types'

export function useProductById(id: string | number) {
  const queryClient = useQueryClient()


  const productos = queryClient.getQueryData<Producto[]>(['productos'])
  const productoEnCache = productos?.find((p) => String(p.id) === String(id))

  return useQuery<Producto>({
    queryKey: ['producto', id],
    queryFn: async () => {
      if (productoEnCache) {
        return productoEnCache
      }
      return fetchProductoById(id)
    },
    initialData: productoEnCache,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

