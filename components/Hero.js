import Link from 'next/link'
import { useLanguage } from '../contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="hero">
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/videos/home-hero-poster.webp"
        aria-hidden="true"
      >
        <source src="/videos/home-hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-content">
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.description')}</p>
        <div className="hero-buttons">
          <Link href="/properties" className="btn-primary">
            {t('hero.browse')}
          </Link>
          <Link href="/contact" className="btn-secondary">
            {t('hero.consultation')}
          </Link>
        </div>
      </div>
    </section>
  )
}
