import { createLazyFileRoute } from '@tanstack/react-router'
import { Slider } from "@/components/ui/slider"

export const Route = createLazyFileRoute('/market')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='h-screen'>
      <div className='grid grid-cols-[1fr_3fr] h-full'>

        {/* Filtros */}
        <section className='flex h-3/5 flex-col self-center items-center gap-6 bg-amber-50 p-10 border-2 border-black rounded-3xl'>
          <h1 className='text-2xl'>Filtros</h1>
          <div>
            <h2 className='p-2'>Precio</h2>
            <Slider
              defaultValue={[33]}
              max={100}
              step={10}
              min={32}
              className="w-64"
            />
          </div>
        </section>

        <section className='flex justify-center items-center p-36'>
          sadsadsad
        </section>

      </div>
    </div>
  )
}
