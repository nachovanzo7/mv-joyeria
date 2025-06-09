import { Button } from './ui/button.tsx'
import Logo from '../assets/Logo.svg'
import Cart from '../assets/Cart.svg'

export default function Navbar() {
    return (
        <div className="relative flex items-center justify-center md:h-16 w-full
        h-28">
            <div className="absolute md:left-4 top-1">
                <a href="">
                <img src={Logo} alt="MVLogo" className="h-12" />
                </a>
            </div>

            <a href="" className='absolute right-4 hidden md:inline'>
                <div className='hover:border-amber-950 hover:bg-gray-100 border-2 rounded-full p-2'>
                
                        <img src={Cart} alt="MVLogo" className="h-9" />
                    
                </div>
            </a>

            {/* Botones */}
            <div className="md:flex relative md:top-0 top-7 space-x-2 bottom-1">
                <Button variant={'outline'} className="hover:border-2 hover:border-amber-950">
                    <a href="/about">Nosotros</a>
                </Button>

                <Button variant={'outline'} className="hover:border-2 hover:border-amber-950">
                    <a href="/market">Tienda</a>
                </Button>

                <Button variant={'outline'} className="hover:border-2 hover:border-amber-950">
                    <a href="/contacto">Contacto</a>
                </Button>
            </div>

        </div>
    );
}
