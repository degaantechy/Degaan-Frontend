import Head from 'next/head'
import Link from 'next/link'

import DevelopmentCard from '../components/DevelopmentCard'
import Hero from '../components/Hero'
import { useLanguage } from '../contexts/LanguageContext'
import { developments } from '../lib/developments'

const COPY = {
  en: {
    seoTitle: 'Degaan Real Estate & Construction | Design, Build & Develop in Somaliland',
    seoDescription: 'Degaan connects real estate development, construction, property and investment planning for homes, communities and commercial projects in Somaliland.',
    introKicker: 'One team. One direction.',
    introTitle: 'Design. Build. Develop.',
    introText: 'From the first idea to the finished place, Degaan keeps design, cost, construction and development decisions connected.',
    pillars: [
      {
        number: '01',
        title: 'Places people want to live in.',
        text: 'Residential communities, apartments and commercial destinations planned around context, demand and long-term value.',
        href: '/developments',
        link: 'Explore developments',
      },
      {
        number: '02',
        title: 'Designed with purpose. Built with discipline.',
        text: 'Architecture, BOQs, procurement, site execution and quality control coordinated through one accountable team.',
        href: '/construction',
        link: 'See construction',
      },
      {
        number: '03',
        title: 'Your land. More potential.',
        text: 'Feasibility, development strategy and investment planning for landowners, developers and investors.',
        href: '/partner',
        link: 'Explore partnerships',
      },
    ],
    portfolioKicker: 'Development pipeline',
    portfolioTitle: 'What’s next.',
    portfolioIntro: 'A focused portfolio of residential and commercial concepts for Hargeisa, Berbera and Somaliland’s growth corridors.',
    conceptNote: 'Concept imagery is shown for design communication. Final specifications, availability, pricing and delivery dates are confirmed project by project.',
    qualityKicker: 'Quality assured',
    qualityTitle: 'Quality, built in.',
    qualityIntro: 'Buildings executed in accordance with internationally recognized building codes and construction standards, with quality control built into each stage of delivery.',
    quality: [
      ['Plan clearly', 'Approved drawings, scope and specifications guide execution before work begins.'],
      ['Inspect early', 'Structural, waterproofing, MEP and finishing stages are checked before they are closed up.'],
      ['Control changes', 'Programme, cost and variations stay visible so decisions remain deliberate.'],
      ['Hand over properly', 'Snagging and agreed completion records are closed before final handover.'],
    ],
    partnerKicker: 'Start with the opportunity',
    partnerTitle: 'Have a site. Or an idea. Start there.',
    partnerText: 'Degaan can assess the opportunity, test development options and define a practical route from land to a viable project.',
    partnerCta: 'Talk to Degaan',
  },
  so: {
    seoTitle: 'Degaan Real Estate & Construction | Naqshad, Dhisme & Horumarin Somaliland',
    seoDescription: 'Degaan waxay isku xidhaa horumarinta hantida, dhismaha, adeegyada hantida iyo qorshaynta maalgashiga gudaha Somaliland.',
    introKicker: 'Hal koox. Hal jihayn.',
    introTitle: 'Naqshadee. Dhis. Horumari.',
    introText: 'Fikradda ugu horreysa ilaa meesha la dhammeeyey, Degaan waxay isku xidhaa naqshadda, kharashka, dhismaha iyo go’aannada horumarinta.',
    pillars: [
      {
        number: '01',
        title: 'Meelo dadku rabaan inay ku noolaadaan.',
        text: 'Bulshooyin degaan, apartments iyo goobo ganacsi oo lagu qorsheeyo goobta, baahida iyo qiimaha muddada dheer.',
        href: '/developments',
        link: 'Sahamin mashaariicda',
      },
      {
        number: '02',
        title: 'Ujeeddo leh loo naqshadeeyey. Nidaam leh loo dhisay.',
        text: 'Architecture, BOQ, procurement, fulinta goobta iyo hubinta tayada oo hal koox masuul ahi isku dubbariddo.',
        href: '/construction',
        link: 'Arag adeegyada dhismaha',
      },
      {
        number: '03',
        title: 'Dhulkaaga. Fursad ka badan.',
        text: 'Feasibility, qorshaha development-ka iyo maalgashiga ee mulkiilayaasha dhulka, developers iyo investors.',
        href: '/partner',
        link: 'Arag iskaashiga',
      },
    ],
    portfolioKicker: 'Mashaariicda soo socda',
    portfolioTitle: 'Waxa xiga.',
    portfolioIntro: 'Mashaariic degaan iyo ganacsi oo si taxaddar leh loogu qorsheeyey Hargeysa, Berbera iyo meelaha kobaca Somaliland.',
    conceptNote: 'Sawirrada concept-ka waxaa loo adeegsadaa muujinta naqshadda. Specifications, availability, qiimaha iyo taariikhaha kama dambaysta ah mashruuc kasta si gaar ah ayaa loo xaqiijiyaa.',
    qualityKicker: 'Tayo la hubiyey',
    qualityTitle: 'Tayo ku dhex jirta shaqada.',
    qualityIntro: 'Dhismayaasha waxaa loo fuliyaa si waafaqsan xeerarka dhismaha iyo heerarka caalamiga ah ee la aqoonsan yahay, iyadoo tayada lagu hubiyo marxalad kasta.',
    quality: [
      ['Qorshee si cad', 'Drawings, scope iyo specifications la ansixiyey ayaa hagaya shaqada ka hor fulinta.'],
      ['Kormeer goor hore', 'Structural, waterproofing, MEP iyo finishing waa la hubiyaa ka hor inta aan la daboolin.'],
      ['Xakamee isbeddelka', 'Jadwalka, kharashka iyo variations-ku way muuqdaan si go’aannadu u ahaadaan kuwo la qorsheeyey.'],
      ['Si nidaamsan u wareeji', 'Snagging iyo xogta completion-ka lagu heshiiyey ayaa la xidhaa ka hor handover-ka.'],
    ],
    partnerKicker: 'Ka bilow fursadda',
    partnerTitle: 'Dhul ama fikrad ma haysaa? Halkaas ka bilow.',
    partnerText: 'Degaan waxay qiimayn kartaa fursadda, tijaabin kartaa doorashooyinka development-ka, waxayna dejin kartaa waddo la fulin karo oo dhulka looga dhigo mashruuc shaqaynaya.',
    partnerCta: 'La hadal Degaan',
  },
}

