'use client'

import { useState } from 'react'
import { Send, Phone, Mail, MapPin, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'
import SectionWrapper from './ui/SectionWrapper'
import Button from './ui/Button'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useInView } from '@/lib/useInView'

export default function Contact() {
  const { t } = useTranslation()
  const form = t('contact.form')
  const [ref, inView] = useInView()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formEl = e.currentTarget
    const formData = new FormData(formEl)

    try {
      const response = await fetch('https://formspree.io/f/mzdvdvko', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setIsSubmitted(true)
        formEl.reset()
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SectionWrapper id="contact" bgColor="light">
      <div ref={ref} className="grid lg:grid-cols-2 gap-12">
        {/* Left: Contact Info */}
        <div
          className={`animate-on-scroll animate-fade-left${inView ? ' in-view' : ''}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-navy dark:text-white">
            {t('contact.heading')}
            <br />
            <span className="text-accent-purple">{t('contact.headingAccent')}</span>
          </h2>

          <p className="mt-6 text-dark-gray dark:text-gray-400">
            {t('contact.description')}
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-purple/10 dark:bg-accent-purple/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-accent-purple" />
              </div>
              <div>
                <p className="text-sm text-dark-gray dark:text-gray-500">{t('contact.callLabel')}</p>
                <p className="font-semibold text-primary-navy dark:text-white">317-778-7499</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-purple/10 dark:bg-accent-purple/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent-purple" />
              </div>
              <div>
                <p className="text-sm text-dark-gray dark:text-gray-500">{t('contact.emailLabel')}</p>
                <p className="font-semibold text-primary-navy dark:text-white">contactus@vurso.io</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-purple/10 dark:bg-accent-purple/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent-purple" />
              </div>
              <div>
                <p className="text-sm text-dark-gray dark:text-gray-500">{t('contact.basedIn')}</p>
                <p className="font-semibold text-primary-navy dark:text-white">Columbus, IN</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div
          className={`animate-on-scroll animate-fade-right${inView ? ' in-view' : ''}`}
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-slate-700">
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary-navy dark:text-white mb-2">
                  {form.successTitle}
                </h3>
                <p className="text-dark-gray dark:text-gray-400">
                  {form.successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Basic Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary-navy dark:text-white mb-2">
                      {form.nameLabel}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-primary-navy dark:text-white focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 outline-none transition-all"
                      placeholder={form.namePlaceholder}
                    />
                  </div>

                  <div>
                    <label htmlFor="business" className="block text-sm font-medium text-primary-navy dark:text-white mb-2">
                      {form.businessLabel}
                    </label>
                    <input
                      type="text"
                      id="business"
                      name="business"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-primary-navy dark:text-white focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 outline-none transition-all"
                      placeholder={form.businessPlaceholder}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary-navy dark:text-white mb-2">
                      {form.emailLabel}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-primary-navy dark:text-white focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 outline-none transition-all"
                      placeholder={form.emailPlaceholder}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-primary-navy dark:text-white mb-2">
                      {form.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-primary-navy dark:text-white focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 outline-none transition-all"
                      placeholder={form.phonePlaceholder}
                    />
                  </div>
                </div>

                {/* Advanced Form Toggle */}
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm text-dark-gray dark:text-gray-400 hover:text-accent-purple dark:hover:text-accent-purple transition-colors"
                >
                  {showAdvanced ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      {form.advancedToggleHide}
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      {form.advancedToggleShow}
                    </>
                  )}
                </button>

                {/* Advanced Fields */}
                <div className={`collapsible ${showAdvanced ? 'open' : ''}`}>
                  <div>
                    <div className="space-y-5 pt-2 border-t border-gray-100 dark:border-slate-700">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="softwareSpend" className="block text-sm font-medium text-primary-navy dark:text-white mb-2">
                            {form.softwareSpendLabel}
                          </label>
                          <select
                            id="softwareSpend"
                            name="softwareSpend"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-primary-navy dark:text-white focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 outline-none transition-all"
                          >
                            <option value="">{form.softwareSpendDefault}</option>
                            {form.softwareSpendOptions.map((option: string, i: number) => (
                              <option key={i} value={['under-100', '100-300', '300-500', '500-1000', 'over-1000', 'not-sure'][i]}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="employeeCount" className="block text-sm font-medium text-primary-navy dark:text-white mb-2">
                            {form.employeeCountLabel}
                          </label>
                          <select
                            id="employeeCount"
                            name="employeeCount"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-primary-navy dark:text-white focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 outline-none transition-all"
                          >
                            <option value="">{form.employeeCountDefault}</option>
                            {form.employeeCountOptions.map((option: string, i: number) => (
                              <option key={i} value={['1', '2-5', '6-15', '16-50', '50+'][i]}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="currentTools" className="block text-sm font-medium text-primary-navy dark:text-white mb-2">
                          {form.currentToolsLabel}
                        </label>
                        <textarea
                          id="currentTools"
                          name="currentTools"
                          rows={2}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-primary-navy dark:text-white focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 outline-none transition-all resize-none"
                          placeholder={form.currentToolsPlaceholder}
                        />
                      </div>

                      <div>
                        <label htmlFor="painPoints" className="block text-sm font-medium text-primary-navy dark:text-white mb-2">
                          {form.painPointsLabel}
                        </label>
                        <textarea
                          id="painPoints"
                          name="painPoints"
                          rows={2}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-primary-navy dark:text-white focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20 outline-none transition-all resize-none"
                          placeholder={form.painPointsPlaceholder}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  {isLoading ? (
                    form.submitting
                  ) : (
                    <>
                      {form.submitButton}
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
