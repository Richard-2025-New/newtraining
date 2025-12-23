import Link from 'next/link'
import { getPostBySlug } from '@/lib/wp'

export const dynamic = 'force-dynamic'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  if (!process.env.NEXT_PUBLIC_WP_BASE_URL) {
    return (
      <div className="min-h-screen bg-white">
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4">
            <p className="text-gray-600">未配置 WordPress 站点，请设置 NEXT_PUBLIC_WP_BASE_URL。</p>
            <Link href="/blog" className="text-blue-600 hover:underline">返回博客</Link>
          </div>
        </section>
      </div>
    )
  }
  const post = await getPostBySlug(params.slug)
  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4">
            <p className="text-gray-600">文章未找到</p>
            <Link href="/blog" className="text-blue-600 hover:underline">返回博客</Link>
          </div>
        </section>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-white">
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <div className="text-sm text-gray-500 mb-6">{new Date(post.date).toLocaleString()}</div>
          <article className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          <div className="mt-8">
            <Link href="/blog" className="text-blue-600 hover:underline">← 返回博客</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

