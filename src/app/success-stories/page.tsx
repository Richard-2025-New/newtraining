'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Calendar, TrendingUp, Award, Users, BookOpen, ArrowRight, Quote } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

interface SuccessStory {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  before: string;
  after: string;
  achievement: string;
  duration: string;
  rating: number;
  tags: string[];
  quote: string;
}

export default function SuccessStoriesPage() {
  const router = useRouter();
  const { courses } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const successStories: SuccessStory[] = [
    {
      id: '1',
      name: '张小明',
      avatar: '张',
      title: '外贸新人到业务主管',
      company: '深圳某电子科技公司',
      before: '刚毕业，对外贸行业一无所知，面试多次被拒',
      after: '3个月内成功开发5个客户，月销售额突破50万，晋升为业务主管',
      achievement: '月销售额50万+，开发客户5个',
      duration: '3个月',
      rating: 5,
      tags: ['外贸新人', '快速上手', '客户开发'],
      quote: '李老师的课程让我少走了很多弯路，从0到1的系统性学习让我快速找到了方向。'
    },
    {
      id: '2',
      name: '王美丽',
      avatar: '王',
      title: '内贸老板成功转型',
      company: '东莞某家具制造厂',
      before: '做了10年内贸，受疫情冲击，急需转型外贸但不知从何开始',
      after: '6个月内建立完整外贸团队，开拓3个海外市场，年出口额达800万',
      achievement: '年出口额800万，团队5人',
      duration: '6个月',
      rating: 5,
      tags: ['内贸转外贸', '团队建设', '市场开拓'],
      quote: '从国内到国外的转型不容易，但系统的培训让我找到了正确的方法，现在我们的外贸业务已经超过了内贸。'
    },
    {
      id: '3',
      name: '李华',
      avatar: '李',
      title: '大学生创业成功',
      company: '广州某贸易公司（自主创业）',
      before: '大四学生，有创业想法但缺乏经验和资金',
      after: '毕业前成功注册公司，通过Alibaba平台接到第一笔10万美元订单',
      achievement: '公司成立，首单10万美元',
      duration: '4个月',
      rating: 5,
      tags: ['大学生', '创业', '平台操作'],
      quote: '还在学校就开始学习，让我比同龄人领先了一大步。现在我已经有了自己的外贸公司。'
    },
    {
      id: '4',
      name: '陈建国',
      avatar: '陈',
      title: '传统工厂外贸升级',
      company: '佛山某建材厂',
      before: '传统制造业工厂，主要依靠中间商出口，利润微薄',
      after: '建立自主品牌，直接对接海外客户，利润率提升30%，订单量翻倍',
      achievement: '利润率提升30%，订单翻倍',
      duration: '8个月',
      rating: 5,
      tags: ['传统工厂', '品牌建设', '利润提升'],
      quote: '从代工到自主品牌，这个转变让我们的利润空间大大提升，感谢专业的指导。'
    },
    {
      id: '5',
      name: '刘芳',
      avatar: '刘',
      title: 'SOHO一族自由职业',
      company: '自由外贸人',
      before: '全职妈妈，希望找到可以在家工作的机会',
      after: '成为专业外贸SOHO，月收入稳定在3-5万，时间自由安排',
      achievement: '月收入3-5万，时间自由',
      duration: '5个月',
      rating: 5,
      tags: ['SOHO', '自由职业', '在家工作'],
      quote: '既能照顾家庭又有稳定收入，SOHO外贸让我找到了完美的平衡点。'
    },
    {
      id: '6',
      name: '赵强',
      avatar: '赵',
      title: '外贸业务员到经理',
      company: '上海某进出口公司',
      before: '普通外贸业务员，业绩平平，晋升无望',
      after: '掌握高级开发技巧，个人年销售额达1200万，晋升为外贸经理',
      achievement: '年销售额1200万，成功晋升',
      duration: '1年',
      rating: 5,
      tags: ['业务提升', '销售技巧', '职业发展'],
      quote: '系统的学习让我的业务能力有了质的飞跃，现在我已经是公司的外贸经理了。'
    }
  ];

  const categories = [
    { id: 'all', name: '全部案例', count: successStories.length },
    { id: '外贸新人', name: '外贸新人', count: 2 },
    { id: '内贸转外贸', name: '内贸转外贸', count: 2 },
    { id: '大学生', name: '大学生', count: 1 },
    { id: 'SOHO', name: 'SOHO自由', count: 1 }
  ];

  const filteredStories = selectedCategory === 'all' 
    ? successStories 
    : successStories.filter(story => story.tags.includes(selectedCategory));

  const stats = {
    totalStudents: 2500,
    successRate: 92,
    avgSalaryIncrease: 150,
    totalCompanies: 180
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-900">成功案例</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">已有 {stats.totalStudents}+ 学员成功转型</span>
            </div>
          </div>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalStudents}+</div>
            <div className="text-sm text-gray-600">总学员数量</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.successRate}%</div>
            <div className="text-sm text-gray-600">成功率</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.avgSalaryIncrease}%</div>
            <div className="text-sm text-gray-600">平均薪资提升</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats.totalCompanies}+</div>
            <div className="text-sm text-gray-600">合作企业</div>
          </div>
        </div>

        {/* 分类筛选 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">学员类型</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* 成功案例列表 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStories.map((story) => (
            <div key={story.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* 案例头部 */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-lg font-bold">
                    {story.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{story.name}</h3>
                    <p className="text-sm opacity-90">{story.company}</p>
                  </div>
                </div>
                <h4 className="text-lg font-bold mb-2">{story.title}</h4>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{story.duration}</span>
                  </div>
                </div>
              </div>

              {/* 案例内容 */}
              <div className="p-6">
                {/* 转型前后对比 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-red-50 rounded-lg p-4">
                    <h5 className="font-medium text-red-800 mb-2 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1 transform rotate-180" />
                      学习前
                    </h5>
                    <p className="text-sm text-red-700">{story.before}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-medium text-green-800 mb-2 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      学习后
                    </h5>
                    <p className="text-sm text-green-700">{story.after}</p>
                  </div>
                </div>

                {/* 成就亮点 */}
                <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                  <h5 className="font-medium text-yellow-800 mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    主要成就
                  </h5>
                  <p className="text-sm text-yellow-700">{story.achievement}</p>
                </div>

                {/* 学员感言 */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <Quote className="w-6 h-6 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-700 italic">{story.quote}</p>
                </div>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 操作按钮 */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => router.push('/courses#type-select')}
                    className="flex-1 px-4 py-2 bg-blue-600 text白色 text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>开始学习</span>
                  </button>
                  <button
                    onClick={() => router.push('/offline')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>学习路径</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">准备好开始您的外贸之旅了吗？</h2>
            <p className="text-lg mb-6 opacity-90">
              加入我们的培训计划，成为下一个成功案例
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/courses#type-select')}
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                查看课程
              </button>
              <button
                onClick={() => router.push('/contact')}
                className="px-6 py-3 border-2 border-white text白色 font-medium rounded-lg hover:bg白色 hover:text-blue-600 transition-colors"
              >
                定制学习路径
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
