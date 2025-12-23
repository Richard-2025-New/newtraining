'use client'

import { useAppStore } from '@/store/appStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Settings, 
  BookOpen, 
  Award, 
  Clock, 
  Calendar,
  LogOut,
  Edit,
  TrendingUp,
  Target
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ProfilePage() {
  const { user: currentUser, courses, logout } = useAppStore()
  const router = useRouter()

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">请先登录</h2>
          <p className="text-gray-600 mb-6">查看个人资料需要先登录账号</p>
          <Link href="/login">
            <Button className="w-full">立即登录</Button>
          </Link>
        </div>
      </div>
    )
  }

  const enrolledCourses = courses.filter(course => 
    currentUser.enrolledCourses?.includes(course.id) ?? false
  )

  const calculateCourseProgress = (courseId: string) => {
    const course = courses.find(c => c.id === courseId)
    if (!course?.chapters) return 0
    
    const totalLessons = course.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)
    const completedLessons = course.chapters.reduce((acc, ch) => 
      acc + ch.lessons.filter(l => l.completed).length, 0
    )
    
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  }

<<<<<<< HEAD
  const calculateStudyTime = (courseId: string) => {
    const course = courses.find(c => c.id === courseId)
    if (!course?.chapters) return 0
    
    // 假设每节课平均时长20分钟
    const completedLessons = course.chapters.reduce((acc, ch) => 
      acc + ch.lessons.filter(l => l.completed).length, 0
    )
    return Math.round(completedLessons * 20 / 60) // 小时
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 左侧个人信息卡片 */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                    {currentUser.name.charAt(0)}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{currentUser.name}</h2>
                  <p className="text-sm text-gray-500 mb-2">{currentUser.email}</p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mb-4">
                    {currentUser.userType === 'newcomer' ? '外贸新人' : 
                     currentUser.userType === 'student' ? '在校学生' : '企业老板'}
=======
  const totalLearningHours = enrolledCourses.reduce((acc, course) => {
    const chapters = course.chapters || [];
    const total = chapters.reduce((sum, chapter) => sum + (chapter.lessons?.length || 0), 0);
    const done = chapters.reduce((sum, chapter) => sum + (chapter.lessons?.filter(l => l.completed).length || 0), 0);
    const ratio = total > 0 ? done / total : 0;
    const safeDuration = Number(course?.duration ?? 0)
const safeRatio = Number(isNaN(ratio) ? 0 : ratio)
return acc + (safeDuration * safeRatio)
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto py-8 px-4">
        {/* 个人信息头部 */}
        <div className="mb-8">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentUser.name}</h1>
                  <p className="text-gray-600 mb-4">{currentUser.email}</p>
                  
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-4">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {currentUser.userType === 'newcomer' && '外贸新人'}
                      {currentUser.userType === 'student' && '大学生'}
                      {currentUser.userType === 'boss' && '企业老板'}
                    </Badge>{/* sync */}
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      积分: {currentUser.totalPoints}
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      等级: {(currentUser as any).level}
                    </Badge>
>>>>>>> 543f6950a582ae677cf3fd4bd67ce36b28773968
                  </div>
                  
                  <div className="w-full grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-100 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{currentUser.totalPoints}</div>
                      <div className="text-xs text-gray-500">积分</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{currentUser.currentStreak}</div>
                      <div className="text-xs text-gray-500">连续打卡</div>
                    </div>
                  </div>

                  <div className="w-full space-y-2">
                    <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      账号设置
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      退出登录
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <Target className="mr-2 h-4 w-4 text-blue-500" />
                  学习目标
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">本周学习时长</span>
                      <span className="font-medium">12/20 小时</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">本月完成课程</span>
                      <span className="font-medium">2/4 门</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧主要内容 */}
          <div className="md:col-span-2">
            <Tabs defaultValue="courses" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="courses">我的课程</TabsTrigger>
                <TabsTrigger value="achievements">成就勋章</TabsTrigger>
                <TabsTrigger value="history">学习记录</TabsTrigger>
              </TabsList>

              <TabsContent value="courses" className="space-y-4">
                {enrolledCourses.length > 0 ? (
                  enrolledCourses.map(course => {
                    const progress = calculateCourseProgress(course.id)
                    const studyTime = calculateStudyTime(course.id)
                    
                    return (
                      <Card key={course.id} className="hover:shadow-md transition-shadow">
                        <div className="p-4 flex gap-4">
                          <div className="w-32 h-24 bg-gray-200 rounded-lg flex-shrink-0 bg-cover bg-center" 
                               style={{ backgroundImage: `url(${course.coverImage || '/api/placeholder/320/180'})` }} />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-gray-900 truncate">{course.title}</h3>
                              <Button size="sm" variant="outline" onClick={() => router.push(`/courses/${course.id}`)}>
                                继续学习
                              </Button>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                              <span className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                已学 {studyTime} 小时
                              </span>
                              <span className="flex items-center">
                                <BookOpen className="mr-1 h-3 w-3" />
                                {parseInt(course.duration) || 0} 课时
                              </span>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>学习进度</span>
                                <span>{progress}%</span>
                              </div>
                              <Progress value={progress} className="h-1.5" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    )
                  })
                ) : (
                  <Card className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <BookOpen className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">暂无课程</h3>
                      <p className="text-gray-500 mb-4">你还没有报名任何课程，快去探索吧！</p>
                      <Link href="/courses">
                        <Button>浏览课程库</Button>
                      </Link>
                    </div>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="achievements">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                            i <= 2 ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            <Award className="h-8 w-8" />
                          </div>
                          <h4 className={`font-medium ${i <= 2 ? 'text-gray-900' : 'text-gray-500'}`}>
                            {i === 1 ? '初学乍练' : i === 2 ? '坚持不懈' : '未解锁勋章'}
                          </h4>
                          <p className="text-xs text-gray-500 text-center mt-1">
                            {i === 1 ? '完成首门课程' : i === 2 ? '连续打卡7天' : '???'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                              <Calendar className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">完成了《外贸基础》第{i}章测验</p>
                              <p className="text-xs text-gray-500">2024-01-{10 + i} 14:30</p>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-green-600">+50 积分</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
