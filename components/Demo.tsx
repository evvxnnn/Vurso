'use client'

import { useState, lazy, Suspense } from 'react'
import {
  Package,
  ShoppingBag,
  CreditCard,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader2
} from 'lucide-react'
import SectionWrapper from './ui/SectionWrapper'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { DemoProvider } from './demo/DemoContext'
import { useInView } from '@/lib/useInView'

const DemoInventory = lazy(() => import('./demo/DemoInventory'))
const DemoStorefront = lazy(() => import('./demo/DemoStorefront'))
const DemoCustomerView = lazy(() => import('./demo/DemoCustomerView'))
const DemoSellerView = lazy(() => import('./demo/DemoSellerView'))

const demoComponents = [DemoInventory, DemoStorefront, DemoCustomerView, DemoSellerView]

export default function Demo() {
  const { t } = useTranslation()

  const tabs = t('demo.tabs') as Record<string, {
    label: string
    title: string
    subtitle: string
    description: string
    features: string[]
    placeholder: string
  }>

  const demoTabs = [
    { id: 'inventory', icon: Package, ...tabs.inventory },
    { id: 'storefront', icon: ShoppingBag, ...tabs.storefront },
    { id: 'customerOrder', icon: CreditCard, ...tabs.customerOrder },
    { id: 'sellerOrder', icon: ClipboardList, ...tabs.sellerOrder },
  ]

  const [activeExample, setActiveExample] = useState<'retail' | 'salon'>('retail')
  const [activeTab, setActiveTab] = useState(0)

  const [liveStoreRef, liveStoreInView] = useInView()

  const nextTab = () => {
    setActiveTab((prev) => (prev + 1) % demoTabs.length)
  }

  const prevTab = () => {
    setActiveTab((prev) => (prev - 1 + demoTabs.length) % demoTabs.length)
  }

  const goToTab = (index: number) => {
    setActiveTab(index)
  }

  const currentTab = demoTabs[activeTab]
  const ActiveDemoComponent = demoComponents[activeTab]

  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-navy dark:text-white">
          {t('demo.heading')}
        </h2>
        <p className="mt-4 text-dark-gray dark:text-gray-400 max-w-2xl mx-auto">
          {t('demo.subtitle')}
        </p>
      </div>

      {/* Example Selector */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex gap-1.5 bg-light-gray dark:bg-slate-800 p-1.5 rounded-xl">
          <button
            onClick={() => { setActiveExample('retail'); setActiveTab(0) }}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeExample === 'retail'
                ? 'bg-accent-purple text-white shadow-md'
                : 'text-dark-gray dark:text-gray-400 hover:text-primary-navy dark:hover:text-white'
            }`}
          >
            {t('demo.examples.retail') as string}
          </button>
          <button
            disabled
            className="px-4 py-1.5 rounded-lg text-sm font-medium text-dark-gray/40 dark:text-gray-600 cursor-not-allowed"
          >
            {t('demo.examples.salon') as string}{' '}
            <span className="text-xs">({t('demo.examples.comingSoon') as string})</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex flex-wrap justify-center gap-2 bg-light-gray dark:bg-slate-800 p-2 rounded-2xl">
          {demoTabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => goToTab(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === index
                  ? 'bg-white dark:bg-slate-700 text-accent-purple shadow-md'
                  : 'text-dark-gray dark:text-gray-400 hover:text-primary-navy dark:hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <DemoProvider>
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevTab}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 z-10 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg hidden xl:flex items-center justify-center transition-all hover:bg-accent-purple hover:text-white cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextTab}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 z-10 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg hidden xl:flex items-center justify-center transition-all hover:bg-accent-purple hover:text-white cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            key={activeTab}
            className="tab-content grid lg:grid-cols-2 gap-8 items-center"
          >
            {/* Interactive Demo */}
            <div className="relative bg-gradient-to-br from-light-purple to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 aspect-[4/3] flex flex-col overflow-hidden">
              {/* Browser Chrome */}
              <div className="flex-shrink-0 h-8 bg-gray-100 dark:bg-slate-700 rounded-t-2xl flex items-center px-3 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 mx-4">
                  <div className="bg-white dark:bg-slate-600 rounded-md h-4 max-w-xs mx-auto flex items-center justify-center">
                    <span className="text-[9px] text-dark-gray/40 dark:text-gray-500">yourstore.vurso.com</span>
                  </div>
                </div>
              </div>

              {/* Interactive Content */}
              <div className="flex-1 overflow-hidden">
                <Suspense fallback={
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-5 h-5 text-accent-purple/40 animate-spin" />
                  </div>
                }>
                  <ActiveDemoComponent />
                </Suspense>
              </div>
            </div>

            {/* Description */}
            <div className="lg:pl-8">
              <div className="inline-flex items-center gap-2 bg-accent-purple/10 dark:bg-accent-purple/20 text-accent-purple px-4 py-2 rounded-full text-sm font-medium mb-4">
                <currentTab.icon className="w-4 h-4" />
                {currentTab.subtitle}
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-primary-navy dark:text-white mb-4">
                {currentTab.title}
              </h3>

              <p className="text-dark-gray dark:text-gray-400 mb-6">
                {currentTab.description}
              </p>

              <ul className="space-y-3 mb-8">
                {currentTab.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <span className="text-dark-gray dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Progress Indicator */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    {demoTabs.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToTab(index)}
                        className={`h-3 rounded-full transition-all ${
                          index === activeTab
                            ? 'w-10 bg-accent-purple'
                            : 'w-3 bg-gray-300 dark:bg-slate-600 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-dark-gray dark:text-gray-500">
                    {activeTab + 1} / {demoTabs.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Store Link */}
          <div
            ref={liveStoreRef}
            className={`mt-12 text-center animate-on-scroll animate-fade-up ${liveStoreInView ? 'in-view' : ''}`}
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 text-accent-purple hover:text-primary-navy dark:hover:text-white transition-colors font-medium"
            >
              <span>{t('demo.liveStoreLink')}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-sm text-dark-gray/50 dark:text-gray-500 mt-2">
              {t('demo.liveStoreDescription')}
            </p>
          </div>
        </div>
      </DemoProvider>
    </SectionWrapper>
  )
}
