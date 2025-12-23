'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { UserTypeSelector } from '@/components/ui/user-type-selector'
import { CourseTimeline } from '@/components/ui/course-timeline'
import { VideoPlayerAdvanced } from '@/components/ui/video-player-advanced'
import { AssignmentSystem } from '@/components/ui/assignment-system'
import { useAppStore } from '@/store/appStore'
import { Button } from '@/components/ui/button'

const demoCourse = {
  id: 'demo-1',
  title: '外贸新手30天速成训练营',
  description: '从0到1系统掌握外贸全流程，19年实战经验的精华浓缩，30天打造外贸专业人才',
  instructor: '外贸布道者',
  duration: '30天',
  level: '初级',
  rating: 4.9,
  students: 1250,
  price: 2999,
  coverImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20foreign%20trade%20training%20course%20cover%20with%20modern%20design%2C%20globe%20icon%2C%20shipping%20containers%2C%20business%20documents%2C%20clean%20minimalist%20style%2C%20blue%20and%20white%20color%20scheme&image_size=landscape_16_9',
  category: '外贸培训',
  targetAudience: ['外贸新人', '准备做外贸大学生', '内贸转外贸老板'],
  learningObjectives: [
    '掌握外贸完整流程和操作细节',
    '建立正确的外贸思维和认知',
    '学会客户开发和维护技巧',
    '了解最新政策和合规要求',
    '掌握高潜力赛道选择方法'
  ],
  prerequisites: ['基本英语读写能力', '电脑操作基础'],
  status: 'in-progress' as const,
  progress: 25,
  chapters: [
    {
      id: '1',
      title: '第1周：外贸基础认知',
      description: '建立外贸基础认知，了解行业全貌和核心概念',
      duration: '7天',
      type: 'foundation' as const,
      lessons: [
        {
          id: '1-1',
          title: '外贸行业全景图',
          duration: '15:30',
          type: 'video' as const,
          completed: true,
          locked: false,
          videoUrl: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Foreign%20trade%20industry%20overview%20video%20thumbnail%2C%20global%20trade%20map%2C%20shipping%20routes%2C%20business%20network%20connections%2C%20professional%20presentation%20style&image_size=square'
        },
        {
          id: '1-2',
          title: '外贸流程核心环节',
          duration: '22:15',
          type: 'video' as const,
          completed: true,
          locked: false,
          videoUrl: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Foreign%20trade%20process%20flowchart%2C%20step-by-step%20workflow%2C%20business%20documents%2C%20timeline%20graphic%2C%20clean%20professional%20design&image_size=square'
        },
        {
          id: '1-3',
          title: '第一周作业：行业认知报告',
          duration: '30分钟',
          type: 'assignment' as const,
          completed: false,
          locked: false,
          assignment: {
            id: 'assignment-1',
            type: 'essay' as const,
            title: '第一周作业：行业认知报告',
            description: '请根据本周学习内容，撰写一份关于外贸行业认知的报告，包括行业现状、发展趋势和个人定位。字数要求：1000-1500字。',
            requirements: [
              '分析外贸行业当前现状',
              '预测未来发展趋势', 
              '明确个人在行业的定位',
              '提出具体的学习计划'
            ],
            deadline: '2024-01-15',
            maxScore: 100,
            submitted: false
          }
        }
      ]
    },
    {
      id: '2',
      title: '第2周：客户开发实战',
      description: '掌握客户开发技巧，学会寻找和维护客户',
      duration: '7天',
      type: 'practice' as const,
      lessons: [
        {
          id: '2-1',
          title: '客户画像与定位',
          duration: '18:45',
          type: 'video' as const,
          completed: false,
          locked: false
        },
        {
          id: '2-2',
          title: '开发信写作技巧',
          duration: '25:20',
          type: 'video' as const,
          completed: false,
          locked: false
        },
        {
          id: '2-3',
          title: 'LinkedIn开发策略',
          duration: '20:15',
          type: 'video' as const,
          completed: false,
          locked: true
        }
      ]
    }
  ]
}

