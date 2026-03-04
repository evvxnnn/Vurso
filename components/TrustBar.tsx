'use client'

import { Building2, Store, Briefcase, Factory, ShoppingBag } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useInView } from '@/lib/useInView'

const delayClasses = ['delay-0', 'delay-100', 'delay-200', 'delay-300', 'delay-400']

export default function TrustBar() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()

  const industries = t('trustBar.industries') as Record<string, string>
  const companies = [
    { name: industries.localRetail, icon: Store },
    { name: industries.professionalServices, icon: Briefcase },
    { name: industries.manufacturing, icon: Factory },
    { name: industries.eCommerce, icon: ShoppingBag },
    { name: industries.smallBusiness, icon: Building2 },
  ]

  return (
    <section ref={ref} className="hidden md:block py-12 bg-light-gray dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <p
          className={`text-center text-dark-gray dark:text-gray-400 text-sm font-medium mb-8 animate-on-scroll${inView ? ' in-view' : ''}`}
        >
          {t('trustBar.tagline')}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {companies.map((company, index) => (
            <div
              key={company.name}
              className={`flex items-center gap-2 text-dark-gray/60 dark:text-gray-500 hover:text-primary-navy dark:hover:text-white transition-colors animate-on-scroll animate-fade-up ${delayClasses[index] ?? ''}${inView ? ' in-view' : ''}`}
            >
              <company.icon className="w-6 h-6" />
              <span className="font-medium text-sm">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
