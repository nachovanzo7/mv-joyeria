// components/market/ProductGrid.tsx
import { useMemo, useCallback } from 'react';
import ProductCard from "@/components/ProductCard";
import { Producto } from '@/types/product.types';

interface ProductGridProps {
  productos: Producto[];
  onComprar: (producto: Producto) => void;
  onAgregarCarrito: (producto: Producto) => void;
  onImageError: (productId: number) => void;
}

export function ProductGrid({ 
  productos, 
  onComprar, 
  onAgregarCarrito, 
  onImageError 
}: ProductGridProps) {
  const productosDisponibles = useMemo(() => 
    productos.filter(producto => producto.disponible), 
    [productos]
  );

  const productosNoDisponibles = useMemo(() => 
    productos.filter(producto => !producto.disponible), 
    [productos]
  );

  const renderProductCard = useCallback((producto: Producto, index: number) => (
    <div key={producto.id} className="h-full">
      <ProductCard
        producto={producto}
        onComprar={onComprar}
        onAgregarCarrito={onAgregarCarrito}
        onImageError={onImageError}
        priority={index < 4}
        loading={index < 8 ? "eager" : "lazy"}
      />
    </div>
  ), [onComprar, onAgregarCarrito, onImageError]);

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tienda</h1>
            <p className="text-gray-600">
              {productos.length} productos encontrados 
              ({productosDisponibles.length} disponibles)
            </p>
          </div>
        </div>
      </div>

      {/* Available Products */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {productosDisponibles.map((producto, index) => 
          renderProductCard(producto, index)
        )}
      </section>

      {/* Unavailable Products */}
      {productosNoDisponibles.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Productos no disponibles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 opacity-60">
            {productosNoDisponibles.map((producto, index) => 
              renderProductCard(producto, index + productosDisponibles.length)
            )}
          </div>
        </div>
      )}
    </>
  );
}