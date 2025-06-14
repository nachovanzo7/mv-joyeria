// src/components/Navbar.tsx
import { useState } from "react";
import { Button } from "./ui/button";
import Logo from "../assets/Logo.svg";
import Cart from "../assets/Cart.svg";
import CartDrawer from "./CartDrawer";
import { useCart } from "react-use-cart";
import MercadoPagoCheckout from "./MercadoCheckout";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mpModalOpen, setMpModalOpen] = useState(false);
  const { cartTotal } = useCart();

  return (
    <>
      {/* barra */}
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-28 md:h-16 bg-white shadow-md">
        <a href="/" className="absolute md:left-4 top-1">
          <img src={Logo} alt="MV Logo" className="h-12" />
        </a>

        <button
          onClick={() => setCartOpen(true)}
          className="absolute right-4 hidden md:inline hover:border-amber-950 hover:bg-gray-100 border-2 rounded-full p-2"
        >
          <img src={Cart} alt="Carrito" className="h-9" />
        </button>

        <div className="md:flex relative md:top-0 top-7 space-x-2">
          <Button variant="outline"><a href="/about">Nosotros</a></Button>
          <Button variant="outline"><a href="/market">Tienda</a></Button>
          <Button variant="outline"><a href="/contacto">Contacto</a></Button>
        </div>
      </div>

      <div className="h-28 md:h-16" />

      {cartOpen && (
        <CartDrawer
          onClose={() => setCartOpen(false)}
          onCheckout={() => {
            setCartOpen(false);
            setMpModalOpen(true);
          }}
        />
      )}

      {mpModalOpen && (
        <MercadoPagoCheckout
          amount={cartTotal}
          onClose={() => setMpModalOpen(false)}
          onSuccess={() => {
            setMpModalOpen(false);
            alert("¡Gracias por tu compra!");
          }}
        />
      )}
    </>
  );
}
