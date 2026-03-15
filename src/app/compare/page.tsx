import { Suspense } from 'react'
import CompareView from '@/components/compare/CompareView'
import { getCompareData } from '@/lib/queries'

export const metadata = {
  title: 'Compare Prop Firms | PropBenchmark',
  description: 'Compare prop trading firms side by side — fees, drawdown rules, profit splits, payouts, and trust metrics.',
}

export default async function ComparePage() {
  const firms = await getCompareData()
  return (
    <Suspense>
      <CompareView firms={firms} />
    </Suspense>
  )
}
