import { createLazyFileRoute } from '@tanstack/react-router';
import Imagen from '../assets/image.png'

export const Route = createLazyFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      {/*Texto principal*/}
      <div className="flex flex-col h-96 bg-amber-50 justify-center items-center">
        <p className="text-amber-950 text-7xl">Texto o frase principal</p>
        <br></br>
        <p className="text-amber-950 text-4xl mt-1">Subtexto de invitación</p>
      </div>

      {/*Contenido About*/}
      <div className="grid grid-cols-2 h-screen">

        <div className='flex bg-amber-50 justify-center items-center'>
          <div className='max-w-3xl'>
            <img className='rounded-4xl border' src={Imagen} alt="Marcelo Vanzo" />
          </div>
        </div>

        <div className='flex p-10 bg-amber-50 justify-center items-center'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, harum beatae, fugit tempora laudantium odio vero nisi, reiciendis provident hic incidunt ipsa saepe. Voluptates, doloribus provident sit facilis facere magni possimus atque temporibus aliquam magnam eligendi quo fugiat tempore, obcaecati eos fugit vero aliquid illo a? Temporibus illum ipsum, voluptatem, alias at corrupti, voluptatibus iste aliquid suscipit assumenda tenetur molestias velit ea harum sit autem sed accusamus debitis vitae quibusdam delectus eligendi! Id quo et doloribus eius provident fuga cupiditate, eos pariatur accusantium laboriosam saepe magnam laudantium nostrum minima porro mollitia libero, sequi, impedit ducimus molestiae nisi est modi cumque!</p>
        </div>
      </div>
    </div>
  );
}
