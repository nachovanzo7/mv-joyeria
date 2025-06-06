import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/contacto')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>CONTACTO</div>
}
