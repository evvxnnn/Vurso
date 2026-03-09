import type { Metadata } from 'next'
import { Oswald, Inter } from 'next/font/google'

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'TEN57 MUSIC | Soundtrack to the Future',
  description:
    'Multi-genre record label committed to excellence, creativity, and integrity in music.',
}

export default function Ten57Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${oswald.variable} ${inter.variable}`}>
      {children}
    </div>
  )
}
