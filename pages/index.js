import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PropertyCard from '../components/PropertyCard'
import DevelopmentCard from '../components/DevelopmentCard'
import Hero from '../components/Hero'
import { useLanguage } from '../contexts/LanguageContext'
import { API_BASE_URL } from '../lib/api'
import { developments } from '../lib/developments'
import { trackAnalyticsEvent } from '../lib/analytics'

const UPGRADE_COPY = {
  en: {
    seoTitle: 'Degaan Real Estate & Construction | Design, Build & Develop in Somaliland',
    seoDescription: 'Degaan brings real estate development, construction, property advisory and investment planning together for homes, communities and commercial projects in Somaliland.',
    introKicker: 'One partner across the property journey',
    introTitle: 'From land and ideas to buildings and communities.',
    introText: 'Degaan combines real estate development, engineering-led construction and property advisory so clients can move from an early idea to a completed, usable asset with clearer decisions and coordinated delivery.',
    pillars: [
      ['01', 'Develop', 'Plan residential and commercial developments around location, demand, infrastructure and long-term value.', '/developments', 'Explore developments'],
      ['02', 'Build', 'Coordinate design, estimating, procurement, construction, quality control and handover through one accountable team.', '/construction', 'Construction capability'],
      ['03', 'Advise', 'Support buyers, landowners and investors with market intelligence, feasibility thinking and practical property guidance.', '/partner', 'Partner with Degaan'],
    ],
    capabilityKicker: 'What Degaan does',
    capabilityTitle: 'Integrated capability, not disconnected services.',
    capabilityIntro: 'The website now reflects the way Degaan intends to work: development, construction, property and investment decisions connected from the beginning.',
    capabilities: [
      ['01', 'Real Estate Development', 'Planned homes, apartment concepts and commercial destinations shaped for Somaliland.', '/developments'],
      ['02', 'Design & Construction', 'Residential and commercial delivery supported by design coordination, BOQs, programme control and site supervision.', '/construction'],
      ['03', 'Property Services', 'Property search, selling support and professional valuation pathways for owners and buyers.', '/properties'],
      ['04', 'Investment & Land Advisory', 'Feasibility-led support for landowners, developers and investors considering joint or direct development.', '/partner'],
    ],
    workKicker: 'Selected delivery experience',
    workTitle: 'Proof should come from the work.',
    workIntro: 'Selected project types from Degaan’s active delivery experience are organized as case-study records. Client-sensitive information is kept private until approved for publication.',
    works: [
      ['G+1 Residential Delivery', 'Hargeisa · Residential construction', 'Design coordination, structural works, cost planning, site execution and finishing for multi-level family housing.'],
      ['Residential Renovation & Upgrade', 'Hargeisa · Renovation', 'Coordinated renovation covering architectural upgrades, finishes, services and external works.'],
      ['Interior + Landscape Upgrade', 'Hargeisa · Home improvement', 'Interior detailing, gypsum, joinery, lighting, landscape and outdoor-living improvements delivered as one scope.'],
    ],
    qualityKicker: 'Why choose Degaan',
    qualityTitle: 'Quality is a controlled process, not a slogan.',
    qualityIntro: 'Buildings executed in accordance with internationally recognized building codes and construction standards, supported by documented planning, inspection and handover stages.',
    quality: [
      ['01', 'Approved information', 'Work is coordinated from drawings, scope, specifications and agreed project information before execution.'],
      ['02', 'Material control', 'Key materials and finishes are reviewed against the approved project requirements before installation.'],
      ['03', 'Stage inspections', 'Structural, waterproofing, MEP and finishing stages are checked before work is closed or handed over.'],
      ['04', 'Clear reporting', 'Clients receive a defined programme, cost visibility and progress communication throughout delivery.'],
    ],
    partnerKicker: 'Landowners & investors',
    partnerTitle: 'Have land or an investment idea? Start with feasibility, not assumptions.',
    partnerText: 'Degaan can help structure the opportunity, review development options, test market logic and define a practical route from land to a viable project.',
    partnerCta: 'Partner with Degaan',
  },
  so: {
    seoTitle: 'Degaan Real Estate & Construction | Naqshad, Dhisme & Horumarin Somaliland',
    seoDescription: 'Degaan waxay isku keentaa horumarinta hantida, dhismaha, la-talinta hantida iyo qorshaynta maalgashiga gudaha Somaliland.',
    introKicker: 'Hal lamaane safarka hantida oo dhan',
    introTitle: 'Dhul iyo fikrad ilaa dhisme iyo bulsho qorshaysan.',
    introText: 'Degaan waxay isku xidhaa horumarinta hantida, dhismaha injineernimada ku dhisan iyo la-talinta hantida si fikrad hore loogu beddelo hanti la dhammaystiray oo leh go’aanno cad iyo fulin isku-duwan.',
    pillars: [
      ['01', 'Horumari', 'Qorshee mashaariic degaan iyo ganacsi oo ku salaysan goobta, baahida, kaabayaasha iyo qiimaha muddada dheer.', '/developments', 'Sahamin mashaariicda'],
      ['02', 'Dhis', 'Isku xidh naqshadda, qiimaynta, iibka agabka, dhismaha, hubinta tayada iyo wareejinta.', '/construction', 'Awoodda dhismaha'],
      ['03', 'La tali', 'Taageer iibsadayaasha, mulkiilayaasha dhulka iyo maalgashadayaasha xog suuq, qiimayn iyo qorshe wax-ku-ool ah.', '/partner', 'La shaqee Degaan'],
    ],
    capabilityKicker: 'Waxa Degaan qabato',
    capabilityTitle: 'Awoodo isku xidhan, ee aan ahayn adeegyo kala go’an.',
    capabilityIntro: 'Website-ku hadda wuxuu muujinayaa habka ay Degaan u shaqaynayso: horumarin, dhisme, hanti iyo maalgashi oo isku xidhan bilowga mashruuca.',
    capabilities: [
      ['01', 'Horumarinta Hantida', 'Guryo, apartments iyo goobo ganacsi oo qorshaysan kuna habboon Somaliland.', '/developments'],
      ['02', 'Naqshad & Dhisme', 'Dhismaha guryaha iyo ganacsiga oo ay taageerayaan BOQ, jadwal, kormeer iyo isku-duwid naqshadeed.', '/construction'],
      ['03', 'Adeegyada Hantida', 'Raadinta hanti, iibinta iyo waddooyin qiimayn xirfadeed oo loogu talagalay mulkiilayaasha iyo iibsadayaasha.', '/properties'],
      ['04', 'Maalgashi & Dhul', 'Taageero feasibility ku dhisan oo loogu talagalay mulkiilayaasha dhulka, horumariyayaasha iyo maalgashadayaasha.', '/partner'],
    ],
    workKicker: 'Khibrad fulineed oo la xushay',
    workTitle: 'Shaqada lafteedu ha noqoto caddaynta.',
    workIntro: 'Noocyo mashruuc oo ka mid ah khibradda fulinta Degaan ayaa loo habeeyey case studies. Xogta gaarka ah ee macaamiisha lama daabaco ilaa oggolaansho la helo.',
    works: [
      ['Dhismaha Guri G+1', 'Hargeysa · Dhisme degaan', 'Isku-duwid naqshad, shaqooyinka structural-ka, qorshaynta kharashka, fulinta goobta iyo finishing.'],
      ['Dayactir & Casriyeyn Guri', 'Hargeysa · Renovation', 'Dayactir isku-duwan oo ka kooban casriyeyn architectural, finishes, services iyo shaqooyinka bannaanka.'],
      ['Interior + Landscaping', 'Hargeysa · Hagaajinta guriga', 'Gypsum, joinery, nalal, qurxinta gudaha, beerista iyo meelaha bannaanka oo hal scope lagu maamulo.'],
    ],
    qualityKicker: 'Maxaa Degaan loo doortaa',
    qualityTitle: 'Tayadu waa nidaam la xakameeyo, ma aha hal-ku-dheg.',
    qualityIntro: 'Dhismayaasha waxaa loo fuliyaa si waafaqsan xeerarka dhismaha iyo heerarka caalamiga ah ee la aqoonsan yahay, iyadoo la raacayo qorshayn, kormeer iyo wareejin la diiwaangeliyey.',
    quality: [
      ['01', 'Xog la ansixiyey', 'Shaqadu waxay ka bilaabataa drawings, scope, specifications iyo xogta mashruuca ee la isku raacay.'],
      ['02', 'Xakamaynta agabka', 'Agabka iyo finishing-ka muhiimka ah waxaa lagu hubiyaa shuruudaha mashruuca ka hor rakibidda.'],
      ['03', 'Kormeer marxaladeed', 'Structural, waterproofing, MEP iyo finishing waxaa la hubiyaa ka hor inta shaqada la daboolin ama la wareejin.'],
      ['04', 'Warbixin cad', 'Macmiilku wuxuu helaa jadwal, muuqaal kharash iyo warbixin horumar inta mashruucu socdo.'],
    ],
    partnerKicker: 'Mulkiilayaasha dhulka & maalgashadayaasha',
    partnerTitle: 'Dhul ama fikrad maalgashi ma haysaa? Ku bilow feasibility, ee ha ku bilaabin qiyaas.',
    partnerText: 'Degaan waxay kaa caawin kartaa qaabaynta fursadda, tijaabinta doorashooyinka development-ka, fahamka suuqa iyo dejinta waddo la fulin karo.',
    partnerCta: 'La shaqee Degaan',
  },
}

