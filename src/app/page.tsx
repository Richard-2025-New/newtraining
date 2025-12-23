import Link from 'next/link'
import { CourseCard } from '@/components/ui/course-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Rating } from '@/components/ui/rating'
import { 
  Play, Award, Users, TrendingUp, Clock, Star, 
  BookOpen, Target, Globe, Shield, ArrowRight, CheckCircle,
  MessageCircle, Phone, Mail, MapPin, ChevronRight
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

// 学习路径 - 参考EF的分层教学
const learningPaths = [
  {
    title: '外贸新人路径',
    description: '零基础到独立操作外贸业务',
    duration: '30-60天',
    courses: ['外贸新人30天速成训练营', '外贸单证实务操作', '客户开发与沟通技巧'],
    suitableFor: '外贸新人、转行人员',
    icon: '🎯',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: '大学生就业路径',
    description: '从校园到职场的完美过渡',
    duration: '20-45天',
    courses: ['大学生外贸就业指导课程', '简历优化与面试技巧', '职场沟通与协作'],
    suitableFor: '应届毕业生、在校大学生',
    icon: '🎓',
    color: 'from-green-500 to-green-600'
  },
  {
    title: '老板转型路径',
    description: '传统企业家的外贸转型之路',
    duration: '45-90天',
    courses: ['老板转型外贸实战指南', '团队管理与激励机制', '海外市场战略规划'],
    suitableFor: '企业老板、管理层',
    icon: '💼',
    color: 'from-purple-500 to-purple-600'
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header 由全局布局提供 */}
      
      {/* Hero Section - 融合EF的国际化风格和米课的个人IP突出 */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center space-y-8">
            {/* 主标题 - 突出个人IP */}
            <div className="space-y-6">
              <div className="inline-flex items-center bg-white bg-opacity-25 rounded-full px-4 py-2 mb-4">
                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-sm font-medium text-gray-900">19年外贸实战经验 · 业界权威</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                外贸布道者的
                <span className="block text-yellow-300 mt-2">30天特训营</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                从小员工到外贸负责人再到创业公司老板，19年实战经验倾囊相授
                <br className="hidden md:block" />
                融合"体系化流程落地"+"高阶思维重塑"，让你既能"低头做事"，更能"抬头看路"
              </p>
            </div>
            
            {/* 核心卖点 - 参考米课的ROI强调 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-yellow-300">10000+</div>
                <div className="text-sm mt-1">学员成功转型</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-yellow-300">98%</div>
                <div className="text-sm mt-1">学员满意度</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-yellow-300">30天</div>
                <div className="text-sm mt-1">快速见效</div>
              </div>
            </div>
            
            {/* CTA按钮 - 参考EF的清晰行动引导 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <Link href="/courses#type-select">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 text-lg">
                  <Play className="w-5 h-5 mr-2" />
                  立即开始学习
                </Button>
              </Link>
              <a href="tel:4008888888">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 px-8 py-3 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  免费咨询 400-888-8888
                </Button>
              </a>
            </div>
            
            {/* 信任标识 */}
            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>7天无理由退款</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>终身免费更新</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>1对1专业答疑</span>
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
              <li>• 体系化流程落地：标准化到可执行的 SOP</li>
              <li>• 高阶思维重塑：方向与细节双把手</li>
              <li>• 业务闭环：客户开发→报价谈判→单证→合规风控</li>
            </ul>
            <div className="mt-8">
              <Link href="/courses#type-select">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700">查看精品课程</Button>
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-10 text-white">
            <div className="text-2xl font-bold mb-2">导师寄语</div>
            <p className="text-blue-100">“学习的终点是能落地，能成交。把时间用在对的事上，让外贸更简单。”</p>
          </div>
        </div>
      </section>

      {/* 痛点与解决方案 - 激发报名冲动 */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">外贸学习的常见痛点，我们一次解决</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: '方向迷茫', s: '不知道从哪里开始，容易低效乱学', r: '清晰学习路径与30天训练体系' },
              { t: '缺少实战', s: '理论多、落地难、转化低', r: '全流程实战与案例拆解' },
              { t: '无人指导', s: '遇到问题无人解答', r: '导师1对1答疑与跟进' },
              { t: '获取客户难', s: '线索少、转化率低', r: 'AI与自动化重塑获客闭环' },
              { t: '合规风险', s: '不了解政策与合规要求', r: '合规风控与风险预警' },
              { t: '时间碎片化', s: '工作忙没法系统学习', r: '模块化课程与移动端学习' },
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="font-semibold text-gray-900">{p.t}</div>
                <div className="text-sm text-gray-600 mt-1">{p.s}</div>
                <div className="text-blue-600 mt-2">解决方案：{p.r}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/courses#type-select">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 text-lg">立即报名</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI重塑外贸新打法 - 战略入口 */}
      <section className="py-16 bg-gradient-to-r from-violet-700 to-indigo-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1 mb-3 text-sm">
              <span className="text-black">战略升级</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">AI重塑外贸新打法</h2>
            <p className="text-blue-100 max-w-2xl">用AI与自动化重构从开发客户到成交的全链路，让外贸更高效、更智能。</p>
          </div>
          <Link href="/ai" className="shrink-0">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 text-lg">
              了解AI新打法
            </Button>
          </Link>
        </div>
      </section>

      {/* 自动化相关内容回归 AI 专题页入口 */}

      {/* 学习路径入口已并入课程页与线下课程页 */}

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
              <div key={course.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* 课程头图 */}
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white opacity-80" />
                  </div>
                  
                  {/* 标签 */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {course.isHot && (
                      <Badge className="bg-red-500 text-white px-2 py-1 text-xs">
                        🔥 热门
                      </Badge>
                    )}
                    {course.isNew && (
                      <Badge className="bg-green-500 text-white px-2 py-1 text-xs">
                        🆕 新课程
                      </Badge>
                    )}
                  </div>
                  
                  {/* 价格标签 */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white bg-opacity-90 rounded-full px-3 py-1">
                      <span className="text-lg font-bold text-red-500">¥{course.price}</span>
                      {course.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">¥{course.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* 讲师信息 - 突出个人IP */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {course.instructor.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-gray-900">{course.instructor}</div>
                      <div className="text-sm text-gray-600">{course.instructorTitle}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{course.description}</p>
                  
                  {/* 适合人群 */}
                  <div className="mb-4">
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      适合：{course.suitableFor}
                    </span>
                  </div>
                  
                  {/* 课程特色 */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {course.features.map((feature, index) => (
                        <span key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* 课程数据 */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.studentCount}人学习</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Rating value={course.rating} size="sm" />
                      <span>{course.rating}分</span>
                    </div>
                  </div>
                  
                  <Link href={`/payment?course=${encodeURIComponent(course.id)}`} className="block">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                      立即报名
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* 更多课程按钮 */}
          <div className="text-center mt-12">
            <Link href="/courses">
              <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                查看更多课程
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 学员成功案例 - 参考米课的社会证明 */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">学员成功故事</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              真实的学员反馈，见证每一个人的成长与蜕变
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Rating value={testimonial.rating} size="sm" />
                  </div>
                  
                  <p className="text-gray-700 italic leading-relaxed mb-6">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm">
                      <div className="font-semibold text-green-600">{testimonial.achievement}</div>
                      <div className="text-gray-500">{testimonial.duration}</div>
                    </div>
                    <MessageCircle className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 品牌优势 - 参考EF的专业展示 */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">为什么选择我们</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              19年外贸实战经验，打造最实用的外贸培训体系
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg">
                  <advantage.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{advantage.title}</h3>
                <p className="text-gray-600 mb-4">{advantage.description}</p>
                <div className="inline-flex items-center text-sm font-semibold text-blue-600">
                  {advantage.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - 参考米课的紧迫感营造 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">准备开始你的外贸之旅吗？</h2>
          <p className="text-xl mb-8 text-blue-100">
            加入我们的学员社群，与10000+外贸人一起成长，让19年实战经验助你快速成功
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/courses#type-select">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text黑色 font-bold px-8 py-3 text-lg">
                立即开始学习
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/demo?source=home">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 px-8 py-3 text-lg">
                免费试听课程
                <Play className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          
          {/* 联系方式 - 参考EF的专业展示 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Phone className="w-6 h-6 text-yellow-300 mb-2" />
              <div className="text-sm text-blue-100">咨询热线</div>
              <div className="font-semibold">400-888-8888</div>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-6 h-6 text-yellow-300 mb-2" />
              <div className="text-sm text-blue-100">邮箱咨询</div>
              <div className="font-semibold">contact@newtraining.cn</div>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-6 h-6 text-yellow-300 mb-2" />
              <div className="text-sm text-blue-100">在线学习</div>
              <div className="font-semibold">随时随地学习</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer 由全局布局提供 */}
    </div>
  )
}
