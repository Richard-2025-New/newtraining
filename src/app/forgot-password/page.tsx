'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Phone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Shield,
  CheckCircle,
  Key,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: verify identity, 2: reset password, 3: success
  const [verifyMethod, setVerifyMethod] = useState('phone');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
            <Key className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              找回密码
            </h1>
            <p className="text-gray-600 mt-2">安全验证，重置密码</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step > stepNumber ? <CheckCircle className="h-4 w-4" /> : stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step > stepNumber ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
          <CardHeader className="text-center space-y-2 pb-6">
            <CardTitle className="text-2xl">
              {step === 1 && '验证身份'}
              {step === 2 && '设置新密码'}
              {step === 3 && '重置成功'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {step === 1 && '请选择验证方式'}
              {step === 2 && '请输入新密码'}
              {step === 3 && '密码已重置成功'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Verify Identity */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setVerifyMethod('phone')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      verifyMethod === 'phone' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <Phone className="inline h-4 w-4 mr-2" />
                    手机验证
                  </button>
                  <button
                    onClick={() => setVerifyMethod('email')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      verifyMethod === 'email' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <Mail className="inline h-4 w-4 mr-2" />
                    邮箱验证
                  </button>
                </div>

                <div className="space-y-4">
                  {verifyMethod === 'phone' ? (
                    <div className="space-y-2">
                      <Label htmlFor="verify-phone">手机号</Label>
                      <div className="relative">
                        <Input
                          id="verify-phone"
                          type="tel"
                          placeholder="请输入注册手机号"
                          className="pl-10"
                        />
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="verify-email">邮箱地址</Label>
                      <div className="relative">
                        <Input
                          id="verify-email"
                          type="email"
                          placeholder="请输入注册邮箱"
                          className="pl-10"
                        />
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="verify-code">验证码</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="verify-code"
                        placeholder="请输入验证码"
                        className="flex-1"
                      />
                      <Button variant="outline" className="px-4 whitespace-nowrap">
                        获取验证码
                      </Button>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleNextStep}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  下一步
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Step 2: Reset Password */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">新密码</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="请输入新密码"
                        className="pl-10 pr-10"
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">密码长度6-20位，建议包含字母和数字</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-new-password">确认新密码</Label>
                    <div className="relative">
                      <Input
                        id="confirm-new-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="请再次输入新密码"
                        className="pl-10 pr-10"
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevStep}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    上一步
                  </Button>
                  <Button 
                    onClick={handleNextStep}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    确认重置
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <div className="space-y-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">密码重置成功！</h3>
                  <p className="text-gray-600">您的密码已成功重置，请使用新密码登录</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 text-left">
                  <h4 className="font-medium text-blue-900 mb-2">安全提醒：</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 请妥善保管您的新密码</li>
                    <li>• 建议定期更换密码</li>
                    <li>• 不要与他人分享您的密码</li>
                  </ul>
                </div>

                <Link href="/login" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    立即登录
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}

            {/* Back to Login */}
            {step < 3 && (
              <div className="text-center">
                <Link href="/login" className="text-sm text-blue-600 hover:text-blue-700">
                  返回登录页面
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-xs text-gray-600">身份验证</p>
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-xs text-gray-600">安全加密</p>
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
              <Key className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-xs text-gray-600">密码重置</p>
          </div>
        </div>
      </div>
    </div>
  );
}