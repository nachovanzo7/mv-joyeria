import type { Producto } from "@/types/product.types";
import { Button } from "@/components/ui/button";
import { useCart } from "react-use-cart";
import { useCallback } from "react";
import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard"; // asumiendo que lo tenés

function capitalize(text: string) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}

export default function Detail({ producto }: { producto: Producto }) {
  const { addItem, inCart, removeItem } = useCart();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleBack = () => {
    router.navigate({ to: "/market" });
  };

  const handleToggleCarrito = useCallback(() => {
    if (inCart(producto.id)) {
      removeItem(producto.id);
    } else {
      addItem({
        ...producto,
        id: producto.id,
        name: producto.nombre,
        price: parseFloat(producto.precio),
        image: producto.imagen,
      });
    }
  }, [addItem, removeItem, inCart, producto]);

  // Obtener productos del cache
  const productosCache: Producto[] =
    queryClient.getQueryData(["productos"]) || [];

  // Filtrar para no mostrar el producto actual
  const productosRelacionados = productosCache
    .filter((p) => p.id !== producto.id)
    .slice(0, 4); // máximo 4

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        onClick={handleBack}
        variant="ghost"
        className="mb-8 text-amber-900 hover:bg-amber-50"
      >
        ← Volver a la tienda
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 mb-20">
        <div className="flex justify-center">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="max-w-xl aspect-square object-contain"
          />
        </div>

        <div>
          <h1 className="text-3xl text-amber-900 mb-6">{producto.nombre}</h1>
          <span className="text-2xl block mb-6">UYU {producto.precio}</span>

          {producto.disponible && (
            <Button
              onClick={handleToggleCarrito}
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

          <p className="text-amber-900 mt-10 whitespace-pre-line">
            <strong className="text-[20px]">Descripción: </strong>{" "}
            {capitalize(producto.descripcion)}
          </p>
          <hr />
          <div className="mt-10 text-amber-900">
            <h3 className="font-semibold mb-2 text-[20px]">Características</h3>
            <p>
              <strong>Material: </strong> {capitalize(producto.material.tipo)}
            </p>
            <p>
              <strong>Categoría: </strong>{" "}
              {producto.categorias
                .map((cat) => capitalize(cat.nombre))
                .join(", ")}{" "}
            </p>
          </div>
        </div>
      </div>

      <hr />

      {/* ---------- Productos relacionados ---------- */}
      {productosRelacionados.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-semibold text-amber-900 mb-8">
            Productos que quizás te interesen
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {productosRelacionados.map((prod) => (
              <ProductCard
                key={prod.id}
                producto={prod}
                onComprar={() =>
                  router.navigate({
                    to: "/market/$productId",
                    params: { productId: prod.id },
                  })
                }
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
