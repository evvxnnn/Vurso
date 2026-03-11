import type { Metadata } from 'next'
import { Allura, Jost } from 'next/font/google'

const allura = Allura({
  subsets: ['latin'],
  variable: '--font-allura',
  weight: '400',
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
})

export const metadata: Metadata = {
  title: 'Andrea Burton Hair | Color Specialist & Stylist',
  description:
    'Independent hair stylist specializing in color, cuts, and transformations. Bringing your hair vision to life.',
}

export default function ABHLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${allura.variable} ${jost.variable} abh-demo`}>
      <style>{`
        /* ABH Demo Scoped Styles */
        .abh-demo {
          font-family: var(--font-jost), system-ui, sans-serif;
          color: #2d2424;
          background: #fffaf9;
        }

        /* Section container */
        .abh-demo .section-container {
          max-width: 72rem;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        @media (min-width: 640px) {
          .abh-demo .section-container {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
        @media (min-width: 1024px) {
          .abh-demo .section-container {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }

        /* Scroll-triggered animations */
        .abh-demo .animate-on-scroll {
          opacity: 0;
          will-change: opacity, transform;
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .abh-demo .animate-on-scroll.in-view {
          opacity: 1;
          transform: none;
        }
        .abh-demo .animate-fade-up { transform: translateY(24px); }

        /* Mount animations */
        @keyframes abhFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        .abh-demo .anim-fade-up { animation: abhFadeUp 0.7s ease both; }

        .abh-demo .delay-100 { animation-delay: 100ms; }
        .abh-demo .delay-200 { animation-delay: 200ms; }
        .abh-demo .delay-300 { animation-delay: 300ms; }
      `}</style>
      {children}
    </div>
  )
}
