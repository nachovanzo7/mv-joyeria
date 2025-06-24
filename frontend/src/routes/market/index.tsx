// routes/market._layout.tsx
import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useProductData } from "@/hooks/useProductData";
import { LoadingState } from "@/components/market/LoadingState";
import { ErrorState } from "@/components/market/ErrorState";
import { EmptyState } from "@/components/market/EmptyState";
import { ProductGrid } from "@/components/market/ProductGrid";
import type { Producto } from "@/types/product.types";
import { ImagePreloader } from '@/utils/image-preloader';
import Tienda from '@/assets/tienda.webp'

export const Route = createFileRoute("/market/")({
  path: '',
  component: MarketPage,
})

function MarketPage() {
  const {
    data: productos = [],
    isLoading,
    isError,
    error,
    refetch,
    isStale,
  } = useProductData();

  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (productos.length > 0) {
      ImagePreloader.preloadCriticalImages(productos, 4);
    }
  }, [productos]);

  const handleComprar = useCallback((producto: Producto) => {
    console.log("Comprar producto:", producto);
  }, []);

  const handleAgregarCarrito = useCallback((producto: Producto) => {
    console.log("Agregar al carrito:", producto);
  }, []);

  const handleImageError = useCallback((productId: number) => {
    console.warn(`Error cargando imagen del producto ${productId}`);
  }, []);

  /*Me ayuda a precargar los datos al hacer hover*/
  const handleHover = useCallback((productId: number) => {
    router.load({
      to: "/market/$productoId",
      params: { productoId: productId.toString() },
    });
  }, [router]);

  if (isLoading) return <LoadingState isFromCache={false} />;

  if (isError)
    return (
      <ErrorState
        error={error?.message || "Error desconocido"}
        onRetry={refetch}
        onClearCache={() => queryClient.removeQueries(['productos'])}
        onForceRefresh={refetch}
        isStale={isStale}
      />
    );

  if (productos.length === 0)
    return (
      <EmptyState
        onRefresh={refetch}
        onClearCache={() => queryClient.removeQueries(['productos'])}
        onForceRefresh={refetch}
      />
    );

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="w-full h-min-[500px] border-t-2 border-b-2 mt-10 mb-10">
        <img 
          src={Tienda} 
          alt="Tienda" 
          className="w-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 py-8">
        <ProductGrid
          productos={productos}
          onComprar={handleComprar}
          onAgregarCarrito={handleAgregarCarrito}
          onImageError={handleImageError}
          onHover={handleHover}
        />
      </div>
    </div>
  );
}
