'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, FileText, CheckCircle, Clock, MessageCircle, 
  Star, Download, Eye, Edit3, Send, AlertCircle 
} from 'lucide-react'

export interface Assignment {
  id: string
  title: string
  description: string
  type: 'essay' | 'file' | 'quiz' | 'project'
  deadline: string
  status: 'pending' | 'submitted' | 'graded' | 'overdue'
  maxScore: number
  score?: number
  feedback?: string
  requirements: string[]
  attachments?: {
    name: string
    url: string
    type: string
  }[]
}

export interface AssignmentSubmission {
  id: string
  assignmentId: string
  content: string
  files: File[]
  submittedAt: string
  status: 'submitted' | 'graded' | 'returned'
  score?: number
  feedback?: string
  gradedAt?: string
  gradedBy?: string
}

const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: '客户开发邮件写作',
    description: '根据提供的客户背景信息，撰写一封专业的客户开发邮件。要求语言专业、逻辑清晰、具有说服力。',
    type: 'essay',
    deadline: '2024-01-15',
    status: 'graded',
    maxScore: 100,
    score: 88,
    feedback: '邮件结构清晰，语言表达专业。建议在产品介绍部分增加更多具体数据和案例支持。',
    requirements: [
      '邮件格式规范，包含完整的开头和结尾',
      '产品介绍要突出核心优势和差异化',
      '语言要专业、礼貌，避免语法错误',
      '字数控制在300-500字之间'
    ]
  },
  {
    id: '2',
    title: '外贸单证制作',
    description: '根据提供的交易信息，制作完整的外贸单证套装，包括商业发票、装箱单、提单等。',
    type: 'file',
    deadline: '2024-01-20',
    status: 'submitted',
    maxScore: 100,
    requirements: [
      '单证格式要符合国际贸易标准',
      '所有信息必须准确无误',
      '文件命名要规范，便于识别',
      '提交PDF格式的完整文档'
    ],
    attachments: [
      { name: '单证制作模板.pdf', url: '#', type: 'application/pdf' },
      { name: '交易信息.xlsx', url: '#', type: 'application/vnd.ms-excel' }
    ]
  },
  {
    id: '3',
    title: '国际贸易术语测试',
    description: '完成关于国际贸易术语（Incoterms 2020）的知识测试，检验对各类术语的理解和应用。',
    type: 'quiz',
    deadline: '2024-01-25',
    status: 'pending',
    maxScore: 100,
    requirements: [
      '共20道题目，包含选择题和简答题',
      '答题时间限制为30分钟',
      '允许查阅资料，但不得抄袭',
      '提交前请仔细检查答案'
    ]
  },
  {
    id: '4',
    title: '市场调研报告',
    description: '选择一个目标市场，完成该市场的外贸机会调研报告，包括市场规模、竞争分析、进入策略等。',
    type: 'project',
    deadline: '2024-02-01',
    status: 'overdue',
    maxScore: 150,
    requirements: [
      '报告字数不少于2000字',
      '包含数据图表和分析',
      '提供至少3个参考文献',
      '提出具体的市场进入建议'
    ]
  }
]

const assignmentTypeConfig = {
  essay: { label: '写作作业', color: 'blue', icon: Edit3 },
  file: { label: '文件提交', color: 'green', icon: Upload },
  quiz: { label: '在线测试', color: 'purple', icon: CheckCircle },
  project: { label: '项目作业', color: 'orange', icon: FileText }
}

const statusConfig = {
  pending: { label: '待提交', color: 'yellow', icon: Clock },
  submitted: { label: '已提交', color: 'blue', icon: Send },
  graded: { label: '已评分', color: 'green', icon: CheckCircle },
  overdue: { label: '已逾期', color: 'red', icon: AlertCircle }
}

export interface AssignmentSystemProps {
  assignments?: Assignment[]
  onSubmit?: (assignmentId: string, submission: AssignmentSubmission) => void
  className?: string
  courseId?: string // Added
  userId?: string // Added
  assignment?: Assignment // Added to support single assignment mode
}

