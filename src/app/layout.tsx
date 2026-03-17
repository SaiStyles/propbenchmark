import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { MarketTypeProvider } from '@/context/MarketTypeContext'
import MarketToggle from '@/components/ui/MarketToggle'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'PropBenchmark',
  description: 'Compare top prop trading firms with verified data, real trader reviews and exclusive discounts.',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${GeistSans.variable}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          backgroundColor: '#060b14',
          color: '#f1f5f9',
        }}
      >
        <MarketTypeProvider>
          <div
            style={{
              width: '100%',
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 24px 32px',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Navbar />
            <MarketToggle />
            <main style={{ flex: 1, paddingTop: '12px' }}>
              {children}
            </main>
            <Footer />
          </div>
        </MarketTypeProvider>
      </body>
    </html>
  )
}