export default function Home() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const { language, t } = useLanguage()
  const c = UPGRADE_COPY[language] || UPGRADE_COPY.en

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/properties/?limit=6`)
        setProperties(response.data.results || [])
      } catch (error) {
        console.error('Failed to fetch properties:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'RealEstateAgent'],
    name: 'Degaan Real Estate & Construction',
    url: 'https://www.degaanrealestate.com',
    logo: 'https://www.degaanrealestate.com/images/degaan-logo.png',
    telephone: '+252638888250',
    email: 'info@degaanrealestate.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Burjomar',
      addressLocality: 'Hargeisa',
      addressCountry: 'Somaliland',
    },
    areaServed: 'Somaliland',
  }

  return (
    <div className="home-page">
      <Head>
        <title>{c.seoTitle}</title>
        <meta name="description" content={c.seoDescription} />
        <link rel="canonical" href="https://www.degaanrealestate.com/" />
        <meta property="og:title" content={c.seoTitle} />
        <meta property="og:description" content={c.seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.degaanrealestate.com/" />
        <meta property="og:image" content="https://www.degaanrealestate.com/images/degaan-logo.png" />
        <meta property="og:locale" content={language === 'so' ? 'so_SO' : 'en_US'} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </Head>

      <Hero />

      <section className="corporate-intro">
        <div className="container corporate-intro-grid">
          <div>
            <p className="upgrade-kicker">{c.introKicker}</p>
            <h2>{c.introTitle}</h2>
          </div>
          <div className="corporate-intro-copy">
            <p>{c.introText}</p>
            <div className="brand-pillar-grid">
              {c.pillars.map(([number, title, text, href, link]) => (
                <article className="brand-pillar" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <Link className="text-link" href={href}>{link} <span aria-hidden="true">→</span></Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="projects-showcase" id="developments">
        <div className="container">
          <div className="section-heading section-heading-split">
            <div>
              <p className="section-kicker">{t('home.portfolioKicker')}</p>
              <h2>{t('home.portfolioTitle')}</h2>
            </div>
            <p>{t('home.portfolioIntro')}</p>
          </div>
          <div className="developments-grid">
            {developments.map((project, index) => (
              <DevelopmentCard key={project.slug} project={project} index={index} language={language} priority={index < 2} />
            ))}
          </div>
          <p className="concept-note">{t('home.conceptNote')}</p>
        </div>
      </section>

      <section className="home-capabilities">
        <div className="container">
          <div className="section-heading-upgrade">
            <div><p className="upgrade-kicker">{c.capabilityKicker}</p><h2>{c.capabilityTitle}</h2></div>
            <p>{c.capabilityIntro}</p>
          </div>
          <div className="capability-grid">
            {c.capabilities.map(([number, title, text, href]) => (
              <article className="capability-card" key={number}>
                <span>{number}</span><h3>{title}</h3><p>{text}</p>
                <Link className="text-link" href={href}>{language === 'so' ? 'Wax badan' : 'Explore'} <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-work">
        <div className="container">
          <div className="section-heading-upgrade">
            <div><p className="upgrade-kicker">{c.workKicker}</p><h2>{c.workTitle}</h2></div>
            <p>{c.workIntro}</p>
          </div>
          <div className="work-grid">
            {c.works.map(([title, meta, text]) => (
              <article className="work-card" key={title}>
                <p className="work-meta">{meta}</p><h3>{title}</h3><p>{text}</p>
                <Link className="text-link" href="/projects">{language === 'so' ? 'Arag shaqooyinka' : 'View selected work'} <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-properties">
        <div className="container">
          <h2>{t('home.featured')}</h2>
          {loading ? <p>{t('home.loading')}</p> : properties.length > 0 ? (
            <div className="properties-grid">
              {properties.map((property) => <PropertyCard key={property.id} property={property} />)}
            </div>
          ) : <p>{t('home.noneAvailable')}</p>}
          <div className="text-center"><Link href="/properties" className="btn-primary">{t('home.viewAll')}</Link></div>
        </div>
      </section>

      <section className="home-quality">
        <div className="container home-quality-grid">
          <div>
            <p className="upgrade-kicker">{c.qualityKicker}</p>
            <h2>{c.qualityTitle}</h2>
            <p className="section-lead">{c.qualityIntro}</p>
            <Link href="/construction#quality" className="text-link" style={{ color: '#f0c66d' }}>{language === 'so' ? 'Arag nidaamka tayada' : 'See our quality process'} <span aria-hidden="true">→</span></Link>
          </div>
          <div className="quality-grid">
            {c.quality.map(([number, title, text]) => (
              <article className="quality-card" key={number}><strong>{number}</strong><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-partner">
        <div className="container">
          <div className="partner-banner">
            <div>
              <p className="upgrade-kicker">{c.partnerKicker}</p>
              <h2>{c.partnerTitle}</h2>
              <p>{c.partnerText}</p>
            </div>
            <Link href="/partner" className="btn-secondary" onClick={() => trackAnalyticsEvent('partner_cta', { placement: 'homepage' })}>{c.partnerCta}</Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>{t('home.ctaTitle')}</h2>
          <p>{t('home.ctaText')}</p>
          <div className="cta-buttons">
            <Link href="/contact" className="btn-primary">{t('home.schedule')}</Link>
            <a href="https://wa.me/252638888250" target="_blank" rel="noopener noreferrer" className="btn-secondary" onClick={() => trackAnalyticsEvent('whatsapp_click', { placement: 'homepage_cta' })}>{t('home.chatWhatsapp')}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
