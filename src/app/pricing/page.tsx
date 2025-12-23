import Image from "next/image";
import Link from "next/link";

export default function PricingPage() {
  const checkoutUrl = process.env.WORDPRESS_CHECKOUT_URL;
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">价格与收款</h1>
      <p className="text-zinc-700 mb-6">初期支持支付宝方式，可跳转至WordPress站点完成支付或使用收款二维码。</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-lg border border-zinc-200 p-6">
                  <h2 className="font-semibold mb-3">个人会员</h2>
                  <p className="text-zinc-700">30天训练体系与资源库访问</p>
                  {checkoutUrl && (
                    <div className="mt-4">
                      <Link href={checkoutUrl} className="inline-block rounded-full bg-zinc-900 text-white px-5 py-2">
                        前往支付（WordPress）
                      </Link>
                    </div>
                  )}
                </div>
                <div className="rounded-lg border border-zinc-200 p-6">
                  <h2 className="font-semibold mb-3">企业服务</h2>
                  <p className="text-zinc-700">团队培训与顾问服务，按需定制</p>
                </div>
              </div>
      <div className="mt-8 rounded-lg border border-zinc-200 p-6">
        <p className="text-zinc-700 mb-3">支付宝收款二维码（示例）</p>
        <Image src="/vercel.svg" alt="placeholder" width={120} height={120} />
      </div>
    </main>
  );
}
