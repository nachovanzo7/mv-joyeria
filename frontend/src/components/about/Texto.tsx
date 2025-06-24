type Texto1Props = {
  titulo: string;
  texto: string;          // o ReactNode si necesitás <strong> adentro
  imagen: string;
  left: boolean;
};

/* ---------- Texto ---------- */
export function Texto({ titulo, texto, imagen, left }: Texto1Props) {
  // Clases según alineación
  const titleAlign   = left ? 'text-left self-start' : 'text-right self-end';

  return (
    <div className="md:grid md:grid-cols-2 flex flex-col h-full">
      {/* Imagen */}
      <div className="flex justify-center items-center">
        <div className="max-w-3xl m-5 mt-0 mb-0">
          <img
            className="rounded-4xl border shadow-2xl shadow-black"
            src={imagen}
            alt="Marcelo Vanzo"
          />
        </div>
      </div>

      {/* Texto */}
      <div className="flex p-10 justify-center items-start flex-col">
        <h1 className={`md:text-4xl text-2xl pb-3.5 ${titleAlign} `}>
          <strong>{titulo}</strong>
        </h1>
        <p className="md:text-justify text-justify md:text-2xl  md:pr-32">
          {texto}
        </p>
      </div>
    </div>
  );
}

/* ---------- Texto2 ---------- */
export function Texto2({ titulo, texto, imagen, left }: Texto1Props) {
  // Igual que antes
  const titleAlign   = left ? 'text-left self-start' : 'text-right self-end';

  return (
    <div className="md:grid md:grid-cols-2 flex md:flex-col flex-col-reverse h-full">
      {/* Texto */}
      <div className="flex p-10 justify-center items-start flex-col">
        <h1 className={`md:text-4xl text-2xl pb-3.5 ${titleAlign} md:pr-32  `}>
          <strong>{titulo}</strong>
        </h1>
        <p className="md:text-justify  text-justify md:text-2xl  md:pr-32">
          {texto}
        </p>
      </div>

      {/* Imagen */}
      <div className="max-w-3xl m-5 mt-0 mb-0">
        <img
          className="rounded-4xl border shadow-2xl shadow-black"
          src={imagen}
          alt="Marcelo Vanzo"
        />
      </div>
    </div>
  );
}
