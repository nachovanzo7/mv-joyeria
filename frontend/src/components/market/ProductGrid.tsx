import { useMemo, useCallback, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Producto } from "@/types/product.types";
import { Button } from "../ui/button";

interface ProductGridProps {
  productos: Producto[];
  onComprar: (producto: Producto) => void;
  onAgregarCarrito: (producto: Producto) => void;
  onImageError: (productId: number) => void;
  /** Handler opcional que se ejecuta al hacer hover sobre la tarjeta */
  onHover?: (productId: number) => void;
}

export function ProductGrid({
  productos,
  onComprar,
  onAgregarCarrito,
  onImageError,
  onHover,
}: ProductGridProps) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<string>("");

  /* ---------- CÁLCULO DE CATEGORÍAS Y FILTROS ---------- */
  const categorias = useMemo(() => {
    const todasCategorias = productos.flatMap((p) =>
      p.categorias.map((c) => c.nombre)
    );
    return Array.from(new Set(todasCategorias));
  }, [productos]);

  const productosFiltrados = useMemo(() => {
    if (!categoriaSeleccionada) return productos;
    return productos.filter((producto) =>
      producto.categorias.some((cat) => cat.nombre === categoriaSeleccionada)
    );
  }, [productos, categoriaSeleccionada]);

  const productosDisponibles = useMemo(
    () => productosFiltrados.filter((producto) => producto.disponible),
    [productosFiltrados]
  );

  const productosNoDisponibles = useMemo(
    () => productosFiltrados.filter((producto) => !producto.disponible),
    [productosFiltrados]
  );

  /* ---------- RENDER DE TARJETAS ---------- */
  const renderProductCard = useCallback(
    (producto: Producto, index: number) => (
      <div key={producto.id} className="h-full">
        <ProductCard
          producto={producto}
          onComprar={onComprar}
          onAgregarCarrito={onAgregarCarrito}
          onImageError={onImageError}
          priority={index < 4}
          loading={index < 8 ? "eager" : "lazy"}
          onMouseEnter={() => onHover?.(producto.id)}
        />
      </div>
    ),
    [onComprar, onAgregarCarrito, onImageError, onHover]
  );

  /* ---------- MAPA PARA MOSTRAR NOMBRES HUMANOS ---------- */
  const txtCategorias: Record<string, string> = {
    arete: "Arete",
    colgante: "Colgante",
    pulsera: "Pulsera",
    anillo: "Anillo",
  };

  /* ---------- UI ---------- */
  return (
    <>
      <div>

      </div>

      {/* CABECERA Y FILTROS */}
      <div className="flex mb-8 mt-6 flex-col items-center text-center">

        {/* Botones de categoría */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            onClick={() => setCategoriaSeleccionada("")}
            className={`px-4 py-2 font-medium transition-colors rounded-full ${
              categoriaSeleccionada === ""
                ? "bg-amber-900 hover:text-black text-white hover:bg-white"
                : "bg-gray-200 hover:bg-white text-black"
            }`}
          >
            Todas
          </Button>

          {categorias.map((categoria) => {
            const texto = txtCategorias[categoria.toLowerCase()];
            return (
              <Button
                key={categoria}
                onClick={() => setCategoriaSeleccionada(categoria)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
                  categoriaSeleccionada === categoria
                    ? "bg-amber-900 hover:text-black text-white hover:bg-white"
                    : "bg-gray-200 hover:bg-white text-black"
                }`}
              >
                {texto ?? categoria}
              </Button>
            );
          })}

          
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <p className="text-gray-600">
              {productosFiltrados.length} productos encontrados (
              {productosDisponibles.length} disponibles)
            </p>
          </div>
        </div>
      </div>

      {/* PRODUCTOS DISPONIBLES */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {productosDisponibles.map((producto, index) =>
          renderProductCard(producto, index)
        )}
      </section>

      {/* PRODUCTOS NO DISPONIBLES (atenuados) */}
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

      {/* VACÍO */}
      {productosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No se encontraron productos
          </h3>
          <p className="text-gray-600">
            Intenta con otra categoría o vuelve más tarde
          </p>
          <button
            onClick={() => setCategoriaSeleccionada("")}
            className="mt-4 px-4 py-2 bg-amber-900 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Ver todas las categorías
          </button>
        </div>
      )}
    </>
  );
}
