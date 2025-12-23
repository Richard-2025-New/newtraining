'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/appStore';
import { CourseCard } from '@/components/ui/course-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Briefcase, GraduationCap, User } from 'lucide-react';

export default function CoursesPage() {
  const { courses } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  // 扩展课程数据以匹配 CourseCard 接口
  const enhancedCourses = courses.map(course => ({
    ...course,
    instructor: 'Richard', // 默认讲师
    originalPrice: Math.round(course.price * 1.5), // 模拟原价
    reviewCount: 120 + Math.floor(Math.random() * 100),
    studentCount: course.students || 100 + Math.floor(Math.random() * 500),
    level: 'beginner' as const, // 默认等级，实际应从 store 获取
    thumbnail: '',
    isHot: course.students > 500,
    isNew: false,
    features: ['30天速成', '实战案例', '1对1答疑']
  }));

  const filteredCourses = enhancedCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    // const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: '全部课程' },
    { id: '外贸新人', label: '外贸新人' },
    { id: '大学生', label: '大学生' },
    { id: '老板培训', label: '老板/高管' },
    { id: '进阶技能', label: '进阶技能' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">课程中心</h1>
          <p className="text-gray-600 max-w-2xl">
            19年外贸实战经验浓缩，体系化流程落地 + 高阶思维重塑，助你快速掌握外贸核心技能。
          </p>
          
          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="搜索课程关键词..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`whitespace-nowrap ${selectedCategory === category.id ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">没有找到相关课程</h3>
            <p className="text-gray-500">尝试更换搜索关键词或筛选条件</p>
            <Button 
              variant="link" 
              onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}
              className="mt-4 text-blue-600"
            >
              清除所有筛选
            </Button>
          </div>
        )}
      </div>

      {/* 底部引导 - 双通道再次入口 */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">不知道选哪个课程？</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            根据你的职业阶段，我们为你定制了专属的学习成长路径
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/tracks#newbie">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 w-full sm:w-auto">
                <User className="mr-2 h-5 w-5" />
                我是新人/大学生
              </Button>
            </Link>
            <Link href="/tracks#boss">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                <Briefcase className="mr-2 h-5 w-5" />
                我是老板/高管
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
