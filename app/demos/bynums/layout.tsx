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
        /* Bynums Demo Scoped Styles */
        .bynums-demo {
          font-family: var(--font-lato), system-ui, sans-serif;
          color: #f5f0e8;
          background: #111111;
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

        /* Scroll-triggered animations */
        .bynums-demo .animate-on-scroll {
          opacity: 0;
          will-change: opacity, transform;
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .bynums-demo .animate-on-scroll.in-view {
          opacity: 1;
          transform: none;
        }
        .bynums-demo .animate-fade-up { transform: translateY(28px); }

        /* Mount animations */
        @keyframes bnFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes bnFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .bynums-demo .anim-fade-up { animation: bnFadeUp 0.8s ease both; }
        .bynums-demo .anim-fade-in { animation: bnFadeIn 1s ease both; }

        .bynums-demo .delay-100 { animation-delay: 100ms; }
        .bynums-demo .delay-200 { animation-delay: 200ms; }
        .bynums-demo .delay-300 { animation-delay: 300ms; }
        .bynums-demo .delay-400 { animation-delay: 400ms; }
        .bynums-demo .delay-500 { animation-delay: 500ms; }

        /* Gold gradient text */
        .bynums-demo .text-gold-gradient {
          background: linear-gradient(135deg, #d4c48a 0%, #b9a65c 50%, #9a8340 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Divider */
        .bynums-demo .gold-divider {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #b9a65c, transparent);
          margin: 0 auto;
        }
      `}</style>
      {children}
    </div>
  )
}
