import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import NavBar from '../components/Navbar.tsx'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2 justify-center font-libre">
        <NavBar></NavBar>
      </div>
      <hr />
      <div className="h-screen w-screen font-libre">
        <Outlet/>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
})