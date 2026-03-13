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
  title: "Bynum's Steakhouse | Voted #1 on Indy's South Side",
  description:
    "Voted #1 Steakhouse on Indianapolis' South Side. Hand-cut Angus beef, prime rib, and lobster tails for over 20 years. Come as you are.",
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
          .bynums-demo .section-container { padding-left: 1.5rem; padding-right: 1.5rem; }
        }
        @media (min-width: 1024px) {
          .bynums-demo .section-container { padding-left: 2rem; padding-right: 2rem; }
        }

        .bynums-demo .animate-on-scroll {
          opacity: 0;
          will-change: opacity, transform;
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .bynums-demo .animate-on-scroll.in-view { opacity: 1; transform: none; }
        .bynums-demo .animate-fade-up { transform: translateY(24px); }

        @keyframes bnFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes bnFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .bynums-demo .anim-fade-up { animation: bnFadeUp 0.7s ease both; }
        .bynums-demo .anim-fade-in { animation: bnFadeIn 0.8s ease both; }
        .bynums-demo .delay-100 { animation-delay: 100ms; }
        .bynums-demo .delay-200 { animation-delay: 200ms; }
        .bynums-demo .delay-300 { animation-delay: 300ms; }
        .bynums-demo .delay-400 { animation-delay: 400ms; }
        .bynums-demo .delay-500 { animation-delay: 500ms; }
        .bynums-demo .delay-600 { animation-delay: 600ms; }

        /* Hero slideshow */
        .bynums-demo .hero-slide {
          opacity: 0;
          transform: scale(1);
          animation-name: bnHeroSlide;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-fill-mode: both;
        }
        @keyframes bnHeroSlide {
          0%     { opacity: 0; transform: scale(1); }
          2%     { opacity: 0.4; }
          10.5%  { opacity: 0.4; transform: scale(1.05); }
          12.5%  { opacity: 0; transform: scale(1.07); }
          100%   { opacity: 0; transform: scale(1); }
        }
      `}</style>
      {children}
    </div>
  )
}
