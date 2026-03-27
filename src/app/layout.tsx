import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/context/AuthContext'
import AuthModal from '@/components/AuthModal'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dmsans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Sammy's Grill Cafe | Authentic Fire-Grilled Restaurant in Bangalore",
  description:
    "Experience the finest fire-grilled cuisine at Sammy's Grill Cafe, Kanakapura, Bangalore. Book a table online, explore our menu, special offers & dining packages.",
  keywords: [
    "Sammy's Grill", "grill cafe Bangalore", "book a table", "BBQ restaurant Bangalore",
    "Kanakapura restaurant", "fine dining Bangalore", "grilled food", "restaurant reservation",
  ],
  openGraph: {
    title: "Sammy's Grill Cafe",
    description: "Authentic fire-grilled cuisine in Kanakapura, Bangalore. Book your table online.",
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=85',
        width: 1200,
        height: 630,
        alt: "Sammy's Grill Cafe",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sammy's Grill Cafe",
    description: "Authentic fire-grilled cuisine in Kanakapura, Bangalore.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmSans.variable} ${playfair.variable} font-sans bg-[#0f0f0e] text-[#2c2825] antialiased`}
      >
        <AuthProvider>
          {children}
          <AuthModal />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#faf8f4',
                border: '1px solid #2e2e2e',
                fontFamily: "'DM Sans', sans-serif",
              },
              success: {
                iconTheme: { primary: '#e8501a', secondary: '#fff' },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
