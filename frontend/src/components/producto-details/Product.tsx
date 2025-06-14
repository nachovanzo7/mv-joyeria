import type { Producto } from "../../types/product.types";

export default function Detail({ producto }: { producto: Producto }) {
  return (
    <div className="grid  grid-rows-2 m-40 mt-20 [grid-template-columns:auto_1fr]">
      {/* First row, two separate columns */}
      <div className="">
          <div className="flex justify-center w-2xl aspect-square">
            <img src={producto.imagen} alt={producto.nombre} />
          </div>
          <div>

          </div>
      </div>

      <div className="pl-16 rounded">
        <h1 className="text-3xl text-amber-900 pt-10 pb-10">{producto.nombre}</h1>
        <span className="text-2xl">${producto.precio}</span>
      </div>

      {/* Second row, spans the full width (both columns) */}
      <div className="bg-slate-200 p-4 rounded col-span-2">
        Row 2 – spans both columns
      </div>
    </div>
  );
}
