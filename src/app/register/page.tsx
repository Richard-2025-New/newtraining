'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Phone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  MessageCircle, 
  Shield,
  ArrowRight,
  User,
  CheckCircle,
  UserCheck,
  Award
} from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
            <UserCheck className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              创建新账户
            </h1>
            <p className="text-gray-600 mt-2">加入专业外贸培训平台</p>
          </div>
        </div>

        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur">
          <CardHeader className="text-center space-y-2 pb-6">
            <CardTitle className="text-2xl">免费注册</CardTitle>
            <CardDescription className="text-gray-600">
              开始您的外贸学习之旅
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4">
              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="register-phone">手机号 *</Label>
                <div className="relative">
                  <Input
                    id="register-phone"
                    type="tel"
                    placeholder="请输入手机号"
                    className="pl-10"
                    required
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* SMS Code */}
              <div className="space-y-2">
                <Label htmlFor="register-sms">验证码 *</Label>
                <div className="flex space-x-2">
                  <Input
                    id="register-sms"
                    placeholder="请输入验证码"
                    className="flex-1"
                    required
                  />
                  <Button variant="outline" className="px-4 whitespace-nowrap">
                    获取验证码
                  </Button>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="register-name">姓名 *</Label>
                <div className="relative">
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="请输入真实姓名"
                    className="pl-10"
                    required
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="register-email">邮箱</Label>
                <div className="relative">
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="请输入邮箱地址（可选）"
                    className="pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="register-password">设置密码 *</Label>
                <div className="relative">
                  <Input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="请设置6-20位密码"
                    className="pl-10 pr-10"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">密码长度6-20位，建议包含字母和数字</p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password">确认密码 *</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="请再次输入密码"
                    className="pl-10 pr-10"
                    required
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

              {/* Terms and Conditions */}
              <div className="space-y-3">
                <label className="flex items-start space-x-2 text-sm">
                  <input 
                    type="checkbox" 
                    className="mt-0.5 rounded" 
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                  />
                  <span>我已阅读并同意
                    <Link href="/terms" className="text-blue-600 hover:text-blue-700">《服务条款》</Link>
                  </span>
                </label>
                <label className="flex items-start space-x-2 text-sm">
                  <input 
                    type="checkbox" 
                    className="mt-0.5 rounded" 
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                    required
                  />
                  <span>我已阅读并同意
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-700">《隐私政策》</Link>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={!agreeTerms || !agreePrivacy}
              >
                立即注册
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {/* WeChat Registration */}
            <div className="space-y-4">
              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-gray-500">
                  其他注册方式
                </span>
              </div>
              
              <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                <MessageCircle className="mr-2 h-4 w-4" />
                微信扫码注册
              </Button>
            </div>

            {/* Login Link */}
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                已有账户？
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                  立即登录
                </Link>
              </p>
              <p className="text-xs text-gray-500">
                注册即表示您同意我们的服务条款和隐私政策
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-lg">
            <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
              <CheckCircle className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-sm">专业认证</h4>
              <p className="text-xs text-gray-600">19年外贸经验导师团队</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-lg">
            <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
              <Shield className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-sm">安全保障</h4>
              <p className="text-xs text-gray-600">数据加密，隐私保护</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-lg">
            <div className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full">
              <Award className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-sm">系统培训</h4>
              <p className="text-xs text-gray-600">30天系统化外贸培训</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
