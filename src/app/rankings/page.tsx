import RankingsPage from '@/components/rankings/RankingsPage'
import { getRankings, getTopProfitSplit } from '@/lib/queries'

export const metadata = {
  title: 'Prop Firm Rankings 2026 | PropBenchmark',
  description: 'Best prop trading firms ranked by category — best overall, best for beginners, highest profit split, best value, and more.',
}

export default async function Rankings() {
  const [rankingsData, topProfitSplit] = await Promise.all([
    getRankings(),
    getTopProfitSplit(),
  ])
  return <RankingsPage rankingsData={rankingsData} topProfitSplit={topProfitSplit} />
} 
