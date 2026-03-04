'use client'

import { Facebook, Twitter, Instagram } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useInView } from '@/lib/useInView'

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61587803743451', label: 'Facebook' },
  { icon: Twitter, href: 'https://x.com/vursollc', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/vursollc', label: 'Instagram' },
]

const columnDelayClasses = ['delay-0', 'delay-100', 'delay-200', 'delay-300']

export default function Footer() {
  const { t } = useTranslation()
  const [ref, inView] = useInView()
  const currentYear = new Date().getFullYear()

  const services = t('footer.services')
  const company = t('footer.company')
  const footerLinks = {
    services: [
      { label: services.customSoftware, href: '#services' },
      { label: services.webDevelopment, href: '#services' },
      { label: services.socialMedia, href: '#services' },
      { label: services.inventorySystems, href: '#services' },
    ],
    company: [
      { label: company.howItWorks, href: '#how-it-works' },
      { label: company.portfolio, href: '#portfolio' },
      { label: company.contact, href: '#contact' },
    ],
  }

  return (
    <footer className="bg-primary-navy dark:bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Main Footer */}
        <div ref={ref} className="py-12 md:py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div
            className={`animate-on-scroll animate-fade-up ${columnDelayClasses[0]}${inView ? ' in-view' : ''}`}
          >
            <a href="#" className="flex items-center gap-2">
              <img src="/vurso-icon-light.png" alt="" className="h-9" />
              <img src="/vurso-text-light.png" alt="Vurso" className="h-6" />
            </a>
            <p className="mt-4 text-white/70 max-w-xs">
              {t('footer.description')}
            </p>
          </div>

          {/* Services */}
          <div
            className={`animate-on-scroll animate-fade-up ${columnDelayClasses[1]}${inView ? ' in-view' : ''}`}
          >
            <h3 className="font-semibold mb-4">{t('footer.servicesHeading')}</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div
            className={`animate-on-scroll animate-fade-up ${columnDelayClasses[2]}${inView ? ' in-view' : ''}`}
          >
            <h3 className="font-semibold mb-4">{t('footer.companyHeading')}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div
            className={`animate-on-scroll animate-fade-up ${columnDelayClasses[3]}${inView ? ' in-view' : ''}`}
          >
            <h3 className="font-semibold mb-4">{t('footer.contactHeading')}</h3>
            <div className="space-y-2 text-white/70">
              <p>317-778-7499</p>
              <p>contactus@vurso.io</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent-purple transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            &copy; {currentYear} {t('footer.copyright')}
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacyPolicy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.termsOfService')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
