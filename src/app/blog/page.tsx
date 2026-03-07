import BlogPage from '@/components/blog/BlogPage'
import { getBlogPosts } from '@/lib/queries'

export const metadata = {
  title: 'Blog | PropBenchmark — Prop Firm Reviews, Guides & Industry News',
  description:
    'Prop firm reviews, challenge guides, payout data, industry news, and trading psychology — curated by the PropBenchmark team.',
}

export default async function Blog() {
  const posts = await getBlogPosts()
  return <BlogPage initialPosts={posts} />
}
