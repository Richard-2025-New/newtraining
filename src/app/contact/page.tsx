"use client";
import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const res = await fetch("/api/n8n", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setLoading(false);
    setStatus(res.ok ? "提交成功" : "提交失败");
    if (res.ok) form.reset();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">联系与报名</h1>
      <form onSubmit={onSubmit} className="max-w-xl space-y-4">
        <div>
          <label className="block text-sm mb-1">姓名</label>
          <input name="name" required className="w-full rounded-md border border-zinc-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">邮箱</label>
          <input type="email" name="email" required className="w-full rounded-md border border-zinc-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">人群类型</label>
          <select name="track" className="w-full rounded-md border border-zinc-300 px-3 py-2">
            <option value="newbie">外贸新人</option>
            <option value="student">大学生</option>
            <option value="boss">老板</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">留言</label>
          <textarea name="message" rows={4} className="w-full rounded-md border border-zinc-300 px-3 py-2" />
        </div>
        <button disabled={loading} className="rounded-full bg-zinc-900 text-white px-5 py-2">
          {loading ? "提交中" : "提交"}
        </button>
        {status && <p className="text-sm text-zinc-700">{status}</p>}
      </form>
    </main>
  );
}
