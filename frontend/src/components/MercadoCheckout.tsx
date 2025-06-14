import { useEffect, useRef, useState, createElement as h } from "react";

declare global {
  interface Window {
    MercadoPago?: any;
  }
}

type Props = {
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
};

// Singleton para cargar script MercadoPago solo una vez
let mercadoPagoScriptLoading: Promise<void> | null = null;

function loadMercadoPagoScript() {
  if (mercadoPagoScriptLoading) return mercadoPagoScriptLoading;

  mercadoPagoScriptLoading = new Promise((resolve, reject) => {
    if (window.MercadoPago) {
      console.log("MercadoPago SDK ya cargado");
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;

    script.onload = () => {
      console.log("MercadoPago SDK cargado");
      resolve();
    };

    script.onerror = () => {
      console.error("Error cargando SDK de MercadoPago");
      reject(new Error("Error loading MercadoPago SDK"));
    };

    document.body.appendChild(script);
  });

  return mercadoPagoScriptLoading;
}

export default function MercadoPagoCheckout({ amount, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(true);
  const bricksController = useRef<any>(null);

  useEffect(() => {
    if (amount <= 0) {
      console.error("El monto debe ser mayor que 0");
      setLoading(false);
      return;
    }

    let isMounted = true;

    loadMercadoPagoScript()
      .then(() => {
        if (!isMounted) return;
        if (!window.MercadoPago) {
          console.error("MercadoPago no disponible después de cargar el script");
          setLoading(false);
          return;
        }

        const mp = new window.MercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, {
          locale: "es-UY",
        });
        const bricksBuilder = mp.bricks();

        // Limpia el contenedor antes de crear el brick
        const container = document.getElementById("mp_brick_container");
        if (container) container.innerHTML = "";

        bricksBuilder
          .create("cardPayment", "mp_brick_container", {
            initialization: { amount },
            callbacks: {
              onReady: () => {
                if (isMounted) setLoading(false);
              },
              onSubmit: async (data: any) => {
                setLoading(true);
                try {
                  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/process_payment/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });
                  const res = await response.json();
                  setLoading(false);

                  if (res.payment) {
                    alert("Pago aprobado 🎉");
                    onSuccess();
                  } else {
                    alert("Pago rechazado");
                  }
                } catch (error) {
                  setLoading(false);
                  alert("Error procesando pago");
                }
              },
              onError: (e: any) => {
                setLoading(false);
                console.error("Brick error:", e);
              },
            },
          })
          .then((controller: any) => {
            bricksController.current = controller;
          })
          .catch((e: any) => {
            console.error("Error creando brick:", e);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error cargando SDK de MercadoPago:", error);
        setLoading(false);
      });

    return () => {
      isMounted = false;
      if (bricksController.current?.destroy) {
        bricksController.current.destroy();
        bricksController.current = null;
      }
      const container = document.getElementById("mp_brick_container");
      if (container) container.innerHTML = "";
    };
  }, [amount, onSuccess]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
          ✕
        </button>
        {loading && <p className="mb-4">Cargando formulario de pago…</p>}
        <div id="mp_brick_container" />
      </div>
    </div>
  );
}
