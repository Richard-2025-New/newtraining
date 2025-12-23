'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Clock, Award, BookOpen, ArrowRight, Home, User } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // 修正：使用别名 user: currentUser 来匹配组件内的用法
  const { user: currentUser, courses, enrollCourse } = useAppStore();
  
  const [orderInfo, setOrderInfo] = useState<any>(null);
  const [countdown, setCountdown] = useState(5);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get('orderId');
  const courseId = searchParams.get('courseId');

  useEffect(() => {
    if (orderId && courseId && courses.length > 0) {
      const course = courses.find(c => c.id === courseId);
      if (course) {
        setOrderInfo({
          orderId,
          courseId,
          courseTitle: course.title,
          coursePrice: course.price,
          paymentTime: new Date().toLocaleString(),
          transactionId: `TRANS-${Date.now()}`
        });
        
        // 自动为用户注册课程
        if (currentUser) {
          enrollCourse(courseId);
        }
      }
    }
  }, [orderId, courseId, courses, currentUser, enrollCourse]);

  useEffect(() => {
    // 倒计时自动跳转
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/profile');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  useEffect(() => {
    // 模拟加载完成
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在处理您的订单...</p>
        </div>
      </div>
    );
  }

  if (!orderInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">订单信息错误</h3>
          <p className="text-gray-600 mb-4">无法获取订单详情</p>
          <button
            onClick={() => router.push('/courses')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            返回课程列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 成功图标 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">支付成功！</h1>
          <p className="text-gray-600">恭喜您成功购买课程，即将开始您的学习之旅</p>
        </div>

        {/* 订单信息卡片 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">订单信息</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">订单号</span>
              <span className="font-mono text-sm">{orderInfo.orderId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">课程名称</span>
              <span className="font-medium">{orderInfo.courseTitle}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">支付金额</span>
              <span className="font-semibold text-green-600">¥{orderInfo.coursePrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">交易号</span>
              <span className="font-mono text-sm">{orderInfo.transactionId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">支付时间</span>
              <span className="text-sm">{orderInfo.paymentTime}</span>
            </div>
          </div>
        </div>

        {/* 下一步操作 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">下一步</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">课程已解锁</h3>
                <p className="text-sm text-gray-600">您现在可以开始学习这门课程的所有内容</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">学习进度跟踪</h3>
                <p className="text-sm text-gray-600">系统会自动记录您的学习进度和成绩</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Award className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">获得证书</h3>
                <p className="text-sm text-gray-600">完成课程后您将获得结业证书</p>
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push(`/courses/${orderInfo.courseId}`)}
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <BookOpen className="w-5 h-5" />
            <span>立即学习</span>
          </button>
          <button
            onClick={() => router.push('/profile')}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <User className="w-5 h-5" />
            <span>个人中心</span>
          </button>
          <button
            onClick={() => router.push('/courses')}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>返回首页</span>
          </button>
        </div>

        {/* 倒计时提示 */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {countdown > 0 ? (
              <>
                <span className="font-medium">{countdown}秒</span> 后将自动跳转到个人中心
              </>
            ) : (
              '正在跳转...'
            )}
          </p>
        </div>

        {/* 支付说明 */}
        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">支付说明</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• 支付成功后课程立即开通，可永久学习</li>
            <li>• 支持7天无理由退款（未开始学习的情况下）</li>
            <li>• 电子发票将在24小时内发送到您的邮箱</li>
            <li>• 如有问题请联系客服：400-123-4567</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
