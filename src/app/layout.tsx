import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import Navigation from '@/components/layout/navigation'
import FloatingToolbarClient from '@/components/ui/floating-toolbar-client'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Newtrain - 专业外贸培训平台',
  description: '19年外贸行业经验，专业的外贸培训平台，帮助外贸新人、大学生、企业老板成功转型外贸，实现职业发展目标。',
  keywords: '外贸培训,外贸新人培训,大学生外贸培训,内贸转外贸,外贸课程,外贸学习',
  authors: [{ name: 'Newtrain Team' }],
  openGraph: {
    title: 'Newtrain - 专业外贸培训平台',
    description: '19年外贸行业经验，专业的外贸培训平台',
    type: 'website',
    locale: 'zh_CN',
    siteName: 'Newtrain',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Newtrain - 专业外贸培训平台',
    description: '19年外贸行业经验，专业的外贸培训平台',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    other: {
      baidu: 'your-baidu-verification-code',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* 统计脚本（使用 next/script，避免 Hydration 差异）*/}
        <Script
          src="https://hm.baidu.com/hm.js?your-baidu-analytics-code"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=your-google-analytics-code"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', 'your-google-analytics-code');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Navigation />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        {/* 右侧交流工具条（客户端统计购物车数量）*/}
        <FloatingToolbarClient />
      </body>
    </html>
  )
}
