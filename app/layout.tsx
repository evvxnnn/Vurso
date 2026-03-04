import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import ClientLayout from '@/components/ClientLayout'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: 'Vurso | Custom Software. Real Support.',
  description: 'We replace your expensive SaaS stack with one system built for your business. Custom software development, website design, and real human support.',
  keywords: 'custom software, web development, business solutions, SaaS replacement, inventory systems',
  openGraph: {
    title: 'Vurso | Custom Software. Real Support.',
    description: 'We replace your expensive SaaS stack with one system built for your business.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="antialiased font-sans bg-white dark:bg-slate-950 text-primary-navy dark:text-white transition-colors">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
