import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Rating } from '@/components/ui/rating'
import { Button } from '@/components/ui/button'
import { Clock, Users, PlayCircle, CheckCircle, ChevronRight } from 'lucide-react'

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  duration: string
  studentCount: number
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  thumbnail: string
  isHot?: boolean
  isNew?: boolean
  features?: string[] // 新增课程特色字段
}

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const levelColors = {
    beginner: 'success',
    intermediate: 'default',
    advanced: 'destructive',
  } as const

  const levelLabels = {
    beginner: '初级',
    intermediate: '中级',
    advanced: '高级',
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-t-4 border-t-transparent hover:border-t-blue-600 overflow-hidden flex flex-col h-full">
      <Link href={`/courses/${course.id}`} className="block relative overflow-hidden">
        <div className="aspect-[16/9] bg-gradient-to-br from-gray-900 to-gray-800 relative group-hover:scale-105 transition-transform duration-500">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* 讲师头像占位 */}
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold border-2 border-white/20">
              {course.instructor.charAt(0)}
            </div>
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md rounded-full p-4">
              <PlayCircle className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex space-x-2 z-10">
          {course.isHot && <Badge variant="destructive" className="shadow-sm">🔥 热门</Badge>}
          {course.isNew && <Badge variant="success" className="shadow-sm">🆕 新课</Badge>}
        </div>
        
        {/* 讲师标签 */}
        <div className="absolute bottom-3 right-3 z-10">
          <Badge variant="secondary" className="bg-black/60 text-white hover:bg-black/70 backdrop-blur-sm border-0">
            {course.instructor}
          </Badge>
        </div>
      </Link>

      <CardContent className="flex-1 p-6 pt-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                {course.category}
              </span>
              <div className="flex items-center gap-1">
                <Rating value={course.rating} size="sm" />
                <span className="text-xs text-gray-400">({course.reviewCount})</span>
              </div>
            </div>
            
            <Link href={`/courses/${course.id}`}>
              <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-2 min-h-[56px]">
                {course.title}
              </h3>
            </Link>
            
            <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px] mb-4">
              {course.description}
            </p>

            {/* 课程特色列表 */}
            {course.features && course.features.length > 0 && (
              <div className="space-y-1 mb-4">
                {course.features.slice(0, 2).map((feature, idx) => (
                  <div key={idx} className="flex items-center text-xs text-gray-500">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-1.5" />
                    {feature}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <div className="px-6 pb-6 mt-auto">
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-red-600">¥{course.price}</span>
              {course.originalPrice && (
                <span className="text-xs text-gray-400 line-through">¥{course.originalPrice}</span>
              )}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <span>{course.studentCount}人已报名</span>
            </div>
          </div>
          
          <Link href={`/courses/${course.id}`}>
            <Button size="sm" className={`bg-gray-900 hover:bg-blue-600 text-white transition-colors`}>
              查看详情
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}