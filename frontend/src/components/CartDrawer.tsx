// src/components/CartDrawer.tsx
import { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { X } from "lucide-react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

type Props = {
  onClose: () => void;
  onCheckout: (preferenceId: string) => void;
};

export default function CartDrawer({ onClose, onCheckout }: Props) {
  const {
    items,
    cartTotal,
    isEmpty,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initMercadoPago("TEST-b197fe20-8757-4ad6-b9cf-da81d499fbd5", { locale: "es-UY" });
  }, []);

  const crearPreferencia = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/create_preference/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            title: item.name,
            quantity: item.quantity,
            unit_price: item.price,
          })),
        }),
      });

      const data = await res.json();
      if (data.preferenceId) {
        setPreferenceId(data.preferenceId);
      } else {
        console.error("Preferencia inválida:", data);
      }
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-[60] flex">
      <div onClick={onClose} className="flex-1 bg-black/40" />

      <aside className="w-full max-w-md bg-white shadow-lg p-6 flex flex-col">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Tu carrito</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </header>

        {isEmpty ? (
          <p className="text-gray-500">El carrito está vacío.</p>
        ) : (
          <>
            <ul className="space-y-5 flex-1 overflow-auto">
              {items.map((item) => (
                <li key={item.id} className="flex items-start gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 border rounded object-cover"
                  />
                  <div className="flex-1">
                    <p>{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2 border rounded"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t pt-4 flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="mt-4 space-y-2">
              <button
                onClick={crearPreferencia}
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Generando..." : "Generar pago"}
              </button>

              {preferenceId && (
                <>
                  <Wallet initialization={{ preferenceId }} />
                  
                </>
              )}

              <button
                onClick={emptyCart}
                className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