export function AssignmentSystem({ 
  assignments: propAssignments, 
  onSubmit,
  className,
  courseId,
  userId,
  assignment // Support single assignment prop
}: AssignmentSystemProps) {
  // If single assignment is passed, wrap it in array. Otherwise use assignments prop or mock.
  const assignments = assignment ? [assignment] : (propAssignments || mockAssignments)

  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [submissionContent, setSubmissionContent] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'submitted' | 'graded' | 'overdue'>('all')
  const [viewAssignment, setViewAssignment] = useState<{ assignment: Assignment, mode: 'feedback' | 'submission' } | null>(null)

  const filteredAssignments = assignments.filter(assignment => {
    if (activeTab === 'all') return true
    return assignment.status === activeTab
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles([...uploadedFiles, ...files])
  }

  const handleSubmit = (assignment: Assignment) => {
    const submission: AssignmentSubmission = {
      id: Date.now().toString(),
      assignmentId: assignment.id,
      content: submissionContent,
      files: uploadedFiles,
      submittedAt: new Date().toISOString(),
      status: 'submitted'
    }
    
    onSubmit?.(assignment.id, submission)
    setSelectedAssignment(null)
    setSubmissionContent('')
    setUploadedFiles([])
  }

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 80) return 'text-blue-600'
    if (percentage >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className={cn('w-full', className)}>
      {/* 标签页 - Only show if we have multiple assignments */}
      {assignments.length > 1 && (
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {(['all', 'pending', 'submitted', 'graded', 'overdue'] as const).map((tab) => {
            const count = assignments.filter(a => tab === 'all' || a.status === tab).length
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors',
                  activeTab === tab
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {tab === 'all' && '全部作业'}
                {tab === 'pending' && '待提交'}
                {tab === 'submitted' && '已提交'}
                {tab === 'graded' && '已评分'}
                {tab === 'overdue' && '已逾期'}
                <span className="ml-1 text-xs">({count})</span>
              </button>
            )
          })}
        </div>
      )}

      {/* 作业列表 */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => {
          const typeConfig = assignmentTypeConfig[assignment.type]
          const statusCfg = statusConfig[assignment.status]
          const TypeIcon = typeConfig.icon
          const StatusIcon = statusCfg.icon
          
          return (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center',
                      `bg-${typeConfig.color}-100`
                    )}>
                      <TypeIcon className={cn('w-6 h-6', `text-${typeConfig.color}-600`)} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                        <Badge className={cn(
                          'text-xs',
                          `bg-${typeConfig.color}-100 text-${typeConfig.color}-700`
                        )}>
                          {typeConfig.label}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2">{assignment.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>截止：{assignment.deadline}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <StatusIcon className="w-4 h-4" />
                          <span className={cn(
                            `text-${statusCfg.color}-600`
                          )}>
                            {statusCfg.label}
                          </span>
                        </div>
                        
                        {assignment.score !== undefined && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className={cn(
                              'font-semibold',
                              getScoreColor(assignment.score, assignment.maxScore)
                            )}>
                              {assignment.score}/{assignment.maxScore}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {assignment.status === 'pending' && (
                      <Button
                        size="sm"
                        onClick={() => setSelectedAssignment(assignment)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        开始作业
                      </Button>
                    )}
                    
                    {assignment.status === 'submitted' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-600"
                        onClick={() => setViewAssignment({ assignment, mode: 'submission' })}
                      >
                        查看提交
                      </Button>
                    )}
                    
                    {assignment.status === 'graded' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-600"
                        onClick={() => setViewAssignment({ assignment, mode: 'feedback' })}
                      >
                        查看反馈
                      </Button>
                    )}
                    
                    {assignment.attachments && assignment.attachments.length > 0 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        下载资料
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {assignment.feedback && (
                <CardContent className="pt-0">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-900">导师反馈</span>
                    </div>
                    <p className="text-gray-700 text-sm">{assignment.feedback}</p>
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      {/* 作业提交模态框 */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">提交作业</h2>
                <button
                  onClick={() => setSelectedAssignment(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">{selectedAssignment.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{selectedAssignment.description}</p>
                
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-blue-900 mb-2">作业要求：</h4>
                  <ul className="space-y-1">
                    {selectedAssignment.requirements.map((req, index) => (
                      <li key={index} className="text-blue-800 text-sm flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* 文本输入 */}
              {selectedAssignment.type === 'essay' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    作业内容
                  </label>
                  <textarea
                    value={submissionContent}
                    onChange={(e) => setSubmissionContent(e.target.value)}
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请输入你的作业内容..."
                  />
                </div>
              )}

              {/* 文件上传 */}
              {(selectedAssignment.type === 'file' || selectedAssignment.type === 'project') && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    上传文件
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">点击上传文件或拖拽文件到此处</span>
                    </label>
                  </div>
                  
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">已上传文件：</h4>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <button
                              onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                              className="text-red-500 hover:text-red-700"
                            >
                              删除
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedAssignment(null)}
                  className="border-gray-300 text-gray-700"
                >
                  取消
                </Button>
                <Button
                  onClick={() => handleSubmit(selectedAssignment)}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!submissionContent && uploadedFiles.length === 0}
                >
                  提交作业
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 查看提交/反馈模态框 */}
      {viewAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {viewAssignment.mode === 'submission' ? '查看提交' : '查看反馈'}
                </h2>
                <button className="text-gray-400 hover:text-gray-600" onClick={() => setViewAssignment(null)}>✕</button>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">{viewAssignment.assignment.title}</h3>
              {viewAssignment.mode === 'submission' && (
                <div className="space-y-3 text-sm text-gray-700">
                  <p>该作业已提交，等待评分。如需修改请联系导师。</p>
                  {viewAssignment.assignment.attachments && viewAssignment.assignment.attachments.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">相关资料：</h4>
                      <ul className="space-y-1">
                        {viewAssignment.assignment.attachments.map((a, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Download className="w-4 h-4 text-gray-500" />
                            <a href={a.url} className="text-blue-600 hover:underline">{a.name}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {viewAssignment.mode === 'feedback' && (
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>成绩：{viewAssignment.assignment.score}/{viewAssignment.assignment.maxScore}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-900">导师反馈</span>
                    </div>
                    <p>{viewAssignment.assignment.feedback || '暂无反馈'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
