import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PropertyCard from '../components/PropertyCard'
import Hero from '../components/Hero'
import ContactForm from '../components/ContactForm'
import { useLanguage } from '../contexts/LanguageContext'
import { API_BASE_URL } from '../lib/api'

export default function Home() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const { language, t } = useLanguage()

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/properties/?limit=6`
      )
      setProperties(response.data.results || [])
    } catch (error) {
      console.error('Failed to fetch properties:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home-page">
      <Head>
        <title>{t('home.seoTitle')}</title>
        <meta name="description" content={t('home.seoDescription')} />
        <meta property="og:locale" content={language === 'so' ? 'so_SO' : 'en_US'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Hero />

      <section className="services">
        <div className="container">
          <h2>{t('home.servicesTitle')}</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>{t('home.constructionTitle')}</h3>
              <p>{t('home.constructionText')}</p>
              <Link href="/contact?service=construction">{t('home.quote')}</Link>
            </div>
            <div className="service-card">
              <h3>{t('home.buySellTitle')}</h3>
              <p>{t('home.buySellText')}</p>
              <Link href="/properties">{t('home.browse')}</Link>
            </div>
            <div className="service-card">
              <h3>{t('home.valuationTitle')}</h3>
              <p>{t('home.valuationText')}</p>
              <Link href="/contact?service=valuation">{t('home.getValuation')}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="projects-showcase" id="projects">
        <div className="container">
          <div className="section-heading section-heading-split">
            <div>
              <p className="section-kicker">{t('home.portfolioKicker')}</p>
              <h2>{t('home.portfolioTitle')}</h2>
            </div>
            <p>
              {t('home.portfolioIntro')}
            </p>
          </div>

          <article className="portfolio-feature">
            <Link href="/projects/sareedo-court" className="portfolio-image-link" aria-label={t('home.sareedoLabel')}>
              <Image
                src="/images/projects/sareedo-court/residence.webp"
                alt={t('home.sareedoAlt')}
                width={1448}
                height={1086}
                className="portfolio-image"
                sizes="(max-width: 900px) 100vw, 58vw"
              />
            </Link>

            <div className="portfolio-copy">
              <div className="portfolio-status-row">
                <span className="portfolio-number">01</span>
                <span className="project-status">{t('home.upcoming')}</span>
              </div>
              <p className="portfolio-location">{t('home.sareedoLocation')}</p>
              <h3>Sareedo Court</h3>
              <p className="portfolio-summary">
                {t('home.sareedoSummary')}
              </p>

              <dl className="portfolio-meta">
                <div>
                  <dt>{t('home.plot')}</dt>
                  <dd>12 × 24 m</dd>
                </div>
                <div>
                  <dt>{t('home.from')}</dt>
                  <dd>USD 63.4K</dd>
                </div>
                <div>
                  <dt>{t('home.completion')}</dt>
                  <dd>{t('home.completionDate')}</dd>
                </div>
              </dl>

              <Link href="/projects/sareedo-court" className="project-link">
                {t('home.exploreSareedo')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="featured-properties">
        <div className="container">
          <h2>{t('home.featured')}</h2>
          {loading ? (
            <p>{t('home.loading')}</p>
          ) : properties.length > 0 ? (
            <div className="properties-grid">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p>{t('home.noneAvailable')}</p>
          )}
          <div className="text-center">
            <Link href="/properties" className="btn-primary">
              {t('home.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      <section className="why-choose-us">
        <div className="container">
          <h2>{t('home.whyTitle')}</h2>
          <div className="reasons-grid">
            <div className="reason">
              <h4>{t('home.expertTitle')}</h4>
              <p>{t('home.expertText')}</p>
            </div>
            <div className="reason">
              <h4>{t('home.qualityTitle')}</h4>
              <p>{t('home.qualityText')}</p>
            </div>
            <div className="reason">
              <h4>{t('home.pricingTitle')}</h4>
              <p>{t('home.pricingText')}</p>
            </div>
            <div className="reason">
              <h4>{t('home.deliveryTitle')}</h4>
              <p>{t('home.deliveryText')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>{t('home.ctaTitle')}</h2>
          <p>{t('home.ctaText')}</p>
          <div className="cta-buttons">
            <Link href="/contact" className="btn-primary">{t('home.schedule')}</Link>
            <a href="https://wa.me/252638888250" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              {t('home.chatWhatsapp')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
