import Link from 'next/link'
import { MessageCircle, Camera, Video, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold">Newtrain</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              专业的外贸培训平台，19年行业经验，致力于成为外贸布道者，
              帮助更多人成功转型外贸，实现职业发展目标。
            </p>
            <div className="flex space-x-4">
              <Link href="https://weibo.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <MessageCircle className="w-5 h-5" />
                  <span className="ml-2 text-sm">微博</span>
                </Button>
              </Link>
              <Link href="https://www.xiaohongshu.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <Camera className="w-5 h-5" />
                  <span className="ml-2 text-sm">小红书</span>
                </Button>
              </Link>
              <Link href="https://www.douyin.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <Video className="w-5 h-5" />
                  <span className="ml-2 text-sm">抖音</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-gray-300 hover:text-white transition-colors">
                  课程中心
                </Link>
              </li>
              <li>
                <Link href="/learning-path" className="text-gray-300 hover:text-white transition-colors">
                  学习路径
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-gray-300 hover:text-white transition-colors">
                  成功案例
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  博客文章
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系我们 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">400-123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">contact@newtrain.cn</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">深圳市南山区科技园</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">工作时间</h4>
              <p className="text-sm text-gray-300">周一至周五：9:00-18:00</p>
              <p className="text-sm text-gray-300">周末：10:00-16:00</p>
            </div>
          </div>
        </div>

        {/* 分割线 */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 Newtrain. 保留所有权利。
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                隐私政策
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                服务条款
              </Link>
              <Link href="/refund" className="text-gray-400 hover:text-white transition-colors">
                退款政策
              </Link>
              <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                帮助中心
              </Link>
            </div>
          </div>
        </div>

        {/* 备案信息 */}
        <div className="border-t border-gray-800 mt-4 pt-4 text-center">
          <p className="text-xs text-gray-500">
            粤ICP备12345678号-1 | 公安备案号：44030502001234 | 
            <Link href="https://beian.miit.gov.cn" className="hover:text-gray-300">
              工信部备案
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
