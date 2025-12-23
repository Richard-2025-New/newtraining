export default function ResourcesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">资源库</h1>
      <p className="text-zinc-700 mb-4">后续将上线视频与文字资料，并预留大容量存储与检索。</p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-lg border border-zinc-200 p-6">课程视频</div>
        <div className="rounded-lg border border-zinc-200 p-6">操作手册</div>
        <div className="rounded-lg border border-zinc-200 p-6">模板与清单</div>
      </div>
    </main>
  );
}
