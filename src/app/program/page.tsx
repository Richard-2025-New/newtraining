export default function ProgramPage() {
  const modules = [
    { title: "第1周：行业总览与岗位职责", desc: "认知搭建与目标拆解" },
    { title: "第2周：流程落地与工具", desc: "开发、跟进、报价、合同与物流" },
    { title: "第3周：政策适配与合规", desc: "海关、税务、贸易合规与风控" },
    { title: "第4周：高潜赛道与增长", desc: "市场选择、产品机会与渠道" },
  ];
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">30天训练体系</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {modules.map((m) => (
          <div key={m.title} className="rounded-lg border border-zinc-200 p-6">
            <h2 className="font-semibold mb-2">{m.title}</h2>
            <p className="text-zinc-700">{m.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
