import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getBlogPostBySlug, getRelatedPosts } from '@/lib/queries'
import BlogPostPage from '@/components/blog/BlogPostPage'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | PropBenchmark Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostRoute({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) notFound()

  const relatedPosts = await getRelatedPosts(post.category, post.slug)

  return <BlogPostPage post={post} relatedPosts={relatedPosts} />
}
