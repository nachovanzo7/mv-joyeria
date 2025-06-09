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
      <div className=" w-screen font-libre bg-amber-50 overflow-x-hidden">
        <Outlet/>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
})