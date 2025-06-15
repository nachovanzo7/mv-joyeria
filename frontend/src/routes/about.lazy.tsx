import { createLazyFileRoute } from "@tanstack/react-router";
import Imagen from "../assets/foto.jpg";

export const Route = createLazyFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      {/*Texto de Inicio*/}
      <div className="flex flex-col md:h-96 h-60  justify-center items-center">
        <p className="text-amber-950 md:text-7xl text-3xl text-center pt-7 ">
          Cuidando lo afectivo ante todo
        </p>
        <br></br>
        <p className="text-amber-800 md:text-4xl text-2xl mt-1 text-center p-6 pt-0">
          Joyería artesanal con historia, oficio y corazón.
        </p>
      </div>

      {/*Contenido para el About*/}
      <div className="md:grid md:grid-cols-2 flex flex-col h-screen">
        <div className="flex justify-center items-center">
          <div className="max-w-3xl m-5 mt-0 mb-0">
            <img
              className="rounded-4xl border shadow-2xl shadow-black"
              src={Imagen}
              alt="Marcelo Vanzo"
            />
          </div>
        </div>

        <div className="flex p-10 justify-center items-left flex-col">
          <h1 className="flex md:text-4xl text-2xl pb-3.5 md:justify-start justify-center">
            <strong>¿Quién soy?</strong>
          </h1>
          <p className="md:text-left text-justify md:text-2xl  md:pr-32">
            Soy Marcelo Vanzo. Desde hace más de 30 años, trabajo cada pieza
            como un legado. En nuestro taller, la joyería no es solo orfebrería:
            es arte, vínculo y emoción. Cada anillo, collar o diseño a medida
            nace del encuentro entre lo que el cliente imagina y lo que nuestras
            manos transforman en símbolo. Creemos que las joyas deben hablar de
            lo que importa: un amor, un recuerdo, un gesto. Por eso, cuidamos
            cada detalle con la sensibilidad de quien sabe que lo más valioso no
            es el metal, sino el significado que lleva dentro.
          </p>
          


        </div>
      </div>
    </div>
  );
}
