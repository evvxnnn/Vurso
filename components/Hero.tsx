'use client'

import { ArrowRight, Layers, ArrowRightLeft } from 'lucide-react'
import Button from './ui/Button'
import { useTranslation } from '@/lib/i18n/useTranslation'

export default function Hero() {
  const { t } = useTranslation()

  const beforeTools = t('hero.beforeTools') as { name: string; price: string }[]

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 md:pb-0 overflow-hidden bg-gradient-to-br from-light-purple via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-navy/10 dark:bg-accent-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-navy dark:text-white leading-tight anim-fade-up delay-0"
            >
              {t('hero.title')}{' '}
              <span className="text-accent-purple">{t('hero.titleAccent')}</span>
            </h1>

            <p
              className="mt-6 text-lg md:text-xl text-dark-gray dark:text-gray-400 max-w-xl anim-fade-up delay-200"
            >
              {t('hero.subtitle')}
            </p>

            <div
              className="mt-8 flex flex-col sm:flex-row gap-4 anim-fade-up delay-400"
            >
              <Button href="#how-it-works" variant="outline" size="lg">
                {t('hero.ctaSecondary')}
              </Button>
              <Button href="#contact" size="lg">
                {t('hero.ctaPrimary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Right: Visual */}
          <div
            className="relative anim-scale-in delay-300"
          >
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/30 dark:border-slate-700/50">
              <div className="flex items-center justify-between gap-4">
                {/* Before: Multiple SaaS */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-dark-gray dark:text-gray-400 mb-4 text-center">{t('hero.before')}</p>
                  <div className="space-y-2">
                    {beforeTools.map((tool, i) => (
                      <div
                        key={tool.name}
                        className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg p-2 text-center text-sm text-red-700 dark:text-red-400 anim-fade-left"
                        style={{ animationDelay: `${500 + i * 80}ms` }}
                      >
                        {tool.name}
                        <span className="block text-xs text-red-500 dark:text-red-500">{tool.price}</span>
                      </div>
                    ))}
                    <div className="text-center pt-2 text-red-600 dark:text-red-400 font-semibold">
                      {t('hero.beforeTotal')}
                    </div>
                    <p className="text-center text-xs text-dark-gray/60 dark:text-gray-500">
                      {t('hero.beforeSummary')}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0">
                  <div className="anim-fade-in delay-900">
                    <ArrowRightLeft className="w-8 h-8 text-accent-purple" />
                  </div>
                </div>

                {/* After: TW Solution */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-dark-gray dark:text-gray-400 mb-4 text-center">{t('hero.after')}</p>
                  <div
                    className="bg-gradient-to-br from-primary-navy to-accent-purple rounded-xl p-6 text-center text-white h-full flex flex-col justify-center min-h-[200px] anim-fade-right delay-1000"
                  >
                    <Layers className="w-10 h-10 mx-auto mb-3" />
                    <p className="font-semibold">{t('hero.afterBrand')}</p>
                    <p className="text-sm text-white/80 mt-1">{t('hero.afterLabel')}</p>
                    <p className="text-2xl font-bold mt-3">{t('hero.afterPrice')}</p>
                    <p className="text-xs text-white/70">{t('hero.afterSupport')}</p>
                  </div>
                  <div className="text-center pt-2 text-green-600 dark:text-green-400 font-semibold">
                    {t('hero.afterSavings')}
                  </div>
                  <p className="text-center text-xs text-green-600/80 dark:text-green-400/80 mt-1">
                    {t('hero.afterSummary')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
