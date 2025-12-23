export interface WPPost {
  id: number
  date: string
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  categories?: number[]
}

const base = process.env.NEXT_PUBLIC_WP_BASE_URL || ''

export async function getPosts(page = 1, perPage = 6): Promise<WPPost[]> {
  if (!base) return []
  const res = await fetch(`${base}/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}`, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  if (!base) return null
  const res = await fetch(`${base}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' })
  if (!res.ok) return null
  const arr: WPPost[] = await res.json()
  return arr[0] || null
}

