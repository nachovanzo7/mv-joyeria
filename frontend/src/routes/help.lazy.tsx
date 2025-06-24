import { createLazyFileRoute } from "@tanstack/react-router";
import Steps from "@/assets/pasos.webp";
import { CheckCircle, CircleAlert } from "lucide-react";

export const Route = createLazyFileRoute("/help")({
  component: RouteComponent,
});

function RouteComponent() {
  const pasos = [
    {
      titulo: "Paso 1:",
      descripcion: "Dirigirse a la tienda",
      icono: "1",
    },
    {
      titulo: "Paso 2:",
      descripcion: "Añadir al carrito los productos que desea comprar",
      icono: "2",
    },
    {
      titulo: "Paso 3:",
      descripcion: 'Clickear en "Generar pago" y esperar que se genere el botón de Mercado Pago',
      icono: "3",
    },
    {
      titulo: "Paso 4:",
      descripcion: "Seleccionar tu preferencia de pago",
      icono: "4",
    },
    {
      titulo: "Paso 5:",
      descripcion: "Completar los datos solicitados",
      icono: "5",
    },
    {
      titulo: "¡Compra Finalizada!",
      descripcion: "Recibirás la confirmación de tu pedido por email",
      icono: <CheckCircle className="text-green-500" />,
    },
    {
      titulo: "¡Importante!",
      descripcion: "Para coordinar el retiro comuníquese al +598 98 001 235",
      icono: <CircleAlert className="text-red-500" />,
    },
  ];

  return (
    <div className="min-h-screen ">
      <div className="w-full h-min-[500px] border-t-2 border-b-2 mt-10 mb-10">
        <img 
          src={Steps} 
          alt="Tienda" 
          className="w-full object-cover"
        />
      </div>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-amber-900 mb-10">
          Guía de Compra
        </h1>
        

        <div className="space-y-6">
          {pasos.map((paso, index) => (
            <div 
              key={index}
              className="flex items-start bg-white p-6 rounded-xl shadow-md border-l-4 border-amber-900 hover:shadow-lg transition-all"
            >
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-amber-900 font-bold text-xl">
                  {paso.icono}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-amber-900 flex items-center">
                  {paso.titulo}
                </h2>
                <p className="mt-2 text-gray-700 text-lg">{paso.descripcion}</p>
              </div>
            </div>
          ))}
        </div>

    
      </div>
    </div>
  );
}