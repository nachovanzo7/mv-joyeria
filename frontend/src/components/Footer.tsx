import instagram from '../assets/instagram.svg'
import metodopagos from '../assets/pagosconmercadopago.svg'

export default function Footer() {
    return (
        <footer id="site-footer" className="absolute grid grid-cols-3 w-screen border-t-1 border-black md:text-[21px] text-[16px] md:text-left text-center h-auto pt-10 pb-10">
            <div className="md:pl-8 pl-4 flex-col md:text-center justify-items-center">
                <h3 className="mb-5"><strong>Metodos de pago</strong></h3>
                <img src={metodopagos} alt="" className='max-w-3xs'/>
            </div>
            <div className="md:pl-8 pl-4 md:text-center justify-items-center">
                <h3 className="mb-5"><strong>Redes sociales</strong></h3>
                <div className='flex items-center'>
                <a href='https://www.instagram.com/marcelo.vanzo.7/' target='_blank' className="flex items-center">
                <img src={instagram} alt="Instagram" className='w-11'/>
                <p><strong>@marcelo.vanzo.7</strong></p>
                </a>
                </div>
            </div>
            <div className="md:pl-8 pl-4 flex-col md:text-center justify-items-center">
                <h3 className="mb-5"><strong>Contacto</strong></h3>
                <p>+598 98 001 235</p>
            </div>
        </footer>
    )
}