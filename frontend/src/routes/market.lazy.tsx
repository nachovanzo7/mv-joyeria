// routes/market.lazy.tsx - Enhanced with cache strategies
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useCallback } from "react";
import { useProductData } from "@/hooks/useProductData";
import { LoadingState } from "@/components/market/LoadingState";  
import { ErrorState } from "@/components/market/ErrorState";
import { EmptyState } from "@/components/market/EmptyState";
import { ProductGrid } from "@/components/market/ProductGrid";
import { Producto, CacheStrategy } from "@/types/product.types";

export const Route = createLazyFileRoute("/market")({
  component: MarketPage,
});

function MarketPage() {
  const {
    productos,
    loading,
    error,
    isFromCache,
    isStale,
    lastUpdated,
    cargarProductos,
    refreshData,
    forceRefresh,
    clearCache,
    setImageErrors
  } = useProductData({
    strategy: CacheStrategy.ETAG, // Cambia según tus necesidades
    cacheDuration: 5 * 60 * 1000, // 5 minutos
    autoRefresh: true,
    refreshInterval: 60000 // 1 minuto
  });

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  const handleComprar = useCallback((producto: Producto) => {
    console.log("Comprar producto:", producto);
    // Después de una acción que modifica datos, podrías forzar refresh
    // setTimeout(() => forceRefresh(), 1000);
  }, []);

  const handleAgregarCarrito = useCallback((producto: Producto) => {
    console.log("Agregar al carrito:", producto);
  }, []);

  const handleImageError = useCallback((productId: number) => {
    setImageErrors(prev => new Set([...prev, productId]));
  }, [setImageErrors]);

  // Render loading state
  if (loading) {
    return <LoadingState isFromCache={isFromCache} />;
  }

  // Render error state
  if (error) {
    return (
      <ErrorState 
        error={error} 
        onRetry={refreshData} 
        onClearCache={clearCache}
        onForceRefresh={forceRefresh}
        isStale={isStale}
      />
    );
  }

  // Render empty state
  if (productos.length === 0) {
    return (
      <EmptyState 
        onRefresh={refreshData} 
        onClearCache={clearCache} 
        onForceRefresh={forceRefresh}
      />
    );
  }

  // Render main content
  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="container mx-auto px-4 py-8">
        <ProductGrid
          productos={productos}
          onComprar={handleComprar}
          onAgregarCarrito={handleAgregarCarrito}
          onImageError={handleImageError}
        />
      </div>
    </div>
  );
}