export default function DemoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // 修正：useSelectedUserType, useCourses, useCurrentCourse 未从 store/appStore 导出，改为从 useAppStore 获取
  const { selectedUserType, setSelectedUserType, courses, setCourses, currentCourse, setCurrentCourse } = useAppStore()
  const timelineRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // 设置演示数据
    // @ts-ignore - 演示数据类型可能不完全匹配，暂时忽略
    setCourses([demoCourse])
    // @ts-ignore
    setCurrentCourse(demoCourse)
  }, [])

  useEffect(() => {
    if (selectedUserType && timelineRef.current) {
      const top = timelineRef.current.getBoundingClientRect().top + window.scrollY - 96
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [selectedUserType])

  useEffect(() => {
    const source = searchParams.get('source') || ''
    const type = searchParams.get('type') as 'newcomer' | 'student' | 'boss' | null
    const track = searchParams.get('track') || ''
    if (type) setSelectedUserType(type)
    else if (track === 'build-site') setSelectedUserType('newcomer')
    else if (track === 'ai') setSelectedUserType('boss')
  }, [])

  const handleUserTypeSelect = (userType: string) => {
    setSelectedUserType(userType)
  }

  const handleAssignmentSubmit = (submission: any) => {
    console.log('作业提交:', submission)
    alert('作业提交成功！')
  }

  const handleLessonSelect = (chapterIndex: number, lessonIndex: number) => {
    console.log(`选择课程：第${chapterIndex + 1}章，第${lessonIndex + 1}节`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Newtrain 外贸培训平台演示
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            融合 "体系化流程落地" + "高阶思维重塑" 的30天培训体系
          </p>
          {(() => {
            const source = searchParams.get('source')
            if (!source) return (
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                <span className="text-sm font-medium">19年外贸实战经验 | 个人IP打造 | AI智能对接 | 百度SEO优化</span>
              </div>
            )
            const label = source === 'home' ? '来自首页免费试听'
              : source === 'courses' ? '来自课程页免费试听'
              : source === 'offline' && searchParams.get('track') === 'build-site' ? '线下建站实操试听'
              : source === 'offline' && searchParams.get('track') === 'ai' ? '线下AI自动引流试听'
              : '试听入口'
            return (
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                <span className="text-sm font-medium">{label}</span>
              </div>
            )
          })()}
        </div>

        {/* 用户类型选择器 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">1. 选择您的用户类型</h2>
          <UserTypeSelector 
            selectedType={selectedUserType}
            onSelectType={handleUserTypeSelect}
          />
          {selectedUserType && (
            <div className="mt-4 text-center">
              <p className="text-lg text-gray-700">
                已选择：<span className="font-semibold text-blue-600">{selectedUserType}</span>
              </p>
            </div>
          )}
        </div>

        {/* 课程时间轴 */}
        <div className="mb-12" ref={timelineRef}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">2. 30天培训时间轴</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <CourseTimeline
              // @ts-ignore
              chapters={demoCourse.chapters}
              currentChapter={1}
              currentLesson={0}
              onLessonSelect={handleLessonSelect}
            />
          </div>
        </div>

        {/* 视频播放器 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">3. 高级视频播放器</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <VideoPlayerAdvanced
              src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Foreign%20trade%20training%20video%20thumbnail%2C%20professional%20presentation%2C%20business%20documents%2C%20clean%20design&image_size=square"
              title="外贸行业全景图 - 演示视频"
              onComplete={() => console.log('视频播放完成')}
            />
          </div>
        </div>

        {/* 作业系统 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">4. 作业提交系统</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <AssignmentSystem
              // @ts-ignore
              assignment={demoCourse.chapters[0].lessons[2].assignment!}
              onSubmit={handleAssignmentSubmit}
            />
          </div>
        </div>

        {/* 功能特性 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">5. 平台核心特性</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">系统化课程</h3>
              <p className="text-gray-600 text-sm">30天完整培训体系，从基础到高级全覆盖</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎥</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">视频教学</h3>
              <p className="text-gray-600 text-sm">高清视频课程，支持多倍速播放和章节跳转</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✍️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">作业系统</h3>
              <p className="text-gray-600 text-sm">多样化作业类型，实时反馈和评分</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">成就系统</h3>
              <p className="text-gray-600 text-sm">学习成就激励，证书认证体系</p>
            </div>
          </div>
        </div>

        {/* 用户群体 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">6. 目标用户群体</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  <a href="/courses?type=newcomer" className="hover:underline">外贸新人</a>
                </h3>
                <p className="text-blue-800 text-sm">刚入行需要系统学习外贸知识和技能</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  <a href="/courses?type=student" className="hover:underline">准备做外贸大学生</a>
                </h3>
                <p className="text-green-800 text-sm">提前学习外贸知识，为职业发展做准备</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👔</span>
                </div>
                <h3 className="text-lg font-semibold text-purple-900 mb-2">
                  <a href="/courses?type=boss" className="hover:underline">内贸转外贸老板</a>
                </h3>
                <p className="text-purple-800 text-sm">企业转型需要专业的外贸指导和培训</p>
              </div>
            </div>
          </div>
        </div>

        {/* 行动按钮 */}
        <div className="text-center">
          <div className="space-y-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold"
              onClick={() => router.push('/courses')}
            >
              开始学习之旅
            </Button>
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600"
                onClick={() => router.push(`/contact?source=demo&track=${searchParams.get('track') || ''}`)}
              >
                咨询课程顾问
              </Button>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600"
                onClick={() => router.push('/courses#type-select')}
              >
                选择学习类型
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <span>✅ 19年外贸实战经验</span>
              <span>•</span>
              <span>✅ 30天系统化培训</span>
              <span>•</span>
              <span>✅ 个人IP打造指导</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
