import en from './en'

export type Translations = typeof en
export type Locale = 'en' | 'es'

export const defaultTranslations: Translations = en
export const defaultLocale: Locale = 'en'
export const locales: Locale[] = ['en', 'es']
