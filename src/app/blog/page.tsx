import Link from 'next/link'
import { getPosts } from '@/lib/wp'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const posts = await getPosts(1, 8)

  if (!process.env.NEXT_PUBLIC_WP_BASE_URL) {
    return (
      <div className="min-h-screen bg-white">
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">博客</h1>
            <p className="text-gray-600">未配置 WordPress 站点，请在环境变量中设置 <code className="bg-gray-100 px-1 py-0.5 rounded">NEXT_PUBLIC_WP_BASE_URL</code>（示例： https://yourdomain.com）。</p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">博客</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <article key={post.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold text-gray-900 mb-2" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <div className="text-sm text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">阅读全文</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

