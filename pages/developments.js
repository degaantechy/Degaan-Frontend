import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import DevelopmentCard from '../components/DevelopmentCard'
import { useLanguage } from '../contexts/LanguageContext'
import { developments } from '../lib/developments'

export default function Developments() {
  const { language, t } = useLanguage()

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

      <section className="subpage-section">
        <div className="container subpage-split">
          <div>
            <p className="upgrade-kicker">{language === 'so' ? 'Mashruuc soo socda' : 'Upcoming project'}</p>
            <h2>Sareedo Court</h2>
            <p className="section-lead">{t('sareedo.lead')}</p>
            <dl className="project-specs">
              <div><dt>{t('sareedo.location')}</dt><dd>{t('sareedo.locationValue')}</dd></div>
              <div><dt>{t('sareedo.startingPrice')}</dt><dd>USD 63.4K</dd></div>
              <div><dt>{t('sareedo.launch')}</dt><dd>{t('sareedo.launchValue')}</dd></div>
              <div><dt>{t('sareedo.completion')}</dt><dd>{t('sareedo.completionValue')}</dd></div>
            </dl>
            <div className="subpage-actions">
              <Link href="/projects/sareedo-court" className="btn-primary">{language === 'so' ? 'Arag Sareedo Court' : 'Explore Sareedo Court'}</Link>
              <Link href="/contact?project=sareedo-court" className="btn-secondary">{t('sareedo.register')}</Link>
            </div>
          </div>
          <Image src="/images/projects/sareedo-court/residence.webp" alt={t('sareedo.heroAlt')} width={1448} height={1086} style={{ width: '100%', height: 'auto' }} />
        </div>
      </section>

      <section className="projects-showcase developments-listing">
        <div className="container">
          <div className="section-heading-upgrade">
            <div>
              <p className="upgrade-kicker">{language === 'so' ? 'Development pipeline' : 'Development pipeline'}</p>
              <h2>{language === 'so' ? 'Fikradaha mustaqbalka ee hadda la horumarinayo.' : 'Future concepts currently being developed.'}</h2>
            </div>
            <p>{language === 'so' ? 'Qaybtani waxay muujinaysaa fikrado pre-launch ah. Waxay ka duwan yihiin mashruuc la bilaabay ama hanti diyaar u ah heshiis.' : 'These are pre-launch development concepts. They are intentionally separated from an active project or a property available for formal commitment.'}</p>
          </div>
          <div className="developments-grid">
            {developments.map((project, index) => (
              <DevelopmentCard key={project.slug} project={project} index={index} language={language} priority={index < 2} />
            ))}
          </div>
          <p className="concept-note">{t('home.conceptNote')}</p>
        </div>
      </section>
    </>
  )
}
