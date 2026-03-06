import CompareView from '@/components/compare/CompareView'
import { getFirms } from '@/lib/queries'

export const metadata = {
  title: 'Compare Prop Firms | PropBenchmark',
  description: 'Compare prop trading firms side by side. Profit splits, drawdowns, fees and more.',
}

export default async function ComparePage() {
  const firms = await getFirms()
  return <CompareView allFirms={firms} />
}
