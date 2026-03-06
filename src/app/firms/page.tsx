import FirmsDirectory from '@/components/firms/FirmsDirectory'
import { getFirms } from '@/lib/queries'

export const metadata = {
  title: 'All Prop Firms | PropBenchmark',
  description: 'Browse and compare all verified prop trading firms. Filter by category, steps, platforms and more.',
}

export default async function FirmsPage() {
  const firms = await getFirms()
  return <FirmsDirectory initialFirms={firms} />
}
