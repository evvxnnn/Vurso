'use client'

import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react'
import { defaultTranslations, defaultLocale, locales, type Locale, type Translations } from './translations'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => any
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'tws-locale'

function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value)
}

function getNestedValue(obj: unknown, path: string): any {
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined
    }
    current = (current as Record<string, unknown>)[key]
  }
  return current
}

function detectLocale(): Locale {
  if (typeof window === 'undefined') {
    return defaultLocale
  }

  // Check localStorage first
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && isLocale(stored)) {
      return stored
    }
  } catch {
    // localStorage may be unavailable
  }

  // Check browser language
  const browserLang = navigator.language.split('-')[0]
  if (isLocale(browserLang)) {
    return browserLang
  }

  return defaultLocale
}

// Cache loaded translations so we don't re-import on every render
const translationsCache: Partial<Record<Locale, Translations>> = {
  en: defaultTranslations,
}

async function loadTranslations(locale: Locale): Promise<Translations> {
  if (translationsCache[locale]) {
    return translationsCache[locale]!
  }

  // Dynamic import — only es.ts is lazy-loaded
  const mod = await import('./translations/es')
  translationsCache[locale] = mod.default
  return mod.default
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [currentTranslations, setCurrentTranslations] = useState<Translations>(defaultTranslations)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const detected = detectLocale()
    setLocaleState(detected)
    loadTranslations(detected).then(setCurrentTranslations)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = locale
    }
  }, [locale, mounted])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    loadTranslations(newLocale).then(setCurrentTranslations)
    try {
      localStorage.setItem(STORAGE_KEY, newLocale)
    } catch {
      // localStorage may be unavailable
    }
  }, [])

  const t = useCallback(
    (key: string): any => {
      const value = getNestedValue(currentTranslations, key)
      if (value === undefined) {
        console.warn(`[i18n] Missing translation key: "${key}" for locale "${locale}"`)
        return key
      }
      return value
    },
    [currentTranslations, locale]
  )

  const tPreMount = useCallback((key: string): any => {
    const value = getNestedValue(defaultTranslations, key)
    return value === undefined ? key : value
  }, [])

  // Avoid hydration mismatch: render with default locale until mounted
  const contextValue: LanguageContextValue = {
    locale: mounted ? locale : defaultLocale,
    setLocale,
    t: mounted ? t : tPreMount,
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}
