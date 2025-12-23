'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAppStore } from '@/store/appStore'
import { VideoPlayer } from '@/components/ui/video-player'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeft, ChevronRight, Menu, FileText, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LearnPage() {
  const params = useParams()
  const router = useRouter()
<<<<<<< HEAD
  const { 
    courses, 
    updateLessonProgress,
    addCompletedLesson,
    updateCourseProgress
  } = useAppStore()
=======
  const { courses, updateLessonProgress, addCompletedLesson, updateCourseProgress } = useAppStore()
>>>>>>> 543f6950a582ae677cf3fd4bd67ce36b28773968

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('content')

  const courseId = params.courseId as string
  const lessonId = params.lessonId as string

<<<<<<< HEAD
  const course = courses.find(c => c.id === courseId)
  
  // 查找当前章节和课程
  const currentChapterIndex = course?.chapters?.findIndex(
    c => c.lessons.some(l => l.id === lessonId)
  ) ?? 0
  
  const currentChapter = course?.chapters?.[currentChapterIndex]
  const currentLessonIndex = currentChapter?.lessons.findIndex(l => l.id === lessonId) ?? 0
  const currentLesson = currentChapter?.lessons[currentLessonIndex]

  // 自动保存进度
  useEffect(() => {
    if (course && currentLesson) {
      // 记录最后学习位置
=======
  const course = courses.find(c => String(c.id) === String(courseId))
  const currentChapterIndex =
    course?.chapters?.findIndex(ch => ch.lessons.some(ls => String(ls.id) === String(lessonId))) ?? -1
  const currentChapter = currentChapterIndex >= 0 ? course?.chapters?.[currentChapterIndex] : undefined
  const currentLessonIndex = currentChapter?.lessons.findIndex(l => String(l.id) === String(lessonId)) ?? -1
  const currentLesson =
    currentLessonIndex >= 0 && currentChapter ? currentChapter.lessons[currentLessonIndex] : undefined

  useEffect(() => {
    if (course && currentLesson) {
>>>>>>> 543f6950a582ae677cf3fd4bd67ce36b28773968
      localStorage.setItem(`last_lesson_${courseId}`, lessonId)
    }
  }, [course, courseId, lessonId, currentLesson])

  if (!course || !currentLesson) {
    return <div className="flex items-center justify-center h-screen">加载中...</div>
  }

  const handleLessonComplete = () => {
    updateLessonProgress(courseId, currentChapterIndex, currentLessonIndex, true)
    addCompletedLesson(lessonId)
<<<<<<< HEAD
    
    // 计算并更新总进度
    const totalLessons = course.chapters?.reduce((acc, ch) => acc + ch.lessons.length, 0) || 0
    const completedCount = course.chapters?.reduce((acc, ch) => 
      acc + ch.lessons.filter(l => l.completed).length, 0
    ) || 0
    
=======
    const totalLessons = course.chapters?.reduce((acc, ch) => acc + ch.lessons.length, 0) || 0
    const completedCount =
      course.chapters?.reduce((acc, ch) => acc + ch.lessons.filter(l => l.completed).length, 0) || 0
>>>>>>> 543f6950a582ae677cf3fd4bd67ce36b28773968
    if (totalLessons > 0) {
      updateCourseProgress(courseId, Math.round((completedCount / totalLessons) * 100))
    }
  }

  const navigateLesson = (direction: 'prev' | 'next') => {
<<<<<<< HEAD
    if (!course.chapters) return

    let nextChapterIndex = currentChapterIndex
    let nextLessonIndex = currentLessonIndex

    if (direction === 'prev') {
      if (currentLessonIndex > 0) {
        nextLessonIndex--
      } else if (currentChapterIndex > 0) {
        nextChapterIndex--
        nextLessonIndex = course.chapters[nextChapterIndex].lessons.length - 1
      } else {
        return // 已经是第一节
      }
    } else {
      if (currentLessonIndex < currentChapter!.lessons.length - 1) {
        nextLessonIndex++
      } else if (currentChapterIndex < course.chapters.length - 1) {
        nextChapterIndex++
        nextLessonIndex = 0
      } else {
        return // 已经是最后一节
      }
    }

=======
    if (!course?.chapters || !currentChapter) return
    let nextChapterIndex = currentChapterIndex
    let nextLessonIndex = currentLessonIndex
    if (direction === 'prev') {
      if (currentLessonIndex > 0) nextLessonIndex--
      else if (currentChapterIndex > 0) {
        nextChapterIndex--
        nextLessonIndex = course.chapters[nextChapterIndex].lessons.length - 1
      } else return
    } else {
      if (currentLessonIndex < currentChapter.lessons.length - 1) nextLessonIndex++
      else if (currentChapterIndex < course.chapters.length - 1) {
        nextChapterIndex++
        nextLessonIndex = 0
      } else return
    }
>>>>>>> 543f6950a582ae677cf3fd4bd67ce36b28773968
    const nextLesson = course.chapters[nextChapterIndex].lessons[nextLessonIndex]
    router.push(`/learn/${courseId}/${nextLesson.id}`)
  }

  return (
    <div className="flex h-screen bg-gray-100">
<<<<<<< HEAD
      {/* 侧边栏 - 课程目录 */}
      <div className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        sidebarOpen ? "w-80" : "w-0 overflow-hidden"
      )}>
=======
      <div className={cn('bg-white border-r border-gray-200 transition-all duration-300 flex flex-col', sidebarOpen ? 'w-80' : 'w-0 overflow-hidden')}>
>>>>>>> 543f6950a582ae677cf3fd4bd67ce36b28773968
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-bold truncate">{course.title}</h2>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
<<<<<<< HEAD
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {course.chapters?.map((chapter, cIndex) => (
            <div key={chapter.id}>
              <h3 className="font-medium text-gray-900 mb-2 text-sm">{chapter.title}</h3>
              <div className="space-y-1">
                {chapter.lessons.map((lesson, lIndex) => {
=======
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {course.chapters?.map((chapter) => (
            <div key={chapter.id}>
              <h3 className="font-medium text-gray-900 mb-2 text-sm">{chapter.title}</h3>
              <div className="space-y-1">
                {chapter.lessons.map((lesson) => {
>>>>>>> 543f6950a582ae677cf3fd4bd67ce36b28773968
                  const isActive = lesson.id === lessonId
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => router.push(`/learn/${courseId}/${lesson.id}`)}
                      className={cn(
<<<<<<< HEAD
                        "w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2",
                        isActive ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50 text-gray-600",
                        lesson.completed && "text-gray-400"
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0",
                        lesson.completed ? "bg-green-500 border-green-500" : "border-gray-300",
                        isActive && !lesson.completed && "border-blue-500"
                      )}>
=======
                        'w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2',
                        isActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-600',
                        lesson.completed && 'text-gray-400'
                      )}
                    >
                      <div
                        className={cn(
                          'w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0',
                          lesson.completed ? 'bg-green-500 border-green-500' : 'border-gray-300',
                          isActive && !lesson.completed && 'border-blue-500'
                        )}
                      >
>>>>>>> 543f6950a582ae677cf3fd4bd67ce36b28773968
                        {lesson.completed && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className="truncate">{lesson.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

<<<<<<< HEAD
      {/* 主内容区 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 顶部导航 */}
=======
      <div className="flex-1 flex flex-col min-w-0">
>>>>>>> 543f6950a582ae677cf3fd4bd67ce36b28773968
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <h1 className="font-semibold text-lg">{currentLesson.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateLesson('prev')}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              上一节
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateLesson('next')}>
              下一节
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

<<<<<<< HEAD
        {/* 内容展示 */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
              {currentLesson.type === 'video' ? (
                <VideoPlayer
                  src={currentLesson.videoUrl || ''}
                  onTimeUpdate={(t) => {
                    // 可以在这里记录具体播放时间
                  }}
                  onDurationChange={(d) => {
                    // 记录视频时长
                  }}
                  onPlay={() => console.log('Playing')}
                  onPause={() => console.log('Paused')}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
=======
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="aspect-video bg黑色 rounded-lg overflow-hidden shadow-lg">
              {currentLesson.type === 'video' ? (
                <VideoPlayer src={currentLesson.videoUrl || ''} onTimeUpdate={() => {}} onDurationChange={() => {}} onPlay={() => {}} onPause={() => {}} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text白色">
>>>>>>> 543f6950a582ae677cf3fd4bd67ce36b28773968
                  <div className="text-center">
                    <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>非视频课程内容</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
<<<<<<< HEAD
              <Button 
                size="lg" 
                className={cn(
                  "w-full sm:w-auto",
                  currentLesson.completed ? "bg-green-600 hover:bg-green-700" : ""
                )}
                onClick={handleLessonComplete}
              >
=======
              <Button size="lg" className={cn('w-full sm:w-auto', currentLesson.completed ? 'bg-green-600 hover:bg-green-700' : '')} onClick={handleLessonComplete}>
>>>>>>> 543f6950a582ae677cf3fd4bd67ce36b28773968
                {currentLesson.completed ? '已完成' : '标记为完成'}
              </Button>
            </div>

<<<<<<< HEAD
            <Tabs value={activeTab} onValueChange={setActiveTab}>
=======
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
>>>>>>> 543f6950a582ae677cf3fd4bd67ce36b28773968
              <TabsList>
                <TabsTrigger value="content">课程详情</TabsTrigger>
                <TabsTrigger value="discussion">讨论区</TabsTrigger>
                <TabsTrigger value="notes">我的笔记</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="mt-4">
                <Card className="p-6">
                  <h3 className="font-bold mb-4">本节重点</h3>
                  <div className="prose max-w-none">
                    <p>{currentLesson.content || '暂无详细内容'}</p>
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="discussion" className="mt-4">
                <Card className="p-6 text-center text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p>暂无讨论</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
