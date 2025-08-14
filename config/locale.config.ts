import { GLOBAL } from 'hgss'
import { en, fr, es } from 'hgss-locale'

export const locales = { en, fr, es } as const
type   AppLocaleType = keyof typeof locales

const  activeLocale: AppLocaleType = (GLOBAL.LOCALE.LANG as AppLocaleType) || 'en'
export const ACTIVE_LOCALE         = locales[activeLocale]