import React, { memo, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  imagen: string;
  disponible: boolean;
  categorias: { id: number; nombre: string; slug: string }[];
  material: { id: number; tipo: string };
};

interface ProductCardProps {
  producto: Producto;
  onComprar?: (producto: Producto) => void;
  onAgregarCarrito?: (producto: Producto) => void;
  onImageError?: (productId: number) => void;
  priority?: boolean;
  loading?: "eager" | "lazy";
}

const ProductCard = memo(({ 
  producto, 
  onComprar, 
  onAgregarCarrito, 
  onImageError,
  priority = false,
  loading = "lazy" 
}: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/placeholder-image.jpg'; // Imagen de fallback
    setImageError(true);
    onImageError?.(producto.id);
  }, [producto.id, onImageError]);

  const handleComprar = useCallback(() => {
    onComprar?.(producto);
  }, [producto, onComprar]);

  const handleAgregarCarrito = useCallback(() => {
    onAgregarCarrito?.(producto);
  }, [producto, onAgregarCarrito]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg group h-full flex flex-col">
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        {!imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            )}
            <img
              src={producto.imagen}
              alt={producto.nombre}
              loading={loading}
              decoding={priority ? "sync" : "async"}
              fetchPriority={priority ? "high" : "auto"}
              className={`w-full h-full object-contain transition-all duration-300 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              width="300"
              height="300"
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {!producto.disponible && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            No disponible
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 mb-4 line-clamp-2 min-h-[2.5rem]">
          {producto.nombre}
        </h3>

        {/* Precio */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-green-600">
            ${producto.precio}
          </span>
        </div>

        {/* Botones */}
        <div className="space-y-2 mt-auto">
          <Button
            onClick={handleComprar}
            disabled={!producto.disponible}
            className="w-full bg-amber-900 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {producto.disponible ? "Comprar ahora" : "No disponible"}
          </Button>
          
          {producto.disponible && (
            <Button
              onClick={handleAgregarCarrito}
              variant="outline"
              className="w-full border-amber-900 text-amber-900 hover:bg-amber-50"
            >
              Agregar al carrito
            </Button>
          )}
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
