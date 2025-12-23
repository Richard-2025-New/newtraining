import Link from 'next/link'
import { CourseCard } from '@/components/ui/course-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Rating } from '@/components/ui/rating'
import { 
  Play, Award, Users, TrendingUp, Clock, Star, 
  BookOpen, Target, Globe, Shield, ArrowRight, CheckCircle,
  MessageCircle, Phone, Mail, MapPin, ChevronRight, User, Briefcase
} from 'lucide-react'

// 精选课程数据 - 参考米课的定价策略
const featuredCourses = [
  {
    id: '1',
    title: '外贸新人30天速成训练营',
    description: '从0到1掌握外贸全流程，包含客户开发、报价谈判、单证操作等核心技能。19年实战经验倾囊相授。',
    instructor: '张老师',
    instructorTitle: '外贸布道者 · 19年实战经验',
    price: 1299,
    originalPrice: 1999,
    rating: 4.9,
    reviewCount: 128,
    duration: '30小时',
    studentCount: 856,
    level: 'beginner' as const,
    category: '外贸新人',
    thumbnail: '',
    isHot: true,
    isNew: false,
    features: ['30天系统化学习', '1对1答疑服务', '终身免费更新', '结业证书'],
    suitableFor: '外贸新人、转行人员'
  },
  {
    id: '2',
    title: '大学生外贸就业指导课程',
    description: '专为大学生设计的外贸职业路径规划，从行业认知到求职技巧全方位指导，助力职场起步。',
    instructor: '李老师',
    instructorTitle: '职业规划专家',
    price: 899,
    originalPrice: 1299,
    rating: 4.8,
    reviewCount: 95,
    duration: '20小时',
    studentCount: 642,
    level: 'beginner' as const,
    category: '大学生',
    thumbnail: '',
    isHot: false,
    isNew: true,
    features: ['职业规划', '简历优化', '面试技巧', '行业认知'],
    suitableFor: '应届毕业生、在校大学生'
  },
  {
    id: '3',
    title: '老板转型外贸实战指南',
    description: '帮助传统老板快速转型外贸，包含团队搭建、渠道布局、合规风控等核心内容，实现业务增长。',
    instructor: '王老师',
    instructorTitle: '企业转型顾问',
    price: 2999,
    originalPrice: 3999,
    rating: 4.9,
    reviewCount: 203,
    duration: '45小时',
    studentCount: 324,
    level: 'advanced' as const,
    category: '老板培训',
    thumbnail: '',
    isHot: true,
    isNew: false,
    features: ['团队管理', '渠道布局', '合规风控', '战略规划'],
    suitableFor: '企业老板、管理层'
  },
]

// 品牌优势 - 突出个人IP和实战经验
const advantages = [
  {
    icon: Award,
    title: '19年外贸实战经验',
    description: '从小员工到创业公司老板，熟知外贸每个流程和细节，能够整体把握方向，细节帮助',
    highlight: '业界罕见完整履历'
  },
  {
    icon: Target,
    title: '体系化培训体系',
    description: '融合"流程落地"与"高阶思维重塑"，30天形成完整知识体系和实战能力',
    highlight: '30天速成体系'
  },
  {
    icon: Globe,
    title: '前沿政策适配',
    description: '新增政策适配、合规操作、高潜力赛道内容，让学员站稳脚跟，踩准风口',
    highlight: '政策+风口'
  },
  {
    icon: Users,
    title: '高效学习方式',
    description: '视频+文字+工具清单，随时随地学习，快速应用到实际工作中',
    highlight: '随时随地学'
  },
]

