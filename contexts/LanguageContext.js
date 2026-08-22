import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from '../lib/translations'

const LanguageContext = createContext(null)

function resolveTranslation(language, path) {
  return path.split('.').reduce((value, key) => value?.[key], translations[language])
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en')
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem('degaan-language')
    const browserLanguage = window.navigator.language?.toLowerCase().startsWith('so') ? 'so' : 'en'
    setLanguageState(storedLanguage === 'so' || storedLanguage === 'en' ? storedLanguage : browserLanguage)
    setInitialized(true)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = 'ltr'

    if (initialized) {
      window.localStorage.setItem('degaan-language', language)
    }
  }, [initialized, language])

  const setLanguage = useCallback((nextLanguage) => {
    if (nextLanguage === 'en' || nextLanguage === 'so') {
      setLanguageState(nextLanguage)
    }
  }, [])

  const t = useCallback((path, params = {}) => {
    const value = resolveTranslation(language, path) ?? resolveTranslation('en', path) ?? path

    if (typeof value !== 'string') return value

    return Object.entries(params).reduce(
      (text, [key, replacement]) => text.replaceAll(`{${key}}`, String(replacement)),
      value
    )
  }, [language])

  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t,
  }), [language, setLanguage, t])

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }

  return context
}
