'use client'

import Link from 'next/link'
import { useCart } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Trash2 } from 'lucide-react'

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">购物车</h1>
          <p className="text-blue-100 mt-2">查看并结算你已加入的课程</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-700 mb-6">你的购物车还是空的</p>
              <Link href="/courses">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700">去选课</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <Card key={item.course.id} className="p-6 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{item.course.title}</div>
                      <div className="text-sm text-gray-600">¥{item.course.price}</div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => removeFromCart(item.course.id)}
                      className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      移除
                    </Button>
                  </Card>
                ))}
              </div>

              <aside className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-gray-900 font-semibold">课程数量</div>
                  <div className="text-blue-600 font-bold">{cart.length}</div>
                </div>
                <div className="space-y-3">
                  <Link href="/payment">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700">前往支付</Button>
                  </Link>
                  <Button variant="outline" className="w-full" onClick={clearCart}>清空购物车</Button>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
