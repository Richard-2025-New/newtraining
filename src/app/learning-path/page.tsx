'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Target, Clock, CheckCircle, ArrowRight, BookOpen, Users, Award, 
  TrendingUp, MapPin, Calendar, Star, Play, FileText 
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetAudience: string[];
  courses: string[];
  milestones: {
    week: number;
    title: string;
    description: string;
    tasks: string[];
  }[];
  outcomes: string[];
  featured: boolean;
}

export default function LearningPathPage() {
  const router = useRouter();
  // 修正：使用别名 user: currentUser
  const { courses, user: currentUser } = useAppStore();
  const [selectedPath, setSelectedPath] = useState<string>('');

  const learningPaths: LearningPath[] = [
    {
      id: 'newcomer',
      title: '外贸新人快速入门路径',
      description: '专为外贸新人设计，从基础概念到实际操作，30天快速掌握外贸核心技能',
      duration: '30天',
      difficulty: 'beginner',
      targetAudience: ['外贸新人', '应届毕业生'],
      courses: ['course1', 'course2', 'course3'],
      featured: true,
      milestones: [
        {
          week: 1,
          title: '外贸基础认知',
          description: '了解外贸行业基本流程和术语',
          tasks: [
            '学习外贸基本流程',
            '掌握国际贸易术语',
            '了解外贸风险防控',
            '熟悉外贸单证类型'
          ]
        },
        {
          week: 2,
          title: '客户开发技巧',
          description: '掌握多渠道客户开发方法',
          tasks: [
            '学习B2B平台操作',
            '掌握社媒开发技巧',
            '练习邮件写作',
            '建立客户档案'
          ]
        },
        {
          week: 3,
          title: '商务谈判实务',
          description: '提升谈判技巧，促成订单成交',
          tasks: [
            '学习报价策略',
            '掌握谈判技巧',
            '处理客户异议',
            '合同签订要点'
          ]
        },
        {
          week: 4,
          title: '订单执行管理',
          description: '确保订单顺利执行，客户满意',
          tasks: [
            '跟进生产进度',
            '质量检验把控',
            '物流运输安排',
            '售后服务维护'
          ]
        }
      ],
      outcomes: [
        '掌握完整外贸流程',
        '独立开发海外客户',
        '熟练商务谈判技巧',
        '具备风险防控意识'
      ]
    },
    {
      id: 'boss-transition',
      title: '内贸老板外贸转型路径',
      description: '帮助内贸企业老板快速转型外贸，从战略到执行全方位指导',
      duration: '60天',
      difficulty: 'intermediate',
      targetAudience: ['内贸老板', '企业主', '管理层'],
      courses: ['course4', 'course5', 'course6'],
      featured: true,
      milestones: [
        {
          week: 1,
          title: '外贸市场分析',
          description: '分析目标市场，制定转型策略',
          tasks: [
            '市场调研分析',
            '竞争对手研究',
            '产品定位策略',
            '转型路径规划'
          ]
        },
        {
          week: 2,
          title: '团队建设搭建',
          description: '组建专业外贸团队',
          tasks: [
            '招聘外贸人才',
            '建立考核机制',
            '制定培训计划',
            '搭建管理体系'
          ]
        },
        {
          week: 3,
          title: '渠道建设开发',
          description: '建立多元化销售渠道',
          tasks: [
            'B2B平台搭建',
            '独立站建设',
            '社媒营销布局',
            '展会参与策划'
          ]
        },
        {
          week: 4,
          title: '品牌出海策略',
          description: '打造国际化品牌形象',
          tasks: [
            '品牌定位设计',
            '营销策略制定',
            '内容营销规划',
            'PR传播策略'
          ]
        },
        {
          week: 5,
          title: '供应链优化',
          description: '优化供应链，提升竞争力',
          tasks: [
            '供应商管理',
            '成本控制优化',
            '质量体系建设',
            '交期管理提升'
          ]
        },
        {
          week: 6,
          title: '合规风险管控',
          description: '确保合规经营，防控各类风险',
          tasks: [
            '贸易合规要求',
            '知识产权保护',
            '汇率风险管理',
            '法律风险防范'
          ]
        }
      ],
      outcomes: [
        '建立完善外贸体系',
        '组建专业外贸团队',
        '打造国际品牌形像',
        '实现持续盈利增长'
      ]
    },
    {
      id: 'student-entrepreneur',
      title: '大学生外贸创业路径',
      description: '专为大学生设计的创业路径，从0到1建立外贸事业',
      duration: '90天',
      difficulty: 'beginner',
      targetAudience: ['大学生', '创业者', '初创团队'],
      courses: ['course7', 'course8', 'course9'],
      featured: false,
      milestones: [
        {
          week: 1,
          title: '创业基础准备',
          description: '了解外贸创业的基本要求和准备',
          tasks: [
            '市场调研验证',
            '商业模式设计',
            '启动资金规划',
            '法律注册流程'
          ]
        },
        {
          week: 2,
          title: '产品选择定位',
          description: '选择适合的产品和市场定位',
          tasks: [
            '产品选择策略',
            '供应链对接',
            '定价策略制定',
            '竞争优势分析'
          ]
        },
        {
          week: 3,
          title: '平台搭建上线',
          description: '建立线上展示和销售平台',
          tasks: [
            'Alibaba店铺开设',
            '产品上架优化',
            '公司主页建设',
            'SEO基础优化'
          ]
        },
        {
          week: 4,
          title: '客户开发实操',
          description: '实际操作客户开发和跟进',
          tasks: [
            'RFQ报价实操',
            '客户沟通演练',
            '样品寄送跟进',
            '订单谈判实战'
          ]
        },
        {
          week: 5,
          title: '运营管理优化',
          description: '优化日常运营和管理流程',
          tasks: [
            '订单管理系统',
            '客户关系维护',
            '数据分析优化',
            '流程标准化'
          ]
        },
        {
          week: 6,
          title: '规模化发展',
          description: '制定规模化发展策略',
          tasks: [
            '团队扩充计划',
            '产品线扩展',
            '市场多元化',
            '品牌建设计划'
          ]
        }
      ],
      outcomes: [
        '成功注册外贸公司',
        '完成首单外贸业务',
        '建立稳定客户群体',
        '具备独立运营能力'
      ]
    },
    {
      id: 'advanced-expert',
      title: '外贸高手进阶路径',
      description: '为有经验的外贸人提供高级技能提升，成为行业专家',
      duration: '45天',
      difficulty: 'advanced',
      targetAudience: ['有经验外贸人', '资深业务员', '团队主管'],
      courses: ['course10', 'course11', 'course12'],
      featured: false,
      milestones: [
        {
          week: 1,
          title: '高级营销策略',
          description: '掌握高级市场营销和客户开发策略',
          tasks: [
            '内容营销深度',
            'SEO高级技巧',
            '社媒营销进阶',
            '品牌影响力'
          ]
        },
        {
          week: 2,
          title: '大客户管理',
          description: '学习大客户开发和维护技巧',
          tasks: [
            '大客户识别',
            '关系维护策略',
            '项目管理技能',
            '长期合作建立'
          ]
        },
        {
          week: 3,
          title: '团队管理技能',
          description: '提升团队管理和领导能力',
          tasks: [
            '团队建设方法',
            '绩效考核设计',
            '激励机制建立',
            '培训体系搭建'
          ]
        },
        {
          week: 4,
          title: '战略思维培养',
          description: '培养战略思维和商业洞察力',
          tasks: [
            '市场趋势分析',
            '商业模式创新',
            '风险管理策略',
            '长期规划制定'
          ]
        },
        {
          week: 5,
          title: '数字化工具应用',
          description: '熟练运用各种数字化工具和系统',
          tasks: [
            'CRM系统应用',
            '数据分析工具',
            '自动化营销',
            'AI工具使用'
          ]
        }
      ],
      outcomes: [
        '成为外贸营销专家',
        '具备战略思维能力',
        '掌握团队管理技能',
        '实现业绩倍增目标'
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '初级';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return '未知';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-900">学习路径</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">个性化学习路径规划</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面介绍 */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">选择适合您的学习路径</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            根据您的背景和目标，我们为您量身定制了专业的学习路径。每条路径都经过精心设计，
            确保您能够系统性地掌握所需技能，快速实现职业目标。
          </p>
        </div>

        {/* 推荐路径（特色） */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="w-6 h-6 text-yellow-500 mr-2" />
            推荐学习路径
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {learningPaths.filter(path => path.featured).map((path) => (
              <div key={path.id} className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-200">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-20`}>
                      推荐路径
                    </span>
                    <span className="text-sm opacity-90">{path.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                  <p className="text-sm opacity-90 mb-4">{path.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(path.difficulty)}`}>
                      {getDifficultyText(path.difficulty)}
                    </span>
                    <div className="flex items-center space-x-1 text-xs">
                      <Users className="w-3 h-3" />
                      <span>{path.targetAudience.join('、')}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">学习成果</h4>
                    <ul className="space-y-1">
                      {path.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => router.push(`/courses?type=${encodeURIComponent(path.id)}`)}
                    className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    选择此路径
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 所有学习路径 */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">所有学习路径</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {learningPaths.map((path) => (
              <div key={path.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(path.difficulty)}`}>
                      {getDifficultyText(path.difficulty)}
                    </span>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{path.duration}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{path.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{path.description}</p>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">适合人群</h4>
                    <div className="flex flex-wrap gap-1">
                      {path.targetAudience.map((audience) => (
                        <span
                          key={audience}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                          {audience}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">学习成果</h4>
                    <ul className="space-y-1">
                      {path.outcomes.slice(0, 2).map((outcome, index) => (
                        <li key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                      {path.outcomes.length > 2 && (
                        <li className="text-xs text-gray-500">
                          +{path.outcomes.length - 2} 更多成果...
                        </li>
                      )}
                    </ul>
                  </div>
                  <button
                    onClick={() => setSelectedPath(path.id)}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    查看详情
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 路径详情模态框 */}
        {selectedPath && (() => {
          const path = learningPaths.find(p => p.id === selectedPath);
          if (!path) return null;
          
          return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{path.title}</h2>
                      <p className="text-gray-600">{path.description}</p>
                    </div>
                    <button
                      onClick={() => setSelectedPath('')}
                      className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">学习里程碑</h3>
                      <div className="space-y-4">
                        {path.milestones.map((milestone, index) => (
                          <div key={index} className="flex space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                {milestone.week}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">{milestone.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                              <ul className="space-y-1">
                                {milestone.tasks.map((task, taskIndex) => (
                                  <li key={taskIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                                    <span>{task}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">预期成果</h3>
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <ul className="space-y-2">
                          {path.outcomes.map((outcome, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span className="text-gray-700">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-medium text-blue-900 mb-2">路径信息</h4>
                          <div className="space-y-2 text-sm text-blue-800">
                            <div className="flex justify-between">
                              <span>学习周期：</span>
                              <span className="font-medium">{path.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>难度等级：</span>
                              <span className="font-medium">{getDifficultyText(path.difficulty)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>适合人群：</span>
                              <span className="font-medium">{path.targetAudience.join('、')}</span>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => {
                            if (currentUser) {
                              router.push('/courses');
                            } else {
                              router.push('/login');
                            }
                          }}
                          className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          {currentUser ? '开始学习' : '登录后学习'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 个性化推荐 */}
        {currentUser && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Target className="w-6 h-6 text-blue-600 mr-2" />
              为您推荐
            </h3>
            <p className="text-gray-700 mb-6">
              基于您的用户类型「{currentUser.userType}」，我们为您推荐最适合的学习路径
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningPaths
                .filter(path => path.targetAudience.includes(currentUser.userType))
                .map((path) => (
                  <div key={path.id} className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{path.title}</h4>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        推荐
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{path.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{path.duration}</span>
                      <button
                        onClick={() => setSelectedPath(path.id)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        查看详情
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
