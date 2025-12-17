import { ProviderList } from '@/components/ProviderList'

export default function MarketMakersPage() {
  return (
    <ProviderList
      category="market_makers"
      title="Market Makers"
      description="Liquidity providers and market making services for your token."
    />
  )
}
