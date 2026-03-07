import BlogPage from '@/components/blog/BlogPage'
import { getBlogPosts } from '@/lib/queries'

export const metadata = {
  title: 'Blog | PropBenchmark — Prop Firm Reviews, Guides & Industry News',
  description:
    'Prop firm reviews, challenge guides, payout data, industry news, and trading psychology — curated by the PropBenchmark team.',
}

type Props = { searchParams: Promise<{ category?: string }> }

export default async function Blog({ searchParams }: Props) {
  const { category } = await searchParams
  const posts = await getBlogPosts()
  return <BlogPage initialPosts={posts} initialCategory={category ?? 'All'} />
}
