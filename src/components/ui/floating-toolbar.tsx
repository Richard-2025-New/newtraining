'use client'

import Link from 'next/link'

export default function FloatingToolbar({ cartCount = 0 }: { cartCount?: number }) {
  return (
    <div className="fixed right-4 top-1/3 z-50 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
      <Link href="/cart" className="block bg-white text-gray-800 px-4 py-3 text-sm flex items-center gap-2 hover:bg-gray-50">
        <span className="inline-block w-5 h-5 rounded-full bg-blue-600 text-white text-center leading-5">🛒</span>
        购物车({cartCount})
      </Link>
      <Link href="/app" className="block bg-white text-gray-800 px-4 py-3 text-sm border-t hover:bg-gray-50">
        <div className="flex items-center justify-between">
          <span>APP看课</span>
          <img alt="下载APP二维码" className="w-10 h-10 rounded" src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https%3A%2F%2Fnewtrain.app%2Fdownload" />
        </div>
      </Link>
      <Link href="/contact" className="block bg-white text-gray-800 px-4 py-3 text-sm border-t hover:bg-gray-50">
        报名咨询 <span className="ml-2 inline-block text-xs bg-red-500 text白色 px-2 py-0.5 rounded">支持分期付款</span>
      </Link>
      <Link href="/contact?chat=1" className="block bg-white text-gray-800 px-4 py-3 text-sm border-t hover:bg-gray-50">
        在线沟通
      </Link>
      <div className="bg-gray-900 text-white px-4 py-3 text-xs border-t">
        Mon–Fri 9:00–18:00
      </div>
    </div>
  )
}

