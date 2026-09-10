import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useLanguage } from '../../contexts/LanguageContext'
import { developments, getDevelopmentCopy } from '../../lib/developments'
import { trackAnalyticsEvent } from '../../lib/analytics'

const EXTRA = {
  'berbera-bay-residences': {
    en: {
      vision: 'A coastal residential concept designed around resort-style living, sea access and a professionally managed shared environment.',
      features: ['One to three-bedroom apartment concepts', 'Pool and resident leisure spaces', 'Landscaped coastal promenade', 'Shaded outdoor circulation', 'Professionally managed common amenities', 'Climate-responsive coastal design approach'],
      audience: 'Home buyers, diaspora buyers and investors seeking a managed coastal property concept in Berbera.',
    },
    so: {
      vision: 'Fikrad degaan xeebeed oo ku dhisan resort-style living, helitaanka badda iyo goobo wadaag ah oo si xirfad leh loo maamulo.',
      features: ['Apartments hal ilaa saddex qol jiif ah', 'Barkad iyo goobo nasasho', 'Coastal promenade cagaaran', 'Marinno bannaanka ah oo hadhsan', 'Adeegyo wadaag ah oo la maamulo', 'Naqshad ku habboon cimilada xeebta'],
      audience: 'Iibsadayaasha guryaha, diaspora iyo maalgashadayaasha danaynaya hanti xeebeed la maamulo oo Berbera ah.',
    },
  },
  'hargeisa-heights': {
    en: {
      vision: 'An urban apartment concept intended to combine efficient city living with secure access, shared amenities and practical building services.',
      features: ['One to three-bedroom apartment concepts', 'Lift-served vertical living', 'Shaded balconies', 'Solar-ready parking strategy', 'Shared resident spaces', 'Secure common access planning'],
      audience: 'Urban households, professionals, diaspora buyers and long-term rental investors in Hargeisa.',
    },
    so: {
      vision: 'Fikrad apartment magaalada ah oo isku daraysa nolol city ah, access ammaan ah, adeegyo wadaag ah iyo building services wax-ku-ool ah.',
      features: ['Apartments hal ilaa saddex qol jiif ah', 'Wiishash', 'Balakoonno hadhsan', 'Parking solar-ready ah', 'Goobo dadka deggan wadaagaan', 'Access ammaan ah oo la qorsheeyey'],
      audience: 'Qoysaska magaalada, xirfadlayaasha, diaspora iyo maalgashadayaasha kirada muddada dheer ee Hargeysa.',
    },
  },
  'damal-village': {
    en: {
      vision: 'A planned family neighborhood concept with a mix of single-storey homes and G+1 villas connected by organized streets and everyday community spaces.',
      features: ['Bungalows and G+1 villa concepts', 'Paved internal road planning', 'Street lighting strategy', 'Children’s play areas', 'Walkable community layout', 'Everyday service zones'],
      audience: 'Families looking for a planned residential environment with more structure than a stand-alone plot development.',
    },
    so: {
      vision: 'Fikrad xaafad qoys oo qorshaysan, kana kooban bungalow iyo G+1 villas oo ay isku xidhaan waddooyin nidaamsan iyo goobo bulsho.',
      features: ['Bungalows iyo G+1 villas', 'Waddooyin gudaha ah oo la qorsheeyey', 'Street lighting', 'Goobaha carruurta', 'Layout lagu lugeyn karo', 'Goobo adeeg maalinle ah'],
      audience: 'Qoysaska doonaya deegaan qorshaysan oo ka nidaamsan dhul keli ah oo gaar loo dhisto.',
    },
  },
  'berbera-palm-village': {
    en: {
      vision: 'A family housing concept for Berbera where shade, ventilation, solar readiness and outdoor living influence the planning from the beginning.',
      features: ['Bungalow and G+1 villa concepts', 'Shaded courtyard thinking', 'Solar-ready roof planning', 'Green-street strategy', 'Heat-conscious building orientation', 'Convenient connection to Berbera'],
      audience: 'Families and buyers seeking climate-conscious housing in Berbera outside a resort-apartment format.',
    },
    so: {
      vision: 'Fikrad guryo qoys oo Berbera ah halkaas oo hadhka, hawo-qaadashada, solar readiness iyo outdoor living ay bilowga ka saameeyaan qorshaha.',
      features: ['Bungalow iyo G+1 villas', 'Dayrar hadhsan', 'Saqafyo solar-ready ah', 'Waddooyin cagaaran', 'Orientation kulaylka tixgelisa', 'Xidhiidh fudud oo Berbera ah'],
      audience: 'Qoysaska iyo iibsadayaasha doonaya guryo cimilada Berbera tixgeliya oo aan ahayn resort apartments.',
    },
  },
  'arabsiyo-green-village': {
    en: {
      vision: 'A lower-density suburban concept intended to combine access to Hargeisa with gardens, open views and a greener family-living environment.',
      features: ['Single-storey and G+1 home concepts', 'Garden-oriented plots', 'Tree-lined street concept', 'Lower-density planning', 'Open-view corridors', 'Connection to Hargeisa'],
      audience: 'Families seeking more land, greenery and a quieter residential setting while remaining connected to Hargeisa.',
    },
    so: {
      vision: 'Fikrad suburban ah oo density-geedu hooseeyo, isku daraysa helitaanka Hargeysa, beero, muuqaal furan iyo nolol qoys oo cagaaran.',
      features: ['Guryo hal dabaq iyo G+1', 'Plots beer leh', 'Waddooyin geedo leh', 'Density hoose', 'Muuqaallo furan', 'Xidhiidh Hargeysa'],
      audience: 'Qoysaska doonaya dhul badan, cagaar iyo deegaan deggen iyagoo weli Hargeysa ku xidhan.',
    },
  },
  'hilaac-mall': {
    en: {
      vision: 'A flexible commercial-investment concept that organizes retail, dining, parking and shaded pedestrian movement within one destination.',
      features: ['Retail and dining unit concepts', 'Flexible investment unit sizes', 'Two-level commercial planning', 'Organized parking', 'Shaded arcade concept', 'Solar-canopy strategy'],
      audience: 'Retail operators, commercial investors and businesses seeking organized space within a planned destination.',
    },
    so: {
      vision: 'Fikrad maalgashi ganacsi oo dabacsan oo isku nidaamisa retail, dining, parking iyo socodka dadka ee hadhsan.',
      features: ['Dukaamo iyo maqaayado', 'Unit sizes dabacsan', 'Qorshe ganacsi laba level ah', 'Parking nidaamsan', 'Arcades hadhsan', 'Solar canopies'],
      audience: 'Retail operators, maalgashadayaasha ganacsiga iyo shirkadaha doonaya meel nidaamsan oo destination la qorsheeyey ah.',
    },
  },
}

