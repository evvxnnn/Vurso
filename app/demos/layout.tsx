import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Demo Preview',
  robots: 'noindex, nofollow',
}

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {children}
      <div className="fixed bottom-4 right-4 z-50">
        <a
          href="https://vurso.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-sm text-xs text-dark-gray dark:text-slate-400 hover:text-accent-purple dark:hover:text-accent-purple-light transition-colors"
        >
          Demo preview powered by
          <span className="font-semibold text-primary-navy dark:text-white">Vurso</span>
        </a>
      </div>
    </div>
  )
}
