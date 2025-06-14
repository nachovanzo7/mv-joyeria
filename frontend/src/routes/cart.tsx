import { createFileRoute } from '@tanstack/react-router'
import CartPage from '../components/CartPage'

export const Route = createFileRoute('/cart')({
  component: CartPage,
})