export default function DevelopmentDetail({ project }) {
  const { language } = useLanguage()
  const copy = getDevelopmentCopy(project, language)
  const extra = EXTRA[project.slug]?.[language] || EXTRA[project.slug]?.en
  const canonical = `https://www.degaanrealestate.com/development/${project.slug}`

  return (
    <>
      <Head>
        <title>{project.name} | Degaan Real Estate</title>
        <meta name="description" content={copy.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${project.name} | Degaan Real Estate`} />
        <meta property="og:description" content={copy.description} />
        <meta property="og:image" content={`https://www.degaanrealestate.com${project.image}`} />
        <meta property="og:url" content={canonical} />
      </Head>

      <header className="development-detail-hero">
        <div className="container development-detail-hero-inner">
          <div>
            <p className="upgrade-kicker">{copy.category} · {copy.location}</p>
            <h1>{project.name}</h1>
            <p className="development-detail-lead">{extra.vision}</p>
            <div className="development-actions">
              <Link href={`/contact?project=${project.slug}`} className="btn-primary" onClick={() => trackAnalyticsEvent('register_interest', { project: project.slug, placement: 'development_detail' })}>
                {language === 'so' ? 'Diiwaangeli xiisaha' : 'Register interest'}
              </Link>
              <Link href="/developments" className="btn-secondary">{language === 'so' ? 'Dhamaan mashaariicda' : 'All developments'}</Link>
            </div>
          </div>
          <dl className="development-facts">
            <div><dt>{language === 'so' ? 'Goobta' : 'Location'}</dt><dd>{copy.location}</dd></div>
            <div><dt>{language === 'so' ? 'Nooca' : 'Type'}</dt><dd>{copy.type}</dd></div>
            <div><dt>{language === 'so' ? 'Qiimaha' : 'Indicative price range'}</dt><dd>{project.priceRange}</dd></div>
            <div><dt>{language === 'so' ? 'Marxaladda' : 'Stage'}</dt><dd>{language === 'so' ? 'Concept / pre-launch' : 'Concept / pre-launch'}</dd></div>
          </dl>
        </div>
      </header>

      <div className="development-visual">
        <Image src={project.image} alt={copy.alt} fill priority sizes="100vw" />
      </div>

      <section className="development-detail-section">
        <div className="container development-detail-grid">
          <div>
            <p className="upgrade-kicker">{language === 'so' ? 'Fikradda' : 'The concept'}</p>
            <h2>{language === 'so' ? 'Qorshe ku dhisan goobta iyo sida loo noolaanayo.' : 'Planned around place, use and long-term value.'}</h2>
            <p className="section-lead">{copy.description}</p>
            <div className="concept-disclaimer">
              <strong>{language === 'so' ? 'Ogeysiis concept' : 'Concept notice'}</strong><br />
              {language === 'so'
                ? 'Magaca, sawirrada, qiimaha, specifications-ka, unit mix-ka iyo jadwalku waa hordhac waxaana laga yaabaa inay is beddelaan ka hor launch-ka ama heshiiska.'
                : 'Name, visuals, pricing, specifications, unit mix and programme are preliminary and may change before formal launch or contract.'}
            </div>
          </div>
          <div>
            <p className="upgrade-kicker">{language === 'so' ? 'Waxyaabaha la qorsheeyey' : 'Planned features'}</p>
            <div className="development-feature-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0,1fr))' }}>
              {extra.features.map((feature, index) => (
                <article className="development-feature-card" key={feature}>
                  <span>{String(index + 1).padStart(2, '0')}</span><h3>{feature}</h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="subpage-section soft">
        <div className="container subpage-split">
          <div><p className="upgrade-kicker">{language === 'so' ? 'Cidda loogu talagalay' : 'Intended audience'}</p><h2>{language === 'so' ? 'Mashruucu waa inuu ka bilaabmaa qofka isticmaali doona.' : 'A development should begin with who will use it.'}</h2></div>
          <p className="section-lead">{extra.audience}</p>
        </div>
      </section>

      <section className="home-partner">
        <div className="container">
          <div className="partner-banner">
            <div>
              <p className="upgrade-kicker">{project.name}</p>
              <h2>{language === 'so' ? 'Hel wararka availability, launch iyo reservation.' : 'Receive availability, launch and reservation updates.'}</h2>
              <p>{language === 'so' ? 'Diiwaangeli xiisahaaga si kooxda Degaan ay kula wadaagto xogta marka mashruucu u gudbo marxaladaha xiga.' : 'Register your interest so the Degaan team can share verified information as the project moves through the next stages.'}</p>
            </div>
            <Link href={`/contact?project=${project.slug}`} className="btn-secondary" onClick={() => trackAnalyticsEvent('register_interest', { project: project.slug, placement: 'development_bottom' })}>{language === 'so' ? 'Diiwaangeli' : 'Register interest'}</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export function getStaticPaths() {
  return {
    paths: developments.map((project) => ({ params: { slug: project.slug } })),
    fallback: false,
  }
}

export function getStaticProps({ params }) {
  const project = developments.find((item) => item.slug === params.slug)
  return { props: { project } }
}
