import { useEffect, useMemo, useState } from 'react'
import { uz } from '@/i18n/uz'
import { ru } from '@/i18n/ru'
import { LanguageContext } from '@/hooks/useLanguage'

const translations = { uz, ru }

function getInitialLang() {
  const stored = window.localStorage.getItem('crm-lang')
  if (stored === 'uz' || stored === 'ru') return stored
  return 'uz'
}

function resolve(dict, key) {
  return key.split('.').reduce((node, part) => node?.[part], dict)
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    window.localStorage.setItem('crm-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = useMemo(() => {
    return (key) => {
      const value = resolve(translations[lang], key)
      if (value != null) return value
      return resolve(translations.uz, key) ?? key
    }
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
