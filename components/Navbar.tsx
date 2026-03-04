'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Button from './ui/Button'
import { useTranslation } from '@/lib/i18n/useTranslation'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t, locale, setLocale } = useTranslation()

  const navLinks = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.howItWorks'), href: '#how-it-works' },
    { label: t('nav.portfolio'), href: '#portfolio' },
    { label: t('nav.contact'), href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    // Scroll after menu closes
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 250)
  }

  const languageToggle = (
    <div className="flex items-center bg-light-gray dark:bg-slate-800 rounded-full p-1">
      <button
        onClick={() => setLocale('en')}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
          locale === 'en'
            ? 'bg-accent-purple text-white'
            : 'text-dark-gray dark:text-gray-400 hover:text-primary-navy dark:hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale('es')}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
          locale === 'es'
            ? 'bg-accent-purple text-white'
            : 'text-dark-gray dark:text-gray-400 hover:text-primary-navy dark:hover:text-white'
        }`}
      >
        ES
      </button>
    </div>
  )

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 anim-slide-down ${
        isScrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <img src="/vurso-icon.png" alt="" className="h-9 dark:hidden" />
            <img src="/vurso-text.png" alt="Vurso" className="h-6 dark:hidden" />
            <img src="/vurso-icon-light.png" alt="" className="h-9 hidden dark:block" />
            <img src="/vurso-text-light.png" alt="Vurso" className="h-6 hidden dark:block" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-primary-navy dark:text-gray-200 hover:text-accent-purple dark:hover:text-accent-purple transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            {/* Language Toggle */}
            {languageToggle}
            <Button href="#contact" size="sm">
              {t('nav.cta')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-primary-navy dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`collapsible md:hidden ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="overflow-hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-primary-navy dark:text-gray-200 hover:text-accent-purple transition-colors font-medium py-2"
                onClick={(e) => handleMobileNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            {/* Language Toggle */}
            {languageToggle}
            <Button
              href="#contact"
              className="w-full"
              onClick={(e) => {
                e.preventDefault()
                setIsMobileMenuOpen(false)
                setTimeout(() => {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }, 250)
              }}
            >
              {t('nav.cta')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
