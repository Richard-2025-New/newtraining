import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { User, Briefcase, GraduationCap, ArrowRight, CheckCircle } from 'lucide-react'

export default function TracksPage() {
  const tracks = [
    {
      id: 'newbie',
      name: "外贸新人通道",
      description: "从零基础到独立出单，掌握外贸全流程核心技能",
      icon: User,
      color: "blue",
      features: [
        "岗位职责与职业规划",
        "客户开发与跟进技巧",
        "商务谈判与报价策略",
        "外贸单证与物流操作",
        "风险防范与合同管理"
      ],
      suitableFor: "刚入职的外贸业务员、转行人员",
      targetUrl: "/courses/1"
    },
    {
      id: 'student',
      name: "大学生通道",
      description: "提前了解行业规则，建立职业认知，赢在起跑线",
      icon: GraduationCap,
      color: "green",
      features: [
        "外贸行业全景认知",
        "职业路径规划指导",
        "求职简历与面试技巧",
        "职场沟通与协作能力",
        "基础业务技能储备"
      ],
      suitableFor: "应届毕业生、在校大学生",
      targetUrl: "/courses/2"
    },
    {
      id: 'boss',
      name: "老板通道",
      description: "传统企业转型外贸，把握战略方向，搭建高效团队",
      icon: Briefcase,
      color: "purple",
      features: [
        "外贸战略布局与规划",
        "高效外贸团队搭建",
        "薪酬绩效体系设计",
        "合规经营与风险控制",
        "海外渠道建设策略"
      ],
      suitableFor: "企业老板、外贸经理、创业者",
      targetUrl: "/courses/3"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">选择适合你的成长路径</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            无论你是刚入行的新人，还是寻求转型的老板，我们都有量身定制的培训方案
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {tracks.map((track) => (
            <Card key={track.id} className="hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-transparent hover:border-t-blue-600">
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  track.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  track.color === 'green' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  <track.icon className="w-8 h-8" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{track.name}</h2>
                <p className="text-gray-600 mb-6 min-h-[48px]">{track.description}</p>
                
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900 mb-1">适合人群：</div>
                  <div className="text-sm text-gray-600">{track.suitableFor}</div>
                </div>

                <div className="space-y-3 mb-8">
                  {track.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className={`w-5 h-5 mr-2 shrink-0 ${
                        track.color === 'blue' ? 'text-blue-500' :
                        track.color === 'green' ? 'text-green-500' :
                        'text-purple-500'
                      }`} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href={track.targetUrl} className="block">
                  <Button className={`w-full h-12 text-lg font-medium ${
                    track.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                    track.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                    'bg-purple-600 hover:bg-purple-700'
                  }`}>
                    开始学习
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
