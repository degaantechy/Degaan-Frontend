import Head from 'next/head'

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

      <section className="projects-showcase developments-listing">
        <div className="container">
          <div className="developments-grid">
            {developments.map((project, index) => (
              <DevelopmentCard
                key={project.slug}
                project={project}
                index={index}
                language={language}
                priority={index < 2}
              />
            ))}
          </div>
          <p className="concept-note">{t('home.conceptNote')}</p>
        </div>
      </section>
    </>
  )
}
