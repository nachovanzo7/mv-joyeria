// src/components/Navbar.tsx
import { useEffect, useState, useRef } from 'react';
import { Button } from './ui/button';
import Logo from '../assets/logo_1.svg';
import Cart from '../assets/Cart.svg';
import CartDrawer from './CartDrawer';
import { useCart } from 'react-use-cart';

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mpModalOpen, setMpModalOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const { cartTotal } = useCart();

  const cartBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    const obs = new IntersectionObserver(
      ([pixel]) => setFooterVisible(pixel.isIntersecting),
      { threshold: 0 }
    ); //Toca un pixel en viewport

    obs.observe(footerEl); //Se le dice que observe el footer (si sale o entra de la pantalla)
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-28 md:h-20 bg-white shadow-md">
        <a href="/" className="absolute md:left-4 top-1">
          <img src={Logo} alt="MV Logo" className="md:h-20 h-16" />
        </a>

        <button
          onClick={() => setCartOpen(true)}
          className="absolute right-4 hidden md:inline hover:bg-gray-100 border-2 rounded-full p-2 z-40"
        >
          <img src={Cart} alt="Carrito" className="h-9" />
        </button>

        <div className="md:flex relative md:top-0 top-7 space-x-2">
          <Button variant="outline"><a href="/about">Nosotros</a></Button>
          <Button variant="outline"><a href="/market">Tienda</a></Button>
          <Button variant="outline"><a href="/help">Ayuda</a></Button>
        </div>

        <button
          ref={cartBtnRef}
          onClick={() => setCartOpen(true)}
          //*bottom-24 (~6rem) si el footer toca*
          className={`fixed right-4 z-50 bg-white border-2 rounded-full p-3 shadow-md md:hidden 
            transition-all duration-300 ease-out
            ${footerVisible ? 'bottom-24' : 'bottom-4'}`}
        >
          <img src={Cart} alt="Carrito" className="h-8 w-8" />
        </button>
      </div>

      {/*Para evitar la superposición del carrito con el footer*/}
      <div className="h-28 md:h-16" />

      {/* Drawer + Mercado Pago */}
      {cartOpen && (
        <CartDrawer
          onClose={() => setCartOpen(false)}
          onCheckout={() => {
            setCartOpen(false);
            setMpModalOpen(true);
          }}
        />
      )}
    </>
  );
}
