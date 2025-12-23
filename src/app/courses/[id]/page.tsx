'use client';
import React from 'react';
import { VideoPlayerAdvanced } from '@/components/ui/video-player-advanced';
import { AssignmentSystem } from '@/components/ui/assignment-system';
import { useAppStore } from '@/store/appStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  Download, 
  MessageSquare, 
  CheckCircle,
  FileText,
  Award
} from 'lucide-react';

export default function CourseDetailPage({ params }: any) {

  // 修正：使用别名 user: currentUser 来匹配组件内的用法
  const { courses, user: currentUser, updateLessonProgress } = useAppStore();
  const course = courses.find(c => c.id === params.id);
  
  if (!course) {
    return <div className="container mx-auto py-8 text-center">课程未找到</div>;
  }

  const completedLessons = course.chapters?.reduce((acc, chapter) => 
    acc + (chapter.lessons?.filter(l => l.completed).length || 0), 0) || 0;
  const totalLessons = course.chapters?.reduce((acc, chapter) => 
    acc + (chapter.lessons?.length || 0), 0) || 0;
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const currentChapter = course.chapters?.[0];
  const currentLesson = currentChapter?.lessons?.[0];

  const handleLessonComplete = (lessonId: string) => {
    const chapterIndex = course.chapters?.findIndex(ch => ch.lessons.some(l => l.id === lessonId)) ?? 0;
    const lessonIndex = course.chapters?.[chapterIndex].lessons.findIndex(l => l.id === lessonId) ?? 0;
    updateLessonProgress(course.id, chapterIndex, lessonIndex, true);
  };

  const handleAssignmentSubmit = (assignmentId: string, submission: any) => {
    console.log('作业提交:', assignmentId, submission);
  };

  const videoChapters = course.chapters?.map(chapter => ({
    id: chapter.id,
    title: chapter.title,
    startTime: 0,
    endTime: 600, // 修正：补充 endTime 字段，解决类型报错
    duration: 600
  })) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto py-8 px-4">
        {/* 课程头部信息 */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {course.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  {/* 修正：增加兜底值 */}
                  <span className="text-sm text-gray-600">{course.rating} ({course.students || 0}人)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{course.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}小时</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {/* 修正：增加兜底值 */}
                  <span>{course.students || 0}人学习</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>完成获得证书</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-80">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">¥{course.price}</div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>学习进度</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="text-xs text-gray-500 mt-1">
                      已完成 {completedLessons}/{totalLessons} 课时
                    </div>
                  </div>
                  <Button className="w-full mb-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    {progress > 0 ? '继续学习' : '立即购买'}
                  </Button>
                  <Button variant="outline" className="w-full">
                    加入收藏
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="content" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">课程概览</TabsTrigger>
                <TabsTrigger value="content">课程内容</TabsTrigger>
                <TabsTrigger value="assignments">作业练习</TabsTrigger>
                <TabsTrigger value="discussion">讨论区</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>课程介绍</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">学习目标</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          <li>掌握外贸业务流程的核心环节</li>
                          <li>建立系统化的外贸思维框架</li>
                          <li>学会客户开发和维护的实用技巧</li>
                          <li>了解最新的外贸政策和合规要求</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">适合人群</h3>
                        <p className="text-gray-600">{course.targetAudience}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">讲师介绍</h3>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            李
                          </div>
                          <div>
                            <p className="font-semibold">李老师</p>
                            <p className="text-sm text-gray-600">19年外贸行业经验，外贸布道者</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="content" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="h-5 w-5" />
                      视频学习
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentLesson && (
                      <VideoPlayerAdvanced
                        src={currentLesson.videoUrl || "/api/placeholder/800/450"} // 修正：videoUrl 改为 src
                        title={currentLesson.title}
                        chapters={videoChapters}
                        onProgress={(progress) => {
                          if (progress > 0.9 && !currentLesson.completed) {
                            handleLessonComplete(currentLesson.id);
                          }
                        }}
                      />
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      课程章节
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {course.chapters?.map((chapter, chapterIndex) => (
                        <div key={chapter.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold">{chapter.title}</h4>
                            <Badge variant="outline">
                              {chapter.lessons?.filter(l => l.completed).length || 0}/{chapter.lessons?.length || 0}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            {chapter.lessons?.map((lesson, lessonIndex) => (
                              <div 
                                key={lesson.id}
                                className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${
                                  lesson.completed ? 'bg-green-50 text-green-800' : 'hover:bg-gray-50'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {lesson.completed ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <div className="w-4 h-4 border-2 border-gray-300 rounded" />
                                  )}
                                  <span className="text-sm">
                                    {chapterIndex + 1}-{lessonIndex + 1}. {lesson.title}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500 ml-auto">{lesson.duration}分钟</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="assignments" className="space-y-4">
                <AssignmentSystem
                  courseId={params.id}
                  userId={currentUser?.id || ''}
                  onSubmit={handleAssignmentSubmit}
                />
              </TabsContent>
              
              <TabsContent value="discussion" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      课程讨论
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            张
                          </div>
                          <div>
                            <p className="font-semibold text-sm">张同学</p>
                            <p className="text-xs text-gray-500">2小时前</p>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">老师，关于客户开发信的主题行怎么写才能提高打开率？</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <button className="hover:text-blue-600">回复</button>
                          <button className="hover:text-red-600">点赞 (3)</button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            李
                          </div>
                          <div>
                            <p className="font-semibold text-sm">李老师</p>
                            <p className="text-xs text-gray-500">1小时前</p>
                          </div>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                            讲师
                          </Badge>
                        </div>
                        <p className="text-gray-700 mb-3">很好的问题！主题行要遵循三个原则：个性化、紧迫性、价值承诺。我推荐几个模板...</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <button className="hover:text-blue-600">回复</button>
                          <button className="hover:text-red-600">点赞 (8)</button>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <textarea 
                          className="w-full p-3 border rounded-lg resize-none" 
                          rows={3} 
                          placeholder="参与讨论，分享你的想法..."
                        />
                        <div className="flex justify-end mt-3">
                          <Button size="sm">发表评论</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* 侧边栏 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>学习资料</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="font-medium text-sm">外贸流程图.pdf</p>
                        <p className="text-xs text-gray-500">2.3MB</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="font-medium text-sm">客户开发模板.docx</p>
                        <p className="text-xs text-gray-500">1.8MB</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="font-medium text-sm">外贸政策汇总.xlsx</p>
                        <p className="text-xs text-gray-500">3.1MB</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>学习统计</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">本周学习时间</span>
                    <span className="font-semibold">12.5小时</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">连续学习天数</span>
                    <span className="font-semibold text-green-600">7天</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">完成作业</span>
                    <span className="font-semibold">8/12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">获得积分</span>
                    <span className="font-semibold text-blue-600">850分</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>相关课程推荐</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {courses.filter(c => c.id !== params.id).slice(0, 3).map(relatedCourse => (
                    <div key={relatedCourse.id} className="flex gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="w-16 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded flex items-center justify-center text-white text-xs font-bold">
                        课程
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{relatedCourse.title}</p>
                        <p className="text-xs text-gray-500">{relatedCourse.category}</p>
                        <p className="text-sm font-semibold text-blue-600 mt-1">¥{relatedCourse.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
