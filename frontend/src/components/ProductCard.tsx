import React, { memo, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "react-use-cart";
import { useRouter } from "@tanstack/react-router";


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
  onImageError?: (productId: number) => void;
  priority?: boolean;
  loading?: "eager" | "lazy";
}

const ProductCard = memo(
  ({
    producto,
    onComprar,
    onImageError,
    priority = false,
    loading = "lazy",
  }: ProductCardProps) => {
    const { addItem, inCart, removeItem } = useCart();
    const router = useRouter();

    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = useCallback(() => setImageLoaded(true), []);

    const handleImageError = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
        setImageError(true);
        onImageError?.(producto.id);
      },
      [producto.id, onImageError]
    );

    const handleComprar = useCallback(() => onComprar?.(producto), [producto, onComprar]);

    const handleToggleCarrito = useCallback(() => {
      if (inCart(producto.id)) {
        removeItem(producto.id);
      } else {
        addItem({
          id: producto.id,
          name: producto.nombre,
          price: parseFloat(producto.precio),
          image: producto.imagen,
          ...producto,
        });
      }
    }, [addItem, removeItem, inCart, producto]);


    const handleHover = useCallback(() => {
      router.load({
        to: "/market/$productoId",
        params: { productoId: producto.id.toString() },
      });
    }, [router, producto.id]);

    const handleClick = useCallback(() => {
      router.navigate({
        to: "/market/$productoId",
        params: { productoId: producto.id.toString() },
      });
    }, [router, producto.id]);

    return (
      <div
        onClick={handleClick}
        onMouseEnter={handleHover}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleClick();
        }}
        className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg group h-full flex flex-col"
      >

        <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
          {!imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="animate-pulse w-16 h-16 bg-gray-300 rounded-full" />
                </div>
              )}
              <img
                src={producto.imagen}
                alt={producto.nombre}
                loading={loading}
                decoding={priority ? "sync" : "async"}
                fetchPriority={priority ? "high" : "auto"}
                className={`w-full h-full object-contain transition-all duration-300 group-hover:scale-105 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                width={300}
                height={300}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {!producto.disponible && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              No disponible
            </span>
          )}
        </div>


        <div className="p-4 flex-1 flex flex-col">
          <h3 className="flex font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem] justify-center">
            {producto.nombre}
          </h3>

          <div className="flex mb-4 justify-center">
            <span className="text-2xl font-bold text-black">
              ${producto.precio}
            </span>
          </div>

          <div className="space-y-2 mt-auto">
            {producto.disponible && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleCarrito();
                }}
                variant="outline"
                className={`w-full border-amber-900 text-amber-900 hover:bg-amber-50 disabled:opacity-60 ${
                  inCart(producto.id)
                    ? "hover:bg-red-400 bg-green-50"
                    : "hover:bg-amber-50"
                }`}
              >
                {inCart(producto.id)
                  ? "Quitar del carrito"
                  : "Agregar al carrito"}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default ProductCard;
