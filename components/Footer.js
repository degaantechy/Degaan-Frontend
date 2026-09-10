import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '../contexts/LanguageContext'

export default function Footer() {
  const { language, t } = useLanguage()
  const currentYear = new Date().getFullYear()

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
              <li><Link href="/projects">{language === 'so' ? 'Shaqooyinka' : 'Selected Work'}</Link></li>
              <li><Link href="/properties">{t('header.buy')}</Link></li>
              <li><Link href="/insights">{t('header.insights')}</Link></li>
              <li><Link href="/about">{t('footer.about')}</Link></li>
              <li><Link href="/contact">{t('header.contact')}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t('footer.services')}</h4>
            <ul>
              <li><Link href="/construction">{t('footer.construction')}</Link></li>
              <li><Link href="/construction-estimator">{language === 'so' ? 'Qiyaas Dhisme' : 'Construction Estimator'}</Link></li>
              <li><Link href="/contact?service=valuation">{t('footer.valuation')}</Link></li>
              <li><Link href="/partner">{language === 'so' ? 'Dhul & Maalgashi' : 'Land & Investment'}</Link></li>
              <li><Link href="/contact?service=investment">{t('footer.investment')}</Link></li>
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
          <p>&copy; {currentYear} Degaan Real Estate &amp; Construction. {t('footer.rights')}</p>
          <div className="footer-legal-links">
            <Link href="/privacy">{language === 'so' ? 'Asturnaanta' : 'Privacy'}</Link>
            <Link href="/terms">{language === 'so' ? 'Shuruudaha' : 'Terms'}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
