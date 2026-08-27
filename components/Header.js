import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="brand-logo" aria-label={t('header.homeLabel')}>
          <Image
            src="/images/degaan-mark.png"
            alt="Degaan Real Estate"
            width={512}
            height={512}
            className="brand-logo-image"
            priority
          />
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? t('header.closeMenu') : t('header.openMenu')}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          ☰
        </button>

        <nav id="primary-navigation" className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link href="/developments" onClick={() => setMenuOpen(false)}>{t('header.developments')}</Link>
          <Link href="/properties" onClick={() => setMenuOpen(false)}>{t('header.buy')}</Link>
          <Link href="/insights" onClick={() => setMenuOpen(false)}>{t('header.insights')}</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>{t('header.contact')}</Link>
          <div className="language-switcher" role="group" aria-label={t('language.label')}>
            <button
              type="button"
              className={language === 'en' ? 'active' : ''}
              aria-pressed={language === 'en'}
              onClick={() => setLanguage('en')}
              title={t('language.english')}
            >
              EN
            </button>
            <span aria-hidden="true"></span>
            <button
              type="button"
              className={language === 'so' ? 'active' : ''}
              aria-pressed={language === 'so'}
              onClick={() => setLanguage('so')}
              title={t('language.somali')}
            >
              SO
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
