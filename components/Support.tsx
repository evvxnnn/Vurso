'use client'

import { Phone, Clock, Users, MessageCircle } from 'lucide-react'
import SectionWrapper from './ui/SectionWrapper'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useInView } from '@/lib/useInView'

const statDelayClasses = ['delay-0', 'delay-100', 'delay-200', 'delay-300']

export default function Support() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()

  const statsData = t('support.stats')
  const stats = [
    { icon: Clock, ...statsData.responseTime },
    { icon: Phone, ...statsData.availability },
    { icon: Users, ...statsData.humanSupport },
    { icon: MessageCircle, ...statsData.resolution },
  ]

  return (
    <SectionWrapper bgColor="gradient" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div ref={ref} className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animate-on-scroll animate-fade-up${inView ? ' in-view' : ''}`}
            >
              {t('support.heading')}
              <br />
              <span className="text-light-purple">{t('support.headingAccent')}</span>
            </h2>

            <p
              className={`mt-6 text-lg text-white/80 max-w-lg animate-on-scroll animate-fade-up delay-100${inView ? ' in-view' : ''}`}
            >
              {t('support.description')}
            </p>

            <div
              className={`mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 animate-on-scroll animate-fade-up delay-200${inView ? ' in-view' : ''}`}
            >
              <p className="text-white/90 italic">
                {t('support.testimonial')}
              </p>
              <p className="mt-4 font-semibold">{t('support.testimonialAuthor')}</p>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center animate-on-scroll animate-scale-in ${statDelayClasses[index] ?? ''}${inView ? ' in-view' : ''}`}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-light-purple" />
                <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
