'use client'

import React from 'react'
import { CheckCircle, Lock, Play, FileText, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Lesson {
  id: string
  title: string
  completed?: boolean
  type?: 'video' | 'assignment' | 'quiz' | 'text'
  locked?: boolean
  duration?: string
}

interface Chapter {
  id: string
  title: string
  lessons: Lesson[]
}

interface CourseTimelineProps {
  chapters: Chapter[]
  currentChapter: number
  currentLesson: number
  onLessonSelect: (chapterIndex: number, lessonIndex: number) => void
}

export function CourseTimeline({ 
  chapters, 
  currentChapter, 
  currentLesson, 
  onLessonSelect 
}: CourseTimelineProps) {
  const getIcon = (type?: string) => {
    switch (type) {
      case 'video': return Play
      case 'assignment': return FileText
      case 'quiz': return HelpCircle
      default: return Play
    }
  }

  return (
    <div className="space-y-6">
      {chapters.map((chapter, cIndex) => (
        <div key={chapter.id} className="relative">
          {/* Chapter Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {cIndex + 1}
            </div>
            <h3 className="font-semibold text-lg text-gray-900">{chapter.title}</h3>
          </div>

          {/* Lessons List */}
          <div className="ml-4 pl-8 border-l-2 border-gray-100 space-y-4">
            {chapter.lessons.map((lesson, lIndex) => {
              const Icon = getIcon(lesson.type)
              const isActive = cIndex === currentChapter && lIndex === currentLesson
              const isLocked = lesson.locked
              const isCompleted = lesson.completed

              return (
                <div
                  key={lesson.id}
                  onClick={() => !isLocked && onLessonSelect(cIndex, lIndex)}
                  className={cn(
                    "relative flex items-center gap-4 p-3 rounded-lg transition-all cursor-pointer border",
                    isActive 
                      ? "bg-blue-50 border-blue-200 shadow-sm" 
                      : "hover:bg-gray-50 border-transparent",
                    isLocked && "opacity-60 cursor-not-allowed bg-gray-50"
                  )}
                >
                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : isLocked ? (
                      <Lock className="w-5 h-5 text-gray-400" />
                    ) : (
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2",
                        isActive ? "border-blue-500 bg-blue-500" : "border-gray-300"
                      )} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-medium truncate",
                      isActive ? "text-blue-700" : "text-gray-700"
                    )}>
                      {lesson.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Icon className="w-3 h-3" />
                        {lesson.type === 'video' ? '视频' : lesson.type === 'assignment' ? '作业' : '测验'}
                      </span>
                      {lesson.duration && (
                        <span>{lesson.duration}</span>
                      )}
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-x-[3px] -translate-y-1/2 w-1.5 h-8 bg-blue-500 rounded-r-full" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
