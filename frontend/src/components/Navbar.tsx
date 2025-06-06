import { Button } from './ui/button.tsx'

export default function Navbar() {
    return (
        <div>
            <Button variant={'outlined'} className="hover:border-2 hover:border-amber-950 mr-1">
                <a href="/about">Nosotros</a>
            </Button>

            <Button variant={'outlined'} className="hover:border-2 hover:border-amber-950">
                <a href="/">Tienda</a>
            </Button>

            <Button variant={'outlined'} className="hover:border-2 hover:border-amber-950 ml-1">
                <a href='/contacto'>Contacto</a>
            </Button>
        </div>
    );
}