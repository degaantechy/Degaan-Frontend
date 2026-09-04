import Head from 'next/head'

import ConstructionEstimator from '../components/ConstructionEstimator'
import { useLanguage } from '../contexts/LanguageContext'

const PAGE_COPY = {
  en: {
    seoTitle: 'Construction Cost Calculator | Degaan Real Estate',
    seoDescription: 'Plan your Somaliland construction project and receive an indicative cost estimate using Degaan Real Estate planning rates.',
    kicker: 'Construction planning',
    title: 'Build with greater cost clarity',
    intro: 'Describe your plot, building and external works to receive a preliminary project estimate in minutes.',
  },
  so: {
    seoTitle: 'Xisaabiyaha Qiimaha Dhismaha | Degaan Real Estate',
    seoDescription: 'Qorshee mashruucaaga dhismaha Somaliland oo hel qiyaas hordhac ah adigoo adeegsanaya qiimayaasha qorshaynta ee Degaan Real Estate.',
    kicker: 'Qorshaynta dhismaha',
    title: 'Dhis adigoo qiimaha si cad u fahamsan',
    intro: 'Faahfaahi dhulkaaga, dhismaha iyo shaqada bannaanka si aad daqiiqado gudahood u hesho qiyaas hordhac ah.',
  },
}

export default function ConstructionEstimatorPage() {
  const { language } = useLanguage()
  const copy = PAGE_COPY[language] || PAGE_COPY.en

  return (
    <>
      <Head>
        <title>{copy.seoTitle}</title>
        <meta name="description" content={copy.seoDescription} />
      </Head>

      <header className="estimator-page-hero">
        <div className="container">
          <p className="section-kicker">{copy.kicker}</p>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
        </div>
      </header>

      <div className="container estimator-page-content">
        <ConstructionEstimator />
      </div>
    </>
  )
}
