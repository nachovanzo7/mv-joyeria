import { Button } from './ui/button.tsx'
import Logo from '../assets/Logo.svg'
import Cart from '../assets/Cart.svg'

export default function Navbar() {
    return (
        <div className="relative flex items-center justify-center h-16 w-full">
            <div className="absolute left-4">
                <img src={Logo} alt="MVLogo" className="h-12" />
            </div>

            {/* Botones */}
            <div className="flex space-x-2">
                <Button variant={'outlined'} className="hover:border-2 hover:border-amber-950">
                    <a href="/about">Nosotros</a>
                </Button>

                <Button variant={'outlined'} className="hover:border-2 hover:border-amber-950">
                    <a href="/">Tienda</a>
                </Button>

                <Button variant={'outlined'} className="hover:border-2 hover:border-amber-950">
                    <a href="/contacto">Contacto</a>
                </Button>
            </div>

            <a href="" className='absolute right-4'>
                <div className='hover:border-amber-950 hover:bg-gray-100 border-2 rounded-full p-2'>
                
                        <img src={Cart} alt="MVLogo" className="h-9" />
                    
                </div>
            </a>
        </div>
    );
}
