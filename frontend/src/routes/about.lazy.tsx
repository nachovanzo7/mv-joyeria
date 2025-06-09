import { createLazyFileRoute } from '@tanstack/react-router';
import Imagen from '../assets/image.png'

export const Route = createLazyFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      {/*Texto de Inicio*/}
      <div className="flex flex-col md:h-96 h-60  justify-center items-center">

        <p className="text-amber-950 md:text-7xl text-3xl">Texto o frase principal</p>
        <br></br>
        <p className="text-amber-800 md:text-4xl text-2xl mt-1">Texto secundario</p>
      </div>

      {/*Contenido para el About*/}
      <div className="md:grid md:grid-cols-2 flex flex-col h-screen">

        <div className='flex  justify-center items-center'>
          <div className='max-w-3xl'>
            <img className='rounded-4xl border' src={Imagen} alt="Marcelo Vanzo" />
          </div>
        </div>

        <div className='flex p-10 justify-center items-center flex-col'>
          <h1 className='md:text-4xl text-2xl pb-3.5'><strong>Acerca de Mi</strong></h1>
          <p className='md:text-left text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas provident odio omnis quam magnam quisquam similique blanditiis eum iure, totam, officiis soluta perferendis doloribus, facere ipsam. Sapiente fuga, accusamus dolorem perspiciatis tempora ullam voluptates placeat itaque asperiores error odit unde cupiditate quo eveniet dignissimos, in a vero, nostrum nulla dolores blanditiis ratione! Repellat doloribus voluptates eos laudantium commodi modi iste aut perspiciatis asperiores rem. Soluta officiis veniam reprehenderit quae rem saepe sequi in odit sed eum consectetur omnis, tempore, nam consequatur suscipit quam inventore deserunt, debitis necessitatibus. Nihil cumque eos expedita ad inventore odio, ullam velit nisi, impedit consequuntur exercitationem sapiente dignissimos atque dicta ipsum voluptatem repellat necessitatibus et aspernatur. Dolore libero possimus beatae distinctio recusandae deleniti ad ea atque, quam officiis alias assumenda rem iure est in architecto numquam sapiente natus nostrum, expedita, odit explicabo. A laudantium consequatur vero voluptatem qui pariatur unde dolorum, exercitationem quo, eum accusamus vitae molestias ipsam libero error aliquid mollitia, voluptate autem provident! Beatae tenetur enim, praesentium odio totam aliquam aspernatur ad? At tempore asperiores adipisci et excepturi distinctio, quas eos voluptates dolores obcaecati provident hic maxime nam sit doloremque dignissimos est blanditiis recusandae molestiae similique assumenda officiis, laudantium alias. Ea sequi atque recusandae!</p>
        </div>
      </div>
    </div>
  );
}
