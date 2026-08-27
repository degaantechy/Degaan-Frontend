import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useLanguage } from '../contexts/LanguageContext'

export default function Developments() {
  const { t } = useLanguage()

  return (
    <>
      <Head>
        <title>{t('developments.seoTitle')}</title>
        <meta name="description" content={t('developments.seoDescription')} />
        <link rel="canonical" href="https://www.degaanrealestate.com/developments" />
      </Head>

      <section className="developments-hero">
        <div className="container">
          <p className="section-kicker">{t('developments.kicker')}</p>
          <h1>{t('developments.title')}</h1>
          <p>{t('developments.intro')}</p>
        </div>
      </section>

      <section className="projects-showcase developments-listing">
        <div className="container">
          <article className="portfolio-feature">
            <Link href="/projects/sareedo-court" className="portfolio-image-link" aria-label={t('home.sareedoLabel')}>
              <Image
                src="/images/projects/sareedo-court/residence.webp"
                alt={t('home.sareedoAlt')}
                width={1448}
                height={1086}
                className="portfolio-image"
                sizes="(max-width: 900px) 100vw, 58vw"
                priority
              />
            </Link>

            <div className="portfolio-copy">
              <div className="portfolio-status-row">
                <span className="portfolio-number">01</span>
                <span className="project-status">{t('home.upcoming')}</span>
              </div>
              <p className="portfolio-location">{t('home.sareedoLocation')}</p>
              <h2>Sareedo Court</h2>
              <p className="portfolio-summary">{t('home.sareedoSummary')}</p>
              <dl className="portfolio-meta">
                <div><dt>{t('home.plot')}</dt><dd>12 × 24 m</dd></div>
                <div><dt>{t('home.from')}</dt><dd>USD 63.4K</dd></div>
                <div><dt>{t('home.completion')}</dt><dd>{t('home.completionDate')}</dd></div>
              </dl>
              <Link href="/projects/sareedo-court" className="project-link">
                {t('home.exploreSareedo')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
