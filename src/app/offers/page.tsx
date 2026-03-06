import OffersPage from '@/components/offers/OffersPage'
import { getOffers } from '@/lib/queries'

export const metadata = {
  title: 'Exclusive Prop Firm Discount Codes | PropBenchmark',
  description: 'Verified discount codes and exclusive deals for the top prop trading firms. Save up to 25% on challenge fees with PropBenchmark exclusive offers.',
}

export default async function Offers() {
  const offers = await getOffers()
  return <OffersPage initialOffers={offers} />
}
