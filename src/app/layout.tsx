import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dmsans' })

export const metadata: Metadata = {
  title: 'Sammy\'s Grill Cafe | Best Grilled Food',
  description: 'Experience the finest grilled delicacies in a cozy atmosphere',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} ${playfair.variable} font-sans bg-[#fbf9f6] text-[#2c2825] antialiased`}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
