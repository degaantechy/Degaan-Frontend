import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '../../contexts/LanguageContext'

export default function SareedoCourt() {
  const { language, t } = useLanguage()
  const features = t('sareedo.features')

  return (
    <>
      <Head>
        <title>{t('sareedo.seoTitle')}</title>
        <meta
          name="description"
          content={t('sareedo.seoDescription')}
        />
        <meta property="og:title" content="Sareedo Court | Degaan Real Estate" />
        <meta
          property="og:description"
          content={t('sareedo.ogDescription')}
        />
        <meta property="og:image" content="/images/projects/sareedo-court/residence.webp" />
        <meta property="og:locale" content={language === 'so' ? 'so_SO' : 'en_US'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <article className="project-page">
        <header className="project-hero">
          <div className="container project-hero-content">
            <div className="project-hero-copy">
              <Link href="/#projects" className="project-back-link">← {t('sareedo.back')}</Link>
              <p className="section-kicker">{t('sareedo.kicker')}</p>
              <h1>Sareedo Court</h1>
              <p className="project-lead">
                {t('sareedo.lead')}
              </p>
              <div className="project-hero-actions">
                <Link href="/contact?project=sareedo-court" className="btn-primary">{t('sareedo.register')}</Link>
                <a
                  href="https://wa.me/252638888250"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  {t('sareedo.askWhatsapp')}
                </a>
              </div>
            </div>

            <dl className="project-hero-facts">
              <div>
                <dt>{t('sareedo.location')}</dt>
                <dd>{t('sareedo.locationValue')}</dd>
              </div>
              <div>
                <dt>{t('sareedo.launch')}</dt>
                <dd>{t('sareedo.launchValue')}</dd>
              </div>
              <div>
                <dt>{t('sareedo.startingPrice')}</dt>
                <dd>USD 63.4K</dd>
              </div>
              <div>
                <dt>{t('sareedo.completion')}</dt>
                <dd>{t('sareedo.completionValue')}</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="project-hero-image-wrap">
          <Image
            src="/images/projects/sareedo-court/residence.webp"
            alt={t('sareedo.heroAlt')}
            width={1448}
            height={1086}
            className="project-hero-image"
            priority
            sizes="100vw"
          />
        </div>

        <section className="project-overview">
          <div className="container project-overview-grid">
            <div>
              <p className="section-kicker">{t('sareedo.overviewKicker')}</p>
              <h2>{t('sareedo.overviewTitle')}</h2>
            </div>
            <div className="project-overview-copy">
              <p>
                {t('sareedo.overviewText')}
              </p>
              <dl className="project-specs">
                <div>
                  <dt>{t('sareedo.homeType')}</dt>
                  <dd>{t('sareedo.homeTypeValue')}</dd>
                </div>
                <div>
                  <dt>{t('sareedo.plotSize')}</dt>
                  <dd>12 × 24 m</dd>
                </div>
                <div>
                  <dt>{t('sareedo.bedrooms')}</dt>
                  <dd>{t('sareedo.bedroomsValue')}</dd>
                </div>
                <div>
                  <dt>{t('sareedo.bathrooms')}</dt>
                  <dd>3</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="project-features-section">
          <div className="container">
            <div className="section-heading section-heading-split">
              <div>
                <p className="section-kicker">{t('sareedo.included')}</p>
                <h2>{t('sareedo.featuresTitle')}</h2>
              </div>
              <p>{t('sareedo.featuresIntro')}</p>
            </div>
            <ul className="project-features-grid">
              {features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
        </section>

        <section className="project-gallery-section">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">{t('sareedo.galleryKicker')}</p>
              <h2>{t('sareedo.galleryTitle')}</h2>
            </div>

            <figure className="project-gallery-feature">
              <Image
                src="/images/projects/sareedo-court/site-plan.webp"
                alt={t('sareedo.siteAlt')}
                width={1536}
                height={1024}
                className="project-gallery-image"
                sizes="(max-width: 1180px) 100vw, 1180px"
              />
              <figcaption>{t('sareedo.siteCaption')}</figcaption>
            </figure>

            <figure className="project-floor-plan">
              <div className="project-floor-plan-copy">
                <p className="section-kicker">{t('sareedo.planKicker')}</p>
                <h3>{t('sareedo.planTitle')}</h3>
                <p>
                  {t('sareedo.planText')}
                </p>
              </div>
              <Image
                src="/images/projects/sareedo-court/floor-plan.webp"
                alt={t('sareedo.planAlt')}
                width={1191}
                height={1320}
                className="project-floor-plan-image"
                sizes="(max-width: 800px) 100vw, 55vw"
              />
            </figure>
          </div>
        </section>

        <section className="project-enquiry">
          <div className="container project-enquiry-inner">
            <div>
              <p className="section-kicker">Sareedo Court</p>
              <h2>{t('sareedo.enquiryTitle')}</h2>
              <p>{t('sareedo.enquiryText')}</p>
            </div>
            <Link href="/contact?project=sareedo-court" className="btn-primary">{t('sareedo.register')}</Link>
          </div>
        </section>
      </article>
    </>
  )
}
