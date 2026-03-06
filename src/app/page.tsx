import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import TopFirmsSection from '@/components/home/TopFirmsSection'
import CategorySection from '@/components/home/CategorySection'
import { getFirms } from '@/lib/queries'

export default async function Home() {
  const firms = await getFirms()
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <TopFirmsSection firms={firms} />
      <CategorySection />
    </div>
  )
}
