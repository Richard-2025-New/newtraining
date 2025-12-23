import { cn } from '@/lib/utils'
import { Users, GraduationCap, Building2 } from 'lucide-react'

export interface UserType {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  gradient: string
  features: string[]
  targetAudience: string
}

const userTypes: UserType[] = [
  {
    id: 'newcomer',
    title: '外贸新人',
    description: '零基础入门，快速掌握外贸核心技能',
    icon: Users,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    features: ['30天速成体系', '1对1答疑', '终身更新', '就业推荐'],
    targetAudience: '外贸新人、转行人员'
  },
  {
    id: 'student',
    title: '准备做外贸大学生',
    description: '从校园到职场，完美过渡外贸行业',
    icon: GraduationCap,
    color: 'green',
    gradient: 'from-green-500 to-green-600',
    features: ['职业规划', '实习推荐', '简历优化', '面试指导'],
    targetAudience: '应届毕业生、在校大学生'
  },
  {
    id: 'boss',
    title: '内贸转外贸老板',
    description: '传统企业转型，开拓海外市场',
    icon: Building2,
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600',
    features: ['团队搭建', '渠道布局', '合规风控', '战略规划'],
    targetAudience: '企业老板、管理层'
  }
]

export interface UserTypeSelectorProps {
  selectedType?: string
  onSelectType?: (type: string) => void
  className?: string
}

export function UserTypeSelector({ selectedType, onSelectType, className }: UserTypeSelectorProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-6', className)}>
      {userTypes.map((type) => {
        const Icon = type.icon
        const isSelected = selectedType === type.id
        
        return (
          <div
            key={type.id}
            className={cn(
              'relative group cursor-pointer transition-all duration-300',
              'bg-white rounded-2xl shadow-lg hover:shadow-xl border-2',
              isSelected ? `border-${type.color}-500 shadow-xl ring-2 ring-${type.color}-200` : 'border-gray-200 hover:border-gray-300',
              'hover:transform hover:scale-105'
            )}
            onClick={() => onSelectType?.(type.id)}
          >
            {/* 选中状态指示器 */}
            {isSelected && (
              <div className={`absolute -top-2 -right-2 w-6 h-6 bg-${type.color}-500 rounded-full flex items-center justify-center animate-pulse`}>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
            
            <div className="p-8">
              {/* 图标和标题 */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${type.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </div>
              
              {/* 特性列表 */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">核心优势：</h4>
                <ul className="space-y-2">
                  {type.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <div className={`w-1.5 h-1.5 bg-${type.color}-500 rounded-full mr-3`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* 目标人群 */}
              <div className="mb-6">
                <span className={`inline-block px-3 py-1 bg-${type.color}-50 text-${type.color}-700 text-xs rounded-full`}>
                  适合：{type.targetAudience}
                </span>
              </div>
              
              {/* 行动按钮 */}
              <button
                className={`w-full bg-gradient-to-r ${type.gradient} text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
              >
                选择{type.title}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { userTypes }
