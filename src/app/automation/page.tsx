import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Workflow, Mail, Users, ShieldCheck, Search, Sparkles } from 'lucide-react'

export const metadata = {
  title: '自动化工作流 - Newtrain 外贸增长引擎',
  description: '用于平台获客与成交：用n8n打造线索抓取→询盘筛选→邮件外联→跟进提醒→成交闭环的自动化工作流',
}

export default function AutomationPage() {
  const blocks = [
    { icon: Search, title: '线索抓取', desc: '从搜索引擎/平台抓取潜客信息，结构化存储' },
    { icon: Mail, title: '邮件自动化', desc: '多语言邮件模板，批量外联与定时跟进' },
    { icon: Users, title: 'CRM联动', desc: '自动入库CRM，打标签、评分与分配任务' },
    { icon: ShieldCheck, title: '合规风控', desc: '黑名单过滤、退订处理与频率控制' },
    { icon: Workflow, title: '闭环追踪', desc: '从线索到成交的完整链路监控与复盘' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-yellow-300 mr-2" />
              <span className="text-sm">增长引擎 · 自动化工作流</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">平台获客与成交的自动化引擎</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              将流量转化为询盘与成交：线索抓取 → 询盘筛选 → 邮件外联 → 跟进提醒 → 成交闭环
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/payment">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 text-lg">
                  获取工作流与模板
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 px-8 py-3 text-lg">
                  咨询部署方案
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blocks */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">五步闭环 · 关键能力</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blocks.map((b, idx) => (
              <Card key={idx} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                      <b.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{b.title}</h3>
                  </div>
                  <p className="text-gray-600">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">现在就接入你的自动化增长引擎</h2>
          <p className="text-lg text-gray-600 mb-6">支持国内环境与合规要求，提供模板与部署指导</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/payment">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700">获取模板</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">联系顾问</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