// 学员成功案例 - 参考米课的社会证明
const testimonials = [
  {
    name: '张同学',
    role: '应届毕业生 · 现外贸业务员',
    avatar: '👨‍💼',
    rating: 5,
    content: '学完30天训练营，我从零基础成功入职外贸公司，月薪从4K涨到8K，感谢老师的悉心指导！',
    achievement: '薪资翻倍',
    duration: '学习30天'
  },
  {
    name: '李总',
    role: '传统工厂老板 · 转型成功',
    avatar: '👨‍💼',
    rating: 5,
    content: '传统内贸竞争激烈，通过学习成功转型外贸，3个月接到首批海外订单，业务增长200%！',
    achievement: '业务增长200%',
    duration: '转型3个月'
  },
  {
    name: '王经理',
    role: '外贸主管 · 团队管理提升',
    avatar: '👩‍💼',
    rating: 5,
    content: '管理课程让我学会了如何激励团队，团队业绩从月均50万提升到120万，方法真的很实用！',
    achievement: '团队业绩提升140%',
    duration: '管理提升2个月'
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - 融合EF的国际化风格和米课的个人IP突出 */}
      <section className="relative bg-[#001b3a] text-white overflow-hidden">
        {/* 背景装饰 */}
        {/* <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20"></div> */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001b3a] via-[#001b3a]/90 to-transparent"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* 主标题 - 突出个人IP */}
              <div className="space-y-6">
                <div className="inline-flex items-center bg-blue-600/30 border border-blue-400/30 rounded-full px-4 py-2 mb-4 backdrop-blur-sm">
                  <Star className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-sm font-medium text-blue-100">19年外贸实战经验 · 业界权威</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                  外贸布道者的
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mt-2">
                    30天实战特训营
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
                  从小员工到外贸负责人再到创业公司老板，融合"体系化流程落地"与"高阶思维重塑"，助你既能低头做事，更能抬头看路。
                </p>
              </div>
              
              {/* 双通道入口 - 仿EF风格 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Link href="/tracks#newbie" className="group">
                  <div className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl p-6 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <User className="w-8 h-8 text-blue-400" />
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">我是新人/大学生</h3>
                    <p className="text-sm text-gray-400">解决就业 · 技能落地 · 职业规划</p>
                  </div>
                </Link>

                <Link href="/tracks#boss" className="group">
                  <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-500/30 rounded-xl p-6 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <Briefcase className="w-8 h-8 text-purple-400" />
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">我是老板/高管</h3>
                    <p className="text-sm text-gray-400">转型指路 · 团队搭建 · 战略风控</p>
                  </div>
                </Link>
              </div>

              {/* 信任标识 */}
              <div className="flex items-center gap-6 text-sm text-gray-400 pt-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>10000+ 学员验证</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>实战落地保障</span>
                </div>
              </div>
            </div>

            {/* 右侧：导师形象/价值展示 (占位) */}
            <div className="hidden lg:block relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shrink-0 font-bold text-2xl">30</div>
                    <div>
                      <h3 className="text-lg font-bold text-white">30天体系化流程落地</h3>
                      <p className="text-sm text-gray-400">从开发到成交的全流程 SOP</p>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-white/10 ml-6"></div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center shrink-0 font-bold text-2xl">高</div>
                    <div>
                      <h3 className="text-lg font-bold text-white">高阶思维重塑</h3>
                      <p className="text-sm text-gray-400">认知破局，掌握底层商业逻辑</p>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-white/10 ml-6"></div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shrink-0 font-bold text-2xl">新</div>
                    <div>
                      <h3 className="text-lg font-bold text-white">政策适配与高潜赛道</h3>
                      <p className="text-sm text-gray-400">站稳脚跟，踩准时代风口</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 导师实力 - 强调19年一线实战老板亲授 */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">19年一线实战老板亲授课程</h2>
            <p className="text-lg text-gray-700 mb-6">从小员工→外贸负责人→创业公司老板，完整闭环的一线实战经验，重在落地与成交。</p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                体系化流程落地：标准化到可执行的 SOP
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                高阶思维重塑：方向与细节双把手
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                业务闭环：客户开发→报价谈判→单证→合规风控
              </li>
            </ul>
            <div className="mt-8">
              <Link href="/courses">
                <Button className="bg-gray-900 text-white hover:bg-blue-700 px-8 py-6 text-lg rounded-full">
                  查看精品课程 <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-10 border border-gray-100">
            <div className="text-2xl font-bold mb-4 text-gray-900">导师寄语</div>
            <p className="text-gray-600 text-lg italic leading-relaxed">
              “学习的终点是能落地，能成交。把时间用在对的事上，让外贸更简单。我希望通过这套体系，让新人少走弯路，让老板看清方向。”
            </p>
            <div className="mt-6 flex items-center gap-4">
               <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                 R
               </div>
               <div>
                 <div className="font-bold text-gray-900">Richard</div>
                 <div className="text-sm text-gray-500">Newtrain 创始人 / 外贸布道者</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 痛点与解决方案 - 激发报名冲动 */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">外贸学习的常见痛点，我们一次解决</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: '方向迷茫', s: '不知道从哪里开始，容易低效乱学', r: '清晰学习路径与30天训练体系' },
              { t: '缺少实战', s: '理论多、落地难、转化低', r: '全流程实战与案例拆解' },
              { t: '无人指导', s: '遇到问题无人解答', r: '导师1对1答疑与跟进' },
              { t: '获取客户难', s: '线索少、转化率低', r: 'AI与自动化重塑获客闭环' },
              { t: '合规风险', s: '不了解政策与合规要求', r: '合规风控与风险预警' },
              { t: '时间碎片化', s: '工作忙没法系统学习', r: '模块化课程与移动端学习' },
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="font-bold text-xl text-gray-900 mb-2">{p.t}</div>
                <div className="text-gray-500 mb-4 h-12">{p.s}</div>
                <div className="pt-4 border-t border-gray-50 text-blue-600 font-medium flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {p.r}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 精选课程 - 参考米课的展示方式 */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">精品课程推荐</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              每一门课程都是19年实战经验的精华，确保学到就能用到，快速见效
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          
          {/* 更多课程按钮 */}
          <div className="text-center mt-12">
            <Link href="/courses">
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8">
                查看更多课程
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 品牌优势 - 参考EF的专业展示 */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">为什么选择 Newtrain</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              19年外贸实战经验，打造最实用的外贸培训体系
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center group p-6 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <advantage.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{advantage.description}</p>
                <div className="inline-flex items-center text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {advantage.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer 由全局布局提供 */}
    </div>
  )
}
