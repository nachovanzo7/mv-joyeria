import { createLazyFileRoute } from "@tanstack/react-router";
import Imagen from "../assets/foto.jpg";
import Corona from "../assets/corona.webp";
import Inicio from '@/assets/inicio.webp';
import Conocernos from '@/assets/conocernos.webp';
import { Texto, Texto2 } from '@/components/about/Texto'; // Importamos los componentes

export const Route = createLazyFileRoute("/about")({
  component: AboutPage,
});

const texto1 = (
  <>
    Soy <strong>Marcelo Vanzo</strong>. Desde hace más de <strong>30 años</strong>, trabajo cada pieza como un legado. En nuestro taller, la joyería no es solo orfebrería: <strong>es arte, vínculo y emoción</strong>. Cada anillo, collar o diseño a medida nace del encuentro entre lo que el cliente imagina y lo que nuestras manos transforman en símbolo. Creemos que las joyas deben hablar de lo que importa: <strong>un amor, un recuerdo, un gesto</strong>. Por eso, cuidamos cada detalle con la sensibilidad de quien sabe que lo más valioso no es el metal, sino el significado que lleva dentro.
  </>
);
const texto2 = (
  <>
    Mi vínculo con la <strong>joyería</strong> comenzó a los <strong>17 años</strong>, en <strong>1984</strong>, luego de estudiar siete años de <strong>electricidad en UTU</strong>. Por necesidad laboral, llegué como mandadero a la antigua joyería <strong>STRAUCH</strong>, en Ciudad Vieja. Allí, y en el mismo local, empecé a aprender el oficio en <strong>Joyería Pforzheim</strong>: preparación de metales, fundición, pulido y, con el tiempo, mis primeras reparaciones.
    <br /><br />
    Más de <strong>40 años</strong> y muchos talleres después, sigo recorriendo este camino con la misma pasión. Grandes personas marcaron mi recorrido, como <strong>Martha</strong>, dueña de Pforzheim, y <strong>David Iusim</strong>, refinador de metales preciosos, quien en <strong>1999</strong> me introdujo al mundo de las <strong>antigüedades</strong>.
    <br /><br />
    Hoy en día trabajo de forma <strong>independiente</strong>, con <strong>taller propio</strong>, creando en metal los <strong>sueños</strong> de muchas personas.
  </>
);
const texto3 = (
  <>
    <strong>Mi proceso creativo comienza con una conversación</strong>. Entiendo tus deseos, tus historias y tus sueños. Luego, me encargo de transformar esas <strong>ideas en bocetos</strong>, seleccionando cuidadosamente los materiales que mejor representen tu visión. Durante el tiempo acordado, trabajo con delicadeza dando forma a la pieza, puliendo cada detalle hasta alcanzar la perfección. El resultado final es más que una joya: <strong>es un objeto cargado de significado, una extensión de tu propia identidad</strong>.
  </>
);


function AboutPage() {
  return (
    <div className="mb-12">
      {/* Imagen de Inicio */}
      <div className="w-full h-min-[500px] border-t-2 border-b-2 mt-10 mb-10">
        <img 
          src={Inicio} 
          alt="Inicio" 
          className="w-full object-cover"
        />
      </div>

      <Texto 
        titulo="¿Quién soy?"
        texto={texto1}
        imagen={Imagen}
        left={true}
      />
      
      {/* Otras secciones usando Texto y Texto2 */}
      <Texto2 
        titulo="Mi trayectoria"
        texto={texto2}
        imagen={Corona}
        left={false}
      />
      
      <Texto 
        titulo="La importancia de conocernos  "
        texto={texto3}
        imagen={Conocernos}
        left={true}
      />
    </div>
  );
}