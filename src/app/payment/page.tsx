"use client";
import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { useCart } from '@/lib/store';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreditCard, Smartphone, Shield, CheckCircle, Clock, ArrowLeft, QrCode, Banknote, AlertCircle } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  available: boolean;
}

export default function PaymentPage() {
  const { user: currentUser, courses, addOrder } = useAppStore();
  const { cart } = useCart();
  const searchParams = useSearchParams();
  const [selectedPayment, setSelectedPayment] = useState('alipay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'select' | 'qr-code' | 'processing' | 'success'>('select');

  const courseId = searchParams.get('course') || '';
  const singleCourse = courses.find(c => c.id === courseId);
  const cartItems = singleCourse ? [singleCourse] : (cart.length > 0 ? cart.map(item => item.course) : courses.slice(0, 2));
  const totalAmount = cartItems.reduce((sum, course) => sum + (course?.price || 0), 0);

  const paymentMethods: PaymentMethod[] = [
<<<<<<< HEAD
    {
      id: 'alipay',
      name: '支付宝',
      icon: <QrCode className="h-6 w-6 text-blue-600" />,
      description: '使用支付宝扫码支付，支持花呗/信用卡',
      available: true
    },
    {
      id: 'wechat',
      name: '微信支付',
      icon: <Smartphone className="h-6 w-6 text-green-600" />,
      description: '使用微信扫一扫支付',
      available: true
    },
    {
      id: 'bank',
      name: '银行转账',
      icon: <Banknote className="h-6 w-6 text-purple-600" />,
      description: '传统银行转账，适合大额支付',
      available: true
    },
    {
      id: 'card',
      name: '信用卡',
      icon: <CreditCard className="h-6 w-6 text-orange-600" />,
      description: '支持Visa、MasterCard等信用卡',
      available: false
    }
=======
    { id: 'alipay', name: '支付宝', icon: <QrCode className="h-6 w-6 text-blue-600" />, description: '使用支付宝扫码支付，支持花呗/信用卡', available: true },
    { id: 'wechat', name: '微信支付', icon: <Smartphone className="h-6 w-6 text-green-600" />, description: '使用微信扫一扫支付', available: true },
    { id: 'bank', name: '银行转账', icon: <Banknote className="h-6 w-6 text紫-600" />, description: '传统银行转账，适合大额支付', available: true },
    { id: 'card', name: '信用卡', icon: <CreditCard className="h-6 w-6 text-orange-600" />, description: '支持Visa、MasterCard等信用卡', available: false },
>>>>>>> 543f6950a582ae677cf3fd4bd67ce36b28773968
  ];

  const processPayment = () => {
    setIsProcessing(true);
<<<<<<< HEAD
    // 模拟支付处理
=======
>>>>>>> 543f6950a582ae677cf3fd4bd67ce36b28773968
    setTimeout(() => {
      const order = {
        id: `order_${Date.now()}`,
        userId: currentUser?.id || '',
        courseIds: cartItems.map(item => item.id),
        totalAmount,
        paymentMethod: selectedPayment,
        status: 'completed' as const,
        createdAt: new Date(),
        paymentAt: new Date()
      };
      addOrder(order);
      setPaymentStep('success');
      setIsProcessing(false);
    }, 2000);
  };

  const handlePayment = async () => {
<<<<<<< HEAD
    // 如果是扫码支付，先显示二维码
=======
>>>>>>> 543f6950a582ae677cf3fd4bd67ce36b28773968
    if (selectedPayment === 'alipay' || selectedPayment === 'wechat') {
      setPaymentStep('qr-code');
      return;
    }
    processPayment();
  };

  const handleBackToCourses = () => {
    window.location.href = '/courses';
  };

  if (paymentStep === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">支付成功！</h2>
            <p className="text-gray-600 mb-6">您的课程已购买成功，可以开始学习啦！</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">订单号：</span>
                <span className="text-sm font-mono">{`order_${Date.now()}`}</span>
              </div>
              <div className="flex justify之间 items-center mb-2">
                <span className="text-sm text-gray-600">支付金额：</span>
                <span className="text-sm font-semibold">¥{totalAmount}</span>
              </div>
              <div className="flex justify之间 items-center">
                <span className="text-sm text-gray-600">支付方式：</span>
                <span className="text-sm">{paymentMethods.find(m => m.id === selectedPayment)?.name}</span>
              </div>
            </div>
            <div className="space-y-3">
              <Button className="w-full" onClick={handleBackToCourses}>立即学习</Button>
              <Button variant="outline" className="w-full" onClick={() => setPaymentStep('select')}>继续购买</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paymentStep === 'qr-code') {
    const isAlipay = selectedPayment === 'alipay';
    const candidates = isAlipay
      ? ['/images/payment/alipay.jpg', '/images/payment/Alipay.jpg', '/Alipay.jpg', '/images/payment/alipay.png', '/Alipay.png']
      : ['/images/payment/wechat.jpg', '/images/payment/WeChat.jpg', '/WeChat.jpg', '/images/payment/wechat.png', '/WeChat.png'];
    const bgColor = isAlipay ? 'bg-[#1677FF]' : 'bg-[#09BB07]';
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-xl">
          <CardHeader className={`${bgColor} text-white rounded-t-xl`}>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              {isAlipay ? <QrCode className="h-6 w-6" /> : <Smartphone className="h-6 w-6" />}
              {isAlipay ? '支付宝扫码支付' : '微信扫码支付'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center space-y-6">
            <div className="text-2xl font-bold">¥{totalAmount}</div>
            <div className="bg白色 p-4 rounded-xl shadow-inner border border-gray-100 inline-block">
              <img
                src={candidates[0]}
                data-idx="0"
                alt={isAlipay ? '支付宝收款码' : '微信收款码'}
                className="w-64 h-auto rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const idx = Number(target.dataset.idx || '0') + 1;
                  if (idx < candidates.length) {
                    target.dataset.idx = String(idx);
                    target.src = candidates[idx];
                  } else {
                    target.style.display = 'none';
                    target.parentElement!.textContent = '二维码未找到，请稍后重试或联系管理员';
                  }
                }}
              />
            </div>
            <p className="text-sm text-gray-500">请使用{isAlipay ? '支付宝' : '微信'}扫描上方二维码完成支付<br/>支付完成后请点击下方按钮</p>
            <div className="space-y-3">
              <Button className={`w-full ${bgColor} hover:opacity-90`} size="lg" onClick={processPayment} disabled={isProcessing}>
                {isProcessing ? '处理中...' : '我已完成支付'}
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setPaymentStep('select')}>返回选择其他方式</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paymentStep === 'qr-code') {
    const isAlipay = selectedPayment === 'alipay';
    const candidates = isAlipay
      ? ['/images/payment/alipay.jpg', '/images/payment/Alipay.jpg', '/Alipay.jpg', '/images/payment/alipay.png', '/Alipay.png']
      : ['/images/payment/wechat.jpg', '/images/payment/WeChat.jpg', '/WeChat.jpg', '/images/payment/wechat.png', '/WeChat.png'];
    const bgColor = isAlipay ? 'bg-[#1677FF]' : 'bg-[#09BB07]';
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-xl">
          <CardHeader className={`${bgColor} text-white rounded-t-xl`}>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              {isAlipay ? <QrCode className="h-6 w-6" /> : <Smartphone className="h-6 w-6" />}
              {isAlipay ? '支付宝扫码支付' : '微信扫码支付'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center space-y-6">
            <div className="text-2xl font-bold">¥{totalAmount}</div>
            <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-100 inline-block">
              <img
                src={candidates[0]}
                data-idx="0"
                alt={isAlipay ? '支付宝收款码' : '微信收款码'}
                className="w-64 h-auto rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const idx = Number(target.dataset.idx || '0') + 1;
                  if (idx < candidates.length) {
                    target.dataset.idx = String(idx);
                    target.src = candidates[idx];
                  } else {
                    target.style.display = 'none';
                    target.parentElement!.textContent = '二维码未找到，请稍后重试或联系管理员';
                  }
                }}
              />
            </div>
            <p className="text-sm text-gray-500">
              请使用{isAlipay ? '支付宝' : '微信'}扫描上方二维码完成支付<br />
              支付完成后请点击下方按钮
            </p>
            <div className="space-y-3">
              <Button className={`w-full ${bgColor} hover:opacity-90`} size="lg" onClick={processPayment} disabled={isProcessing}>
                {isProcessing ? '处理中...' : '我已完成支付'}
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setPaymentStep('select')}>
                返回选择其他方式
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <Button className="mb-4 bg-blue-600 hover:bg-blue-700 text-white" size="sm" onClick={handleBackToCourses}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回课程
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">订单支付</h1>
          <p className="text-gray-600 mt-2">选择支付方式，完成课程购买</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>订单详情</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map(course => (
                    <div key={course.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-12 bg-gradient-to-r from-blue-400 to紫-400 rounded flex items-center justify-center text白色 text-xs font-bold">课程</div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{course.title}</h4>
                        <p className="text-sm text-gray-600">{course.category}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{course.duration}小时</Badge>
                          <Badge variant="secondary" className="text-xs">{course.level}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">¥{course.price}</div>
                        <div className="text-sm text-gray-500 line-through">¥{Math.round(course.price * 1.5)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify之间 items-center mb-2"><span className="text-gray-600">课程原价：</span><span className="text-gray-600">¥{Math.round(totalAmount * 1.5)}</span></div>
                  <div className="flex justify之间 items-center mb-2"><span className="text-gray-600">优惠金额：</span><span className="text-green-600">-¥{Math.round(totalAmount * 0.5)}</span></div>
                  <div className="flex justify之间 items-center text-lg font-bold"><span>应付金额：</span><span className="text-blue-600">¥{totalAmount}</span></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>选择支付方式</CardTitle></CardHeader>
              <CardContent>
                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-4">
                  {paymentMethods.map(method => (
                    <div key={method.id} className={`relative border rounded-lg p-4 cursor-pointer transition-colors ${!method.available ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-300'} ${selectedPayment === method.id ? 'border-blue-500 bg-blue-50' : ''}`}>
                      <div className="flex items-center gap-4">
                        <RadioGroupItem value={method.id} id={method.id} disabled={!method.available} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            {method.icon}
                            <Label htmlFor={method.id} className="font-semibold cursor-pointer">
                              {method.name}
                              {!method.available && <Badge variant="secondary" className="ml-2 text-xs">即将上线</Badge>}
                            </Label>
                          </div>
                          <p className="text-sm text-gray-600 ml-9">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
                <Alert className="mt-4">
                  <Shield className="h-4 w-4" />
                  <AlertDescription>您的支付信息将通过加密通道传输，确保支付安全。我们支持支付宝担保交易，保障您的权益。</AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader><CardTitle>订单摘要</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify之间 items-center"><span className="text-gray-600">商品数量：</span><span>{cartItems.length}门课程</span></div>
                  <div className="flex justify之间 items-center"><span className="text-gray-600">订单编号：</span><span className="text-sm font-mono">{`order_${Date.now()}`}</span></div>
                  <div className="flex justify之间 items-center"><span className="text-gray-600">创建时间：</span><span className="text-sm">{new Date().toLocaleString()}</span></div>
                  <div className="flex justify之间 items-center"><span className="text-gray-600">支付方式：</span><span>{paymentMethods.find(m => m.id === selectedPayment)?.name}</span></div>
                  <div className="border-t pt-4">
                    <div className="flex justify之间 items-center text-lg font-bold mb-4"><span>应付总额：</span><span className="text-blue-600">¥{totalAmount}</span></div>
                    <Button className="w-full mb-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" size="lg" onClick={handlePayment} disabled={isProcessing}>
                      {isProcessing ? (<><Clock className="h-4 w-4 mr-2 animate-spin" />处理中...</>) : (<><CreditCard className="h-4 w-4 mr-2" />立即支付</>)}
                    </Button>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-2">支付即表示您同意</p>
                      <div className="flex justify-center gap-2 text-xs">
                        <a href="#" className="text-blue-600 hover:underline">服务条款</a>
                        <span className="text-gray-400">|</span>
                        <a href="#" className="text-blue-600 hover:underline">隐私政策</a>
                        <span className="text-gray-400">|</span>
                        <a href="#" className="text-blue-600 hover:underline">退款政策</a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>客服支持</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"><Smartphone className="h-5 w-5 text-blue-600" /><div><p className="font-medium text-sm">客服热线</p><p className="text-sm text-blue-600">400-123-4567</p></div></div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"><Clock className="h-5 w-5 text-green-600" /><div><p className="font-medium text-sm">服务时间</p><p className="text-sm text-gray-600">周一至周日 9:00-21:00</p></div></div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg"><Shield className="h-5 w-5 text-purple-600" /><div><p className="font-medium text-sm">支付保障</p><p className="text-sm text-gray-600">支付宝担保交易，安全放心</p></div></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
