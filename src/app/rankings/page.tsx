import RankingsPage from '@/components/rankings/RankingsPage'
import { getRankings } from '@/lib/queries'

export const metadata = {
  title: 'Prop Firm Rankings 2026 | PropBenchmark',
  description: 'Best prop trading firms ranked by category — best overall, best for beginners, highest profit split, best futures firms, best value, and more.',
}

export default async function Rankings() {
  const firms = await getRankings()
  return <RankingsPage initialFirms={firms} />
}
