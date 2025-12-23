'use client'

import { useState } from 'react'
import { VideoPlayerAdvanced } from '@/components/ui/video-player-advanced'
import { AssignmentSystem } from '@/components/ui/assignment-system'
import { CourseTimeline } from '@/components/ui/course-timeline'
import { UserTypeSelector } from '@/components/ui/user-type-selector'

export default function TestPage() {
  const [selectedUserType, setSelectedUserType] = useState<string>('')

  const testAssignment = {
    id: 'test-assignment-1',
    type: 'essay' as const,
    title: '测试作业',
    description: '请根据本周学习内容，撰写一份关于外贸行业认知的报告，包括行业现状、发展趋势和个人定位。字数要求：1000-1500字。',
    deadline: '2024-01-15',
    maxScore: 100,
    requirements: [
      '分析外贸行业当前现状',
      '预测未来发展趋势',
      '明确个人在行业的定位',
      '提出具体的学习计划'
    ],
    status: 'pending' as const
  }

  const testChapters = [
    {
      id: '1',
      title: '第1周：外贸基础认知',
      duration: '7天',
      type: 'foundation' as const,
      description: '建立外贸基础认知，了解行业全貌和核心概念',
      lessons: [
        {
          id: '1-1',
          title: '外贸行业全景图',
          duration: '15:30',
          type: 'video' as const,
          completed: true,
          locked: false
        },
        {
          id: '1-2',
          title: '外贸流程核心环节',
          duration: '22:15',
          type: 'video' as const,
          completed: true,
          locked: false
        },
        {
          id: '1-3',
          title: '第一周作业：行业认知报告',
          duration: '30分钟',
          type: 'assignment' as const,
          completed: false,
          locked: false
        }
      ]
    },
    {
      id: '2',
      title: '第2周：客户开发实战',
      duration: '7天',
      type: 'practice' as const,
      description: '掌握客户开发技巧，学会寻找和维护客户',
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">组件测试页面</h1>
        
        {/* 用户类型选择器测试 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">用户类型选择器</h2>
          <UserTypeSelector 
            selectedType={selectedUserType}
            onSelectType={setSelectedUserType}
          />
          {selectedUserType && (
            <p className="mt-4 text-sm text-gray-600">已选择：{selectedUserType}</p>
          )}
        </div>

        {/* 视频播放器测试 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">高级视频播放器</h2>
          <VideoPlayerAdvanced
            src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Foreign%20trade%20training%20video%20thumbnail%2C%20professional%20presentation%2C%20business%20documents%2C%20clean%20design&image_size=square"
            title="外贸行业全景图 - 测试视频"
            onComplete={() => console.log('视频播放完成')}
          />
        </div>

        {/* 作业系统测试 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">作业系统</h2>
          <AssignmentSystem
            assignment={testAssignment}
            userId="test-user"
            courseId="test-course"
            onSubmit={(id, submission) => console.log('作业提交：', id, submission)}
          />
        </div>

        {/* 课程时间轴测试 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">课程时间轴</h2>
          <CourseTimeline
            chapters={testChapters}
            currentChapter={1}
            currentLesson={0}
            onLessonSelect={(chapterIndex, lessonIndex) => 
              console.log(`选择课程：第${chapterIndex + 1}章，第${lessonIndex + 1}节`)
            }
          />
        </div>
      </div>
    </div>
  )
}
