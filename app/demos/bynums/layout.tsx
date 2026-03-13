import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['300', '400', '700', '900'],
})

export const metadata: Metadata = {
  title: "Bynum's Steakhouse | Indianapolis' #1 Southside Steakhouse",
  description:
    'Voted #1 on Indianapolis\' Southside. Serving hand-cut Angus beef, prime rib, and lobster tails for over 20 years.',
}

export default function BynumsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${playfair.variable} ${lato.variable} bynums-demo`}>
      <style>{`
        .bynums-demo {
          font-family: var(--font-lato), system-ui, sans-serif;
          color: #2c1810;
          background: #faf6f1;
        }

        .bynums-demo .section-container {
          max-width: 76rem;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        @media (min-width: 640px) {
          .bynums-demo .section-container {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
        @media (min-width: 1024px) {
          .bynums-demo .section-container {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }

        .bynums-demo .animate-on-scroll {
          opacity: 0;
          will-change: opacity, transform;
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .bynums-demo .animate-on-scroll.in-view {
          opacity: 1;
          transform: none;
        }
        .bynums-demo .animate-fade-up { transform: translateY(24px); }

        @keyframes bnFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        .bynums-demo .anim-fade-up { animation: bnFadeUp 0.7s ease both; }
        .bynums-demo .delay-100 { animation-delay: 100ms; }
        .bynums-demo .delay-200 { animation-delay: 200ms; }
        .bynums-demo .delay-300 { animation-delay: 300ms; }
        .bynums-demo .delay-400 { animation-delay: 400ms; }
      `}</style>
      {children}
    </div>
  )
}
