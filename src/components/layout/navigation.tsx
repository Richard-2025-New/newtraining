'use client'

import { useAppStore } from '@/store/appStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X, Home, BookOpen, User, ShoppingCart, TestTube, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const { user: currentUser, logout } = useAppStore()
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  // 路由变化时关闭侧边栏
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const navItems = [
    { href: '/', label: '首页', icon: Home },
    { href: '/courses', label: '课程', icon: BookOpen },
    { href: '/test', label: '测试', icon: TestTube },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center px-4">
        {/* Mobile Menu */}
        <div className="md:hidden mr-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">菜单</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle>Newtrain</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                      isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
                {currentUser ? (
                  <>
                    <div className="h-px bg-border my-2" />
                    <Link
                      href="/user"
                      className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                        isActive('/user') ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      <User className="h-4 w-4" />
                      个人中心
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      退出登录
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
                  >
                    <User className="h-4 w-4" />
                    登录 / 注册
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Newtrain
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-primary ${
                isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex-1" />

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">购物车</span>
            </Button>
          </Link>

          {currentUser ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/user">
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                  </div>
                  <span className="text-sm font-medium">{currentUser.name}</span>
                </div>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">登录</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">注册</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
