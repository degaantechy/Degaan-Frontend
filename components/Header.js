import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const contactMenuRef = useRef(null)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (contactMenuRef.current && !contactMenuRef.current.contains(event.target)) {
        setContactOpen(false)
      }
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setContactOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  const closeNavigation = () => {
    setMenuOpen(false)
    setContactOpen(false)
  }

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
          <span className="brand-logo-text" aria-hidden="true">
            <strong>Degaan</strong>
            <small>Real Estate</small>
          </span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => {
            setMenuOpen(!menuOpen)
            if (menuOpen) setContactOpen(false)
          }}
          aria-label={menuOpen ? t('header.closeMenu') : t('header.openMenu')}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          <span aria-hidden="true" className="menu-icon">
            <span />
            <span />
          </span>
          <span className="sr-only">{menuOpen ? t('header.closeMenu') : t('header.openMenu')}</span>
        </button>

        <nav id="primary-navigation" className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link href="/developments" onClick={closeNavigation}>{t('header.developments')}</Link>
          <Link href="/properties" onClick={closeNavigation}>{t('header.buy')}</Link>
          <Link href="/insights" onClick={closeNavigation}>{t('header.insights')}</Link>

          <div ref={contactMenuRef} className={`contact-menu ${contactOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="contact-menu-toggle"
              aria-expanded={contactOpen}
              aria-haspopup="menu"
              aria-controls="contact-options"
              onClick={() => setContactOpen(!contactOpen)}
            >
              {t('header.contact')}
              <span className="contact-caret" aria-hidden="true">⌄</span>
            </button>

            <div id="contact-options" className="contact-dropdown" role="menu" aria-label={t('header.contactOptions')}>
              <Link href="/contact" role="menuitem" onClick={closeNavigation}>
                <span>
                  <strong>{t('header.contactPage')}</strong>
                  <small>{t('header.contactPageDescription')}</small>
                </span>
                <span className="contact-option-arrow" aria-hidden="true">→</span>
              </Link>
              <a
                href="https://wa.me/252638888250"
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                onClick={closeNavigation}
              >
                <span>
                  <strong>{t('header.whatsappContact')}</strong>
                  <small>+252 63 8888250</small>
                </span>
                <span className="contact-option-arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

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
