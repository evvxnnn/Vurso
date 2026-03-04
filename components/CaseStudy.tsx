'use client'

import { useState, useEffect, useRef } from 'react'
import {
  TrendingDown,
  BarChart3,
  Clock,
  Utensils,
  Car,
  Home,
  Dumbbell,
  Stethoscope,
  HardHat,
  Scissors,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import SectionWrapper from './ui/SectionWrapper'
import GlassCard from './ui/GlassCard'
import { useTranslation } from '@/lib/i18n/useTranslation'
export default function CaseStudy() {
  const { t } = useTranslation()

  const studyTranslations = t('caseStudy.studies')
  const caseStudies = [
    { icon: TrendingDown, color: 'from-green-500 to-emerald-600', ...studyTranslations[0] },
    { icon: BarChart3, color: 'from-blue-500 to-cyan-600', ...studyTranslations[1] },
    { icon: Clock, color: 'from-purple-500 to-pink-600', ...studyTranslations[2] },
    { icon: Utensils, color: 'from-orange-500 to-red-500', ...studyTranslations[3] },
    { icon: Car, color: 'from-slate-500 to-zinc-600', ...studyTranslations[4] },
    { icon: Home, color: 'from-amber-500 to-yellow-600', ...studyTranslations[5] },
    { icon: Dumbbell, color: 'from-rose-500 to-pink-600', ...studyTranslations[6] },
    { icon: Stethoscope, color: 'from-teal-500 to-cyan-600', ...studyTranslations[7] },
    { icon: HardHat, color: 'from-yellow-500 to-orange-600', ...studyTranslations[8] },
    { icon: Scissors, color: 'from-fuchsia-500 to-purple-600', ...studyTranslations[9] },
  ]
  const extendedStudies = [...caseStudies, ...caseStudies, ...caseStudies]

  const [currentIndex, setCurrentIndex] = useState(caseStudies.length)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2)
      } else {
        setVisibleCount(3)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle infinite loop jump
  useEffect(() => {
    if (!isTransitioning) return

    const timer = setTimeout(() => {
      if (currentIndex < caseStudies.length) {
        setIsTransitioning(false)
        setCurrentIndex(currentIndex + caseStudies.length)
      } else if (currentIndex >= caseStudies.length * 2) {
        setIsTransitioning(false)
        setCurrentIndex(currentIndex - caseStudies.length)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [currentIndex, isTransitioning, caseStudies.length])

  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => {
        setIsTransitioning(true)
      })
    }
  }, [isTransitioning])

  const next = () => {
    setCurrentIndex((prev) => prev + 1)
  }

  const prev = () => {
    setCurrentIndex((prev) => prev - 1)
  }

  const touchStartX = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX
    if (Math.abs(diff) > 50) {
      if (diff > 0) next()
      else prev()
    }
  }

  const cardWidthPercent = 100 / visibleCount
  const gapPx = 24

  return (
    <SectionWrapper id="portfolio" bgColor="light">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-navy dark:text-white">
          {t('caseStudy.heading')}
        </h2>
        <p className="mt-4 text-dark-gray dark:text-gray-400 max-w-2xl mx-auto">
          {t('caseStudy.subtitle')}
        </p>
      </div>

      <div className="relative px-0 md:px-16">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg hidden md:flex items-center justify-center transition-all hover:bg-accent-purple hover:text-white cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg hidden md:flex items-center justify-center transition-all hover:bg-accent-purple hover:text-white cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel */}
        <div
          className="overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex ${isTransitioning ? 'transition-transform duration-300 ease-in-out' : ''}`}
            style={{
              gap: `${gapPx}px`,
              transform: `translateX(calc(-${currentIndex} * (${cardWidthPercent}% + ${gapPx / visibleCount}px) + ${gapPx / visibleCount * (visibleCount - 1) / 2}px))`,
            }}
          >
            {extendedStudies.map((study, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{ width: `calc(${cardWidthPercent}% - ${(gapPx * (visibleCount - 1)) / visibleCount}px)` }}
              >
                <GlassCard className="h-full">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${study.color} flex items-center justify-center mb-4`}>
                    <study.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-primary-navy dark:text-white mb-4">
                    {study.title}
                  </h3>

                  {/* Before/After */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-medium text-red-500 bg-red-50 dark:bg-red-950/50 px-2 py-1 rounded flex-shrink-0">{t('caseStudy.before')}</span>
                      <span className="text-sm text-dark-gray dark:text-gray-400">{study.before}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-950/50 px-2 py-1 rounded flex-shrink-0">{t('caseStudy.after')}</span>
                      <span className="text-sm text-dark-gray dark:text-gray-400">{study.after}</span>
                    </div>
                  </div>

                  {/* Savings badge */}
                  <div className="bg-gradient-to-r from-primary-navy to-accent-purple text-white text-sm font-semibold px-4 py-2 rounded-lg mb-4 inline-block">
                    {study.savings}
                  </div>

                  {/* Description */}
                  <p className="text-dark-gray dark:text-gray-400 text-sm">
                    {study.description}
                  </p>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Progress Indicator */}
        <div className="flex flex-col items-center gap-3 mt-6 md:hidden">
          <div className="flex gap-2">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(caseStudies.length + index)}
                className={`h-3 rounded-full transition-all ${
                  currentIndex % caseStudies.length === index
                    ? 'w-10 bg-accent-purple'
                    : 'w-3 bg-gray-300 dark:bg-slate-600'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-dark-gray/50 dark:text-gray-600">
            {t('caseStudy.swipe')}
          </p>
        </div>
      </div>
    </SectionWrapper>
  )
}
