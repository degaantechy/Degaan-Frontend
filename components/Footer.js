import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '../contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <Link href="/" aria-label={t('header.homeLabel')}>
              <Image
                src="/images/degaan-logo-gold.png"
                alt="Degaan Real Estate"
                width={900}
                height={626}
                className="footer-brand-logo"
              />
            </Link>
            <p>{t('footer.summary')}</p>
          </div>

          <div className="footer-section">
            <h4>{t('footer.quickLinks')}</h4>
            <ul>
              <li><Link href="/developments">{t('header.developments')}</Link></li>
              <li><Link href="/properties">{t('header.buy')}</Link></li>
              <li><Link href="/insights">{t('header.insights')}</Link></li>
              <li><Link href="/contact">{t('header.contact')}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t('footer.services')}</h4>
            <ul>
              <li><a href="/construction-estimator">{t('footer.construction')}</a></li>
              <li><a href="/contact?service=valuation">{t('footer.valuation')}</a></li>
              <li><a href="/contact?service=investment">{t('footer.investment')}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t('footer.contact')}</h4>
            <p>{t('footer.address')}</p>
            <p>+252 638 888 250</p>
            <p>info@degaanrealestate.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Degaan Real Estate. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}
