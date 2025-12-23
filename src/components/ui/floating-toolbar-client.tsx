'use client'

import FloatingToolbar from '@/components/ui/floating-toolbar'
import { useCart } from '@/lib/store'

export default function FloatingToolbarClient() {
  const { cart } = useCart()
  return <FloatingToolbar cartCount={cart.length} />
}

