import FirmDetail from '@/components/firms/FirmDetail'
import { getFirmBySlug } from '@/lib/queries'

export default async function FirmPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const dbFirm = await getFirmBySlug(slug)
  return <FirmDetail slug={slug} dbFirm={dbFirm} />
}
