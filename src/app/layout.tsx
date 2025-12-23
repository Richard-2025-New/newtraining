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
  metadataBase: new URL(process.env.SITE_URL || 'https://newtraining.cn'),
  title: {
    default: 'Newtrain 新训 | 外贸布道者实战训练营',
    template: '%s | Newtrain 新训'
  },
  description: '19年外贸实战经验倾囊相授。面向外贸新人、大学生与企业老板的体系化培训平台。融合"流程落地"与"高阶思维重塑"，提供客户开发、报价谈判、单证操作、合规风控等全流程实战指导。',
  keywords: ['外贸培训', '外贸新人', '外贸业务员', '外贸SOHO', '外贸老板转型', '外贸实战课程', '客户开发', '外贸单证', '外贸合规', 'Newtrain', '新训'],
  authors: [{ name: 'Richard', url: 'https://newtraining.cn' }],
  creator: 'Richard',
  publisher: 'Newtrain',
  openGraph: {
    title: 'Newtrain 新训 | 外贸布道者实战训练营',
    description: '19年外贸实战经验倾囊相授。融合"流程落地"与"高阶思维重塑"，助你既能低头做事，更能抬头看路。',
    url: 'https://newtraining.cn',
    siteName: 'Newtrain 新训',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Newtrain 新训 - 外贸实战训练营',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Newtrain 新训 | 外贸布道者实战训练营',
    description: '19年外贸实战经验倾囊相授。助你快速掌握外贸核心技能。',
    images: ['/og-image.jpg'],
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
  alternates: {
    canonical: 'https://newtraining.cn',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#2563eb" />
        {/* 百度链接自动推送脚本 */}
        <Script id="baidu-push" strategy="afterInteractive">
          {`
            (function(){
              var bp = document.createElement('script');
              var curProtocol = window.location.protocol.split(':')[0];
              if (curProtocol === 'https') {
                bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
              }
              else {
                bp.src = 'http://push.zhanzhang.baidu.com/push.js';
              }
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(bp, s);
            })();
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
        <FloatingToolbarClient />
      </body>
    </html>
  )
}
