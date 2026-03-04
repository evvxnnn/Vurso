'use client'

import { Search, Code2, HeadphonesIcon, ArrowRight } from 'lucide-react'
import SectionWrapper from './ui/SectionWrapper'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useInView } from '@/lib/useInView'

const stepDelayClasses = ['delay-0', 'delay-200', 'delay-400']

export default function HowItWorks() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()

  const stepTranslations = t('howItWorks.steps') as { title: string; description: string; bullets: string[] }[]
  const steps = [
    { icon: Search, step: '01', ...stepTranslations[0] },
    { icon: Code2, step: '02', ...stepTranslations[1] },
    { icon: HeadphonesIcon, step: '03', ...stepTranslations[2] },
  ]

  return (
    <SectionWrapper id="how-it-works">
      <div ref={ref} className="text-center mb-16">
        <h2
          className={`text-3xl md:text-4xl font-bold text-primary-navy dark:text-white animate-on-scroll animate-fade-up${inView ? ' in-view' : ''}`}
        >
          {t('howItWorks.heading')}
        </h2>
        <p
          className={`mt-4 text-dark-gray dark:text-gray-400 max-w-2xl mx-auto animate-on-scroll animate-fade-up delay-100${inView ? ' in-view' : ''}`}
        >
          {t('howItWorks.subtitle')}
        </p>
      </div>

      <div className="relative">
        {/* Connection line - hidden on mobile */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent transform -translate-y-1/2 z-0" />

        <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative z-10">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className={`relative animate-on-scroll animate-fade-up-lg ${stepDelayClasses[index] ?? ''}${inView ? ' in-view' : ''}`}
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-slate-700 text-center relative h-full flex flex-col">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent-purple text-white text-sm font-bold px-4 py-1 rounded-full">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-light-purple dark:bg-accent-purple/20 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-accent-purple" />
                </div>

                <h3 className="text-xl font-semibold text-primary-navy dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-dark-gray dark:text-gray-400 mb-4">
                  {step.description}
                </p>

                <ul className="mt-auto space-y-2 text-left">
                  {step.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2 text-sm text-dark-gray dark:text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Arrow between steps - hidden on mobile and last item */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                  <ArrowRight className="w-8 h-8 text-accent-purple" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
