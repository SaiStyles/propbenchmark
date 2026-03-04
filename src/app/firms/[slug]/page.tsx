import FirmDetail from '@/components/firms/FirmDetail'

export default async function FirmPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <FirmDetail slug={slug} />
}