import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import NavBar from '../components/Navbar.tsx'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex gap-2 justify-center font-libre">
        <NavBar></NavBar>
      </div>
      <div>
      </div>
      <hr />
      <div className=" w-screen font-libre bg-white overflow-x-hidden">
        <Outlet/>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
})