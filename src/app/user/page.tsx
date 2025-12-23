'use client'

import { useAppStore } from '@/store/appStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User as UserIcon, 
  Settings, 
  BookOpen, 
  Award, 
  Clock, 
  Calendar,
  LogOut,
  Target,
  TrendingUp
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UserPage() {
  const { user: currentUser, courses, logout } = useAppStore()
  const router = useRouter()

  if (!currentUser) {
    router.push('/login')
    return null
  }

  // 计算学习数据
  const enrolledCoursesList = courses.filter(c => currentUser.enrolledCourses?.includes(c.id))
  const completedCoursesCount = currentUser.completedCourses
  const totalStudyHours = currentUser.totalStudyTime
  
  // 模拟最近学习记录
  const recentActivity = [
    { id: 1, action: '完成了课程章节', target: '外贸基础 - 第一章', time: '2小时前', points: 50 },
    { id: 2, action: '提交了作业', target: '客户开发实战作业', time: '1天前', points: 100 },
    { id: 3, action: '连续打卡', target: '第7天', time: '1天前', points: 20 },
  ]

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* 顶部个人信息卡片 */}
        <Card className="mb-8 border-none shadow-md bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold border-4 border-white/30">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    currentUser.name.charAt(0)
                  )}
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{currentUser.name}</h1>
                <p className="text-blue-100 mb-4 flex items-center justify-center md:justify-start gap-2">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {currentUser.userType === 'newcomer' ? '🌱 外贸新人' : 
                     currentUser.userType === 'student' ? '🎓 在校学生' : '👔 企业老板'}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    Lv.{currentUser.level || 1}
                  </span>
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-200" />
                    <span>学习时长: {totalStudyHours}小时</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-200" />
                    <span>在学课程: {enrolledCoursesList.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-200" />
                    <span>积分: {currentUser.totalPoints}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 min-w-[120px]">
                <Button variant="secondary" className="w-full bg-white text-blue-700 hover:bg-blue-50" onClick={() => router.push('/profile')}>
                  <UserIcon className="w-4 h-4 mr-2" />
                  个人主页
                </Button>
                <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10" onClick={() => router.push('/settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  设置
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：学习概览 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 我的课程 */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  我的课程
                </CardTitle>
                <Link href="/courses" className="text-sm text-blue-600 hover:underline">
                  浏览全部 &rarr;
                </Link>
              </CardHeader>
              <CardContent>
                {enrolledCoursesList.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {enrolledCoursesList.map(course => (
                      <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push(`/courses/${course.id}`)}>
                        <div className="flex gap-3 mb-3">
                          <div className="w-16 h-16 bg-gray-200 rounded-md bg-cover bg-center" style={{ backgroundImage: `url(${course.coverImage})` }}></div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold truncate">{course.title}</h4>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{course.description}</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>进度</span>
                            <span>{course.progress || 0}%</span>
                          </div>
                          <Progress value={course.progress || 0} className="h-1.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>暂无在学课程</p>
                    <Button variant="link" className="mt-2" onClick={() => router.push('/courses')}>
                      去选课
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 学习动态 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  学习动态
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="flex items-center justify-between py-2 border-b last:border-0 border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                          {activity.points > 0 ? <Award className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {activity.action} <span className="text-blue-600">"{activity.target}"</span>
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                      {activity.points > 0 && (
                        <span className="text-sm font-bold text-orange-500">+{activity.points} 积分</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：数据与成就 */}
          <div className="space-y-8">
            {/* 每日目标 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-500" />
                  每日目标
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span>今日学习时长</span>
                    <span className="font-bold">45 / 60 分钟</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  
                  <div className="flex justify-between items-center text-sm pt-2">
                    <span>完成小节</span>
                    <span className="font-bold">2 / 3 节</span>
                  </div>
                  <Progress value={66} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* 成就展示 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  最新成就
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center text-center p-2">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-2">
                      <Award className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium">初出茅庐</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium">持续进步</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2 opacity-50">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-2">
                      <Award className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium">未来可期</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 退出按钮 */}
            <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              退出登录
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
