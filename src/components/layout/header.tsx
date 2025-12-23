'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, User, ShoppingCart, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useUser } from '@/lib/store'
import { useCart } from '@/lib/store'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [q, setQ] = useState('')
  const [showCoursePreview, setShowCoursePreview] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useUser()
  const { cart } = useCart()
  

  const navigation = [
    { name: '首页', href: '/' },
    { name: '课程', href: '/courses' },
    { name: '线下课程', href: '/offline' },
    { name: '成功案例', href: '/success-stories' },
    { name: 'AI课堂', href: '/ai' },
    { name: '博客', href: '/blog' },
    { name: '关于我们', href: '/about' }
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 mr-6 lg:mr-10">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Newtrain</span>
            </Link>
          </div>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center space-x-8 ml-6 lg:ml-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onMouseEnter={() => item.href === '/courses' && setShowCoursePreview(true)}
                onMouseLeave={() => setShowCoursePreview(false)}
              >
                {item.name}
              </Link>
            ))}
            {showCoursePreview && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-xl border p-4 w-[720px]" onMouseEnter={() => setShowCoursePreview(true)} onMouseLeave={() => setShowCoursePreview(false)}>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'nc-1', title: '外贸新人30天速成训练营', price: '¥1299' },
                    { id: 'st-1', title: '大学生外贸就业指导课程', price: '¥899' },
                    { id: 'bs-1', title: '老板转型外贸实战指南', price: '¥2999' },
                  ].map(c => (
                    <Link key={c.id} href={`/courses/${c.id}`} className="block p-3 rounded-lg border hover:bg-gray-50">
                      <div className="font-semibold text-gray-900 truncate">{c.title}</div>
                      <div className="text-sm text-blue-600 mt-1">{c.price}</div>
                    </Link>
                  ))}
                </div>
                <div className="text-right mt-3">
                  <Link href="/courses" className="text-sm text-blue-600">浏览全部课程 →</Link>
                </div>
              </div>
            )}
          </nav>

          {/* 搜索框 */}
          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="搜索课程..."
                className="pl-10 pr-4 py-2 w-full border-gray-300 focus:ring-0 focus:border-gray-400"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && q.trim()) router.push(`/courses?q=${encodeURIComponent(q.trim())}`)
                }}
              />
            </div>
          </div>

          {/* 右侧操作按钮 */}
          <div className="flex items-center space-x-4">
            {/* 通知功能暂不启用，已移除 */}

            {/* 购物车 */}
            <div className="relative">
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>

            {/* 用户菜单 */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    登录
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">
                    注册
                  </Button>
                </Link>
              </div>
            )}

            {/* 移动端菜单按钮 */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* 移动端搜索 */}
            <div className="px-2 pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="搜索课程..."
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
