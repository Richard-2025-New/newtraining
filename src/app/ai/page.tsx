import Link from 'next/link'
// Header 由全局布局提供
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, Rocket, Workflow, Mail, Files, ShieldCheck, Search, Sparkles } from 'lucide-react'

export default function AIPlaybookPage() {
  const scenarios = [
    {
      icon: Search,
      title: 'AI开发客户',
      description: '用AI抓取并结构化整理潜在客户信息，生成外联名单与优先级评分',
      points: ['公司/邮箱/网站自动抽取', '意向评分与标签', '自动入库CRM/n8n']
    },
    {
      icon: Mail,
      title: '询盘筛选与邮件自动化',
      description: '用规则+AI对询盘分类与优先级排序，自动生成多轮邮件模板并发送',
      points: ['垃圾询盘过滤', '多语言邮件生成', '自动跟进与提醒']
    },
    {
      icon: Files,
      title: '产品文案与资料生成',
      description: '批量生成产品规格、卖点、图片Alt、FAQ与报价单，支持多平台发布',
      points: ['规格/卖点/FAQ模板', '图片Alt与SEO文案', 'PDF报价单自动化']
    },
    {
      icon: ShieldCheck,
      title: '合规与政策监测',
      description: '跟踪海关、出口管制、税费政策更新，生成可执行检查清单',
      points: ['政策订阅与摘要', '风控检查表', '异常告警与整改建议']
    },
    {
      icon: Workflow,
      title: 'n8n全链路自动化',
      description: '从线索→分类→外联→跟进→成交的自动化闭环，减少人工重复',
      points: ['Webhook/表单接入', '队列与重试', 'CRM/表格/邮件联动']
    }
  ]

  const prompts = [
    { name: '客户画像生成（多维标签）', tag: '开发客户', desc: '根据官网与公开数据生成ICP画像与外联切入点' },
    { name: '多语言冷邮件生成（A/B版）', tag: '邮件自动化', desc: '按行业/职位生成双版本冷邮件并包含后续跟进模板' },
    { name: '产品卖点与规格提炼', tag: '文案资料', desc: '将原始规格表转为营销卖点文案与FAQ' },
    { name: '政策合规检查清单', tag: '合规监测', desc: '根据目的国生成出口合规检查表与注意事项' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header 由全局布局提供 */}

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300 mr-2" />
              <span className="text-sm">战略升级 · AI重塑外贸新打法</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">AI重塑外贸新打法</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              以场景为轴、用工作流落地，从开发客户到成交的全链路智能化与自动化
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 text-lg">
                立即开始智能化外贸
              </Button>
              <Link href="/learning-path">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 px-8 py-3 text-lg">
                  查看学习路径
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 场景卡片 */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">五大核心应用场景</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scenarios.map((s, idx) => (
              <Card key={idx} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                      <s.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{s.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{s.description}</p>
                  <ul className="space-y-2">
                    {s.points.map((p, i) => (
                      <li key={i} className="text-sm text-gray-600">• {p}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Prompt与模板库 */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Prompt与流程模板库</h2>
            <Badge className="bg-blue-600 text-white">持续更新</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prompts.map((p, idx) => (
              <Card key={idx} className="bg-white border border-gray-100 shadow-sm hover:shadow-md">
                <CardContent className="p-6">
                  <div className="mb-2 text-sm text-blue-600">{p.tag}</div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">{p.name}</div>
                  <p className="text-gray-600 text-sm mb-4">{p.desc}</p>
                  <div className="flex gap-3">
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700">复制模板</Button>
                    <Button size="sm" variant="outline">下载示例</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 工作流示意与n8n */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">n8n自动化工作流（示意）</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">线索抓取 → 询盘筛选 → 邮件外联 → 跟进提醒 → CRM入库 → 统计与复盘</p>
          </div>
          <div className="rounded-2xl bg-white shadow p-8 text-center">
            <Workflow className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">工作流图与Demo将随课程逐步上线，支持一键导入n8n。</p>
            <div className="mt-6">
              <Link href="/payment">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700">获取工作流与模板</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 国内模型适配说明 */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">国内模型适配</h2>
          <p className="text-gray-600 mb-6">将提供豆包、通义千问等国内模型的提示词适配与接口封装建议，确保在国内环境下稳定可用。</p>
          <div className="flex gap-4">
            <Button variant="outline">查看适配指南</Button>
            <Link href="/contact">
              <Button>咨询企业内训</Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