export default function Home() {
  const { language } = useLanguage()
  const c = COPY[language] || COPY.en

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
              {c.pillars.map((pillar) => (
                <article className="brand-pillar" key={pillar.number}>
                  <span>{pillar.number}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                  <Link className="text-link" href={pillar.href}>
                    {pillar.link} <span aria-hidden="true">›</span>
                  </Link>
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
              <p className="section-kicker">{c.portfolioKicker}</p>
              <h2>{c.portfolioTitle}</h2>
            </div>
            <p>{c.portfolioIntro}</p>
          </div>

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

          <p className="concept-note">{c.conceptNote}</p>
        </div>
      </section>

      <section className="home-quality">
        <div className="container">
          <div className="section-heading-upgrade">
            <div>
              <p className="upgrade-kicker">{c.qualityKicker}</p>
              <h2>{c.qualityTitle}</h2>
            </div>
            <p className="section-lead">{c.qualityIntro}</p>
          </div>

          <div className="quality-grid">
            {c.quality.map(([title, text]) => (
              <article className="quality-card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link className="btn-secondary" href="/construction#quality">
              {language === 'so' ? 'Arag nidaamka tayada' : 'See our quality process'}
            </Link>
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
            <Link className="btn-primary" href="/partner">
              {c.partnerCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
