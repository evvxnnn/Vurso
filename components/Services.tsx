'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Code,
  Globe,
  Share2,
  Package,
  Monitor,
  Shield,
  Cloud,
  HardDrive,
  Wrench,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import GlassCard from './ui/GlassCard'
import SectionWrapper from './ui/SectionWrapper'
import { useTranslation } from '@/lib/i18n/useTranslation'
export default function Services() {
  const { t } = useTranslation()

  const items = t('services.items') as Record<string, { title: string; description: string }>
  const services = [
    { icon: Code, title: items.customSoftware.title, description: items.customSoftware.description },
    { icon: Globe, title: items.webDesign.title, description: items.webDesign.description },
    { icon: Share2, title: items.socialMedia.title, description: items.socialMedia.description },
    { icon: Package, title: items.inventory.title, description: items.inventory.description },
    { icon: Monitor, title: items.pcRepair.title, description: items.pcRepair.description },
    { icon: Shield, title: items.security.title, description: items.security.description },
    { icon: Cloud, title: items.cloud.title, description: items.cloud.description },
    { icon: HardDrive, title: items.backup.title, description: items.backup.description },
    { icon: Wrench, title: items.itSupport.title, description: items.itSupport.description },
  ]

  // Triple the services array for infinite scroll illusion
  const extendedServices = [...services, ...services, ...services]

  const [currentIndex, setCurrentIndex] = useState(services.length) // Start in the middle copy
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
      // If we've scrolled to the first copy, jump to middle
      if (currentIndex < services.length) {
        setIsTransitioning(false)
        setCurrentIndex(currentIndex + services.length)
      }
      // If we've scrolled to the third copy, jump to middle
      else if (currentIndex >= services.length * 2) {
        setIsTransitioning(false)
        setCurrentIndex(currentIndex - services.length)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [currentIndex, isTransitioning, services.length])

  // Re-enable transitions after jump
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
    <SectionWrapper id="services" bgColor="light">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-navy dark:text-white">
          {t('services.heading')}
        </h2>
        <p className="mt-4 text-dark-gray dark:text-gray-400 max-w-2xl mx-auto">
          {t('services.subtitle')}
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
            {extendedServices.map((service, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{ width: `calc(${cardWidthPercent}% - ${(gapPx * (visibleCount - 1)) / visibleCount}px)` }}
              >
                <GlassCard className="text-center h-full">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-navy to-accent-purple flex items-center justify-center">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-navy dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-dark-gray dark:text-gray-400 text-sm">
                    {service.description}
                  </p>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Progress Indicator */}
        <div className="flex flex-col items-center gap-3 mt-6 md:hidden">
          <div className="flex gap-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(services.length + index)}
                className={`h-3 rounded-full transition-all ${
                  currentIndex % services.length === index
                    ? 'w-10 bg-accent-purple'
                    : 'w-3 bg-gray-300 dark:bg-slate-600'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-dark-gray/50 dark:text-gray-600">
            {t('services.swipe')}
          </p>
        </div>
      </div>
    </SectionWrapper>
  )
}
