import type { Metadata } from 'next'
import FirmDetail from '@/components/firms/FirmDetail'
import { getFirmBySlug } from '@/lib/queries'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const firm = await getFirmBySlug(slug)
  if (!firm) {
    return {
      title: 'Firm Not Found | PropBenchmark',
      description: 'This prop trading firm could not be found on PropBenchmark.',
    }
  }
  return {
    title: `${firm.name} Review 2026 | PropBenchmark`,
    description: firm.description || `Read our full ${firm.name} review — challenge fees, profit split, drawdown rules, and verified trader ratings.`,
  }
}

export default async function FirmPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const dbFirm = await getFirmBySlug(slug)
  return <FirmDetail dbFirm={dbFirm} />
}
