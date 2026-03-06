'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type MarketType = 'cfd' | 'futures'

const MarketTypeContext = createContext<{
  marketType: MarketType
  setMarketType: (t: MarketType) => void
}>({ marketType: 'cfd', setMarketType: () => {} })

export function MarketTypeProvider({ children }: { children: React.ReactNode }) {
  const [marketType, setMarketTypeState] = useState<MarketType>('cfd')

  useEffect(() => {
    const stored = localStorage.getItem('pb_market_type')
    if (stored === 'cfd' || stored === 'futures') {
      setMarketTypeState(stored)
    }
  }, [])

  const setMarketType = (t: MarketType) => {
    setMarketTypeState(t)
    localStorage.setItem('pb_market_type', t)
  }

  return (
    <MarketTypeContext.Provider value={{ marketType, setMarketType }}>
      {children}
    </MarketTypeContext.Provider>
  )
}

export function useMarketType() {
  return useContext(MarketTypeContext)
}
