import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Globe, Cpu, Play, Lock } from 'lucide-react'

export default function OfflineCoursesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">线下课程</h1>
          <p className="text-indigo-100 mt-2">两大王牌：自己建站实操营 + AI加持自动引流</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 自己建站 */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-indigo-600" />
                自己建站线下实操营
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">无需代码，三天两夜现场搭建独立站；随堂助教、分组PK、作业实操，带着网站走。</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { t: '无需代码', c: 'indigo' },
                    { t: '分组PK', c: 'blue' },
                    { t: '随堂助教', c: 'cyan' },
                    { t: '1对1辅导', c: 'violet' }
                  ].map((b, i) => (
                    <Badge key={i} className={`bg-${b.c}-100 text-${b.c}-800`}>{b.t}</Badge>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <Link href="/contact">
                    <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white">查看课程详情</Button>
                  </Link>
                  <Link href="/demo?source=offline&track=build-site">
                    <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center gap-2">
                      <Play className="h-4 w-4" /> 免费试听
                    </Button>
                  </Link>
                </div>
                <div className="mt-4 text-sm text-gray-600 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1"><Play className="h-4 w-4 text-green-600" /> 免费试听章节</span>
                  <span className="inline-flex items-center gap-1"><Lock className="h-4 w-4 text-gray-500" /> 正式购买后解锁完整视频</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI加持自动引流 */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-cyan-600" />
                AI加持的自动引流
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">AI + 自动化工作流，从线索抓取到邮件外联与成交闭环，稳定获客与询盘。</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { t: 'AI文案/外联', c: 'cyan' },
                    { t: '线索抓取', c: 'blue' },
                    { t: '自动化提醒', c: 'indigo' },
                    { t: '成交闭环', c: 'violet' }
                  ].map((b, i) => (
                    <Badge key={i} className={`bg-${b.c}-100 text-${b.c}-800`}>{b.t}</Badge>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <Link href="/contact">
                    <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white">查看课程详情</Button>
                  </Link>
                  <Link href="/demo?source=offline&track=ai">
                    <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center gap-2">
                      <Play className="h-4 w-4" /> 免费试听
                    </Button>
                  </Link>
                </div>
                <div className="mt-4 text-sm text-gray-600 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1"><Play className="h-4 w-4 text-green-600" /> 免费试听章节</span>
                  <span className="inline-flex items-center gap-1"><Lock className="h-4 w-4 text-gray-500" /> 正式购买后解锁完整视频</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
