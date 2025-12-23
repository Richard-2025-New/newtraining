"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Send, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
      // 增强数据：添加来源和时间戳
      const payload = {
        ...data,
        source: "website_contact_form",
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch("/api/n8n", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">联系我们</h1>
          <p className="text-lg text-gray-600">
            有任何问题？想要咨询课程？请填写下方表单，我们会尽快与您联系。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：联系方式 */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>联系方式</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">咨询热线</p>
                    <p className="text-sm text-gray-600">400-888-8888</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">电子邮箱</p>
                    <p className="text-sm text-gray-600">contact@newtraining.cn</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">在线学习</p>
                    <p className="text-sm text-gray-600">随时随地开启学习之旅</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：表单 */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>发送消息</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">姓名</label>
                      <Input name="name" required placeholder="您的姓名" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">邮箱</label>
                      <Input type="email" name="email" required placeholder="您的邮箱地址" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">手机号码</label>
                      <Input type="tel" name="phone" placeholder="您的手机号码（选填）" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">人群类型</label>
                      <Select name="track" defaultValue="newbie">
                        <SelectTrigger>
                          <SelectValue placeholder="请选择类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newbie">外贸新人</SelectItem>
                          <SelectItem value="student">在校大学生</SelectItem>
                          <SelectItem value="boss">企业老板/高管</SelectItem>
                          <SelectItem value="other">其他</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">留言内容</label>
                    <Textarea 
                      name="message" 
                      rows={5} 
                      placeholder="请详细描述您的需求或问题..." 
                      className="resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Button 
                      type="submit" 
                      disabled={loading} 
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          正在提交...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          发送消息
                        </>
                      )}
                    </Button>
                    
                    {status === "success" && (
                      <p className="text-sm text-green-600 font-medium animate-in fade-in slide-in-from-left-5">
                        ✅ 提交成功！我们会尽快联系您。
                      </p>
                    )}
                    {status === "error" && (
                      <p className="text-sm text-red-600 font-medium animate-in fade-in slide-in-from-left-5">
                        ❌ 提交失败，请稍后重试。
                      </p>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
