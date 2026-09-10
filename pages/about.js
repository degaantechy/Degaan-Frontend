import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useLanguage } from '../contexts/LanguageContext'

const copy = {
  en: {
    seoTitle: 'About Degaan | Real Estate & Construction in Somaliland',
    seoDescription: 'Meet Degaan Real Estate & Construction: a Somaliland company creating considered developments, dependable buildings and lasting property value.',
    kicker: 'About Degaan',
    heroTitle: 'Built around trust. Designed for lasting value.',
    heroText: 'We bring development, construction and property expertise together to create places that serve families, businesses and investors across Somaliland.',
    explore: 'Explore our developments',
    talk: 'Talk to our team',
    storyKicker: 'Who we are',
    storyTitle: 'A local company with a long-term view',
    storyLead: 'Degaan Real Estate & Construction exists to make property decisions clearer and the development process more dependable.',
    storyBody: 'From the first conversation to handover and ongoing care, we connect practical design, disciplined delivery and honest communication. We understand the realities of building in Somaliland—land, climate, infrastructure and family needs—and turn them into well-planned solutions.',
    promise: 'Our promise is simple: clarity before commitment, care during construction and value that continues after handover.',
    focusKicker: 'What we do',
    focusTitle: 'One partner across the property journey',
    focusIntro: 'Our work brings together the capabilities a successful property needs, from an early idea to a place that performs in everyday life.',
    services: [
      ['01', 'Real estate development', 'Planned homes, apartments and commercial concepts shaped by location, infrastructure, demand and long-term use.'],
      ['02', 'Design & construction', 'Thoughtful design, transparent estimating, coordinated construction and careful quality control from foundation to finish.'],
      ['03', 'Property & investment advisory', 'Practical guidance for buyers, landowners and investors, grounded in local knowledge and clear due diligence.'],
    ],
    processKicker: 'The Degaan way',
    processTitle: 'A clear path from idea to handover',
    steps: [
      ['Listen & verify', 'We understand the brief, site, priorities and budget, then verify the facts that will shape the project.'],
      ['Plan & price', 'We define the design, scope, programme and estimate so important decisions are visible before work begins.'],
      ['Build & report', 'Our team coordinates delivery, monitors quality and communicates progress with clear project reporting.'],
      ['Handover & support', 'We complete, document and hand over the property, with continued support for ownership and management.'],
    ],
    imageAlt: 'Degaan architects and engineers reviewing plans on a construction site',
    valuesKicker: 'What guides us',
    valuesTitle: 'Principles that stay with every project',
    values: [
      ['Trust', 'Clear information, responsible commitments and respect for every client.'],
      ['Quality', 'Good design, suitable materials and careful attention to how each detail performs.'],
      ['Local intelligence', 'Solutions informed by Somaliland’s climate, cities, communities and ways of living.'],
      ['Lasting value', 'Decisions made for durability, usefulness and strong long-term ownership.'],
    ],
    closingKicker: 'Build with confidence',
    closingTitle: 'Let us turn your next property idea into a clear plan.',
    closingText: 'Whether you are planning a home, exploring an investment or developing land, our team is ready to listen.',
    estimate: 'Estimate your project',
    contact: 'Contact Degaan',
  },
  so: {
    seoTitle: 'Nagu Saabsan | Degaan Real Estate & Construction',
    seoDescription: 'Baro Degaan Real Estate & Construction—shirkad Somaliland ka dhista mashaariic qorshaysan, dhismayaal lagu kalsoonaan karo iyo qiime waara.',
    kicker: 'Nagu Saabsan',
    heroTitle: 'Kalsooni lagu dhisay. Qiime waara loo qaabeeyey.',
    heroText: 'Waxaan isku xidhnaa horumarinta, dhismaha iyo khibradda hantida si aan u abuurno goobo u adeegaya qoysaska, ganacsiyada iyo maalgashadayaasha Somaliland.',
    explore: 'Sahamin mashaariicdayada',
    talk: 'La hadal kooxdayada',
    storyKicker: 'Cidda aan nahay',
    storyTitle: 'Shirkad maxalli ah oo leh aragti fog',
    storyLead: 'Degaan Real Estate & Construction waxaa loo aasaasay in go’aannada hantidu noqdaan kuwo cad, habka horumarintuna noqdo mid lagu kalsoonaan karo.',
    storyBody: 'Laga bilaabo wada-hadalkii ugu horreeyey ilaa wareejinta iyo daryeelka dambe, waxaan isku darnaa naqshad wax-ku-ool ah, fulin nidaamsan iyo xidhiidh daacad ah. Waxaan fahamsanahay xaaladaha dhismaha Somaliland—dhulka, cimilada, kaabayaasha iyo baahida qoysaska—waxaanan u beddelnaa xalal si fiican loo qorsheeyey.',
    promise: 'Ballanqaadkayagu waa mid fudud: caddayn ka hor heshiiska, daryeel inta dhismuhu socdo iyo qiime sii jira ka dib wareejinta.',
    focusKicker: 'Waxa aan qabanno',
    focusTitle: 'Hal lamaane, safarka hantida oo dhan',
    focusIntro: 'Shaqadayadu waxay isku keentaa awoodaha ay hanti guulaysata u baahan tahay, laga bilaabo fikraddii hore ilaa goob nolol maalmeedka si fiican ugu shaqaysa.',
    services: [
      ['01', 'Horumarinta hantida', 'Guryo, dabaqyo iyo goobo ganacsi oo qorshaysan, laguna saleeyey goobta, kaabayaasha, baahida iyo isticmaalka muddada dheer.'],
      ['02', 'Naqshad & dhisme', 'Naqshad feker leh, qiimayn cad, dhisme isku-duwan iyo hubin tayo oo ka bilaabma aasaaska ilaa dhamaystirka.'],
      ['03', 'La-talinta hanti & maalgashi', 'Hagitaan wax-ku-ool ah oo loogu talagalay iibsadayaasha, mulkiilayaasha dhulka iyo maalgashadayaasha, kuna salaysan aqoon maxalli ah iyo hubin cad.'],
    ],
    processKicker: 'Habka Degaan',
    processTitle: 'Waddo cad oo fikradda ka gaadhsiisa wareejinta',
    steps: [
      ['Dhegaysi & hubin', 'Waxaan fahannaa baahida, goobta, mudnaanta iyo miisaaniyadda, dabadeedna xaqiijinnaa xogta mashruuca hagaysa.'],
      ['Qorshe & qiimayn', 'Waxaan qeexnaa naqshadda, baaxadda shaqada, jadwalka iyo qiyaasta si go’aannadu u caddaadaan ka hor bilowga.'],
      ['Dhisme & warbixin', 'Kooxdayadu waxay isku dubbariddaa fulinta, ilaalisaa tayada, waxayna si cad uga warbixisaa horumarka.'],
      ['Wareejin & taageero', 'Waxaan dhamaystirnaa, diiwaangelinnaa oo wareejinnaa hantida, annagoo sii wadna taageerada maamulka iyo lahaanshaha.'],
    ],
    imageAlt: 'Naqshadeeyayaasha iyo injineerrada Degaan oo qorshe ku eegaya goob dhisme',
    valuesKicker: 'Waxa na haga',
    valuesTitle: 'Mabaadi’ la socda mashruuc kasta',
    values: [
      ['Kalsooni', 'Xog cad, ballanqaad masuuliyad leh iyo ixtiraam macmiil kasta.'],
      ['Tayo', 'Naqshad wanaagsan, agab ku habboon iyo taxaddar lagu bixiyo faahfaahin kasta.'],
      ['Aqoon maxalli ah', 'Xalal ku salaysan cimilada, magaalooyinka, bulshada iyo hab-nololeedka Somaliland.'],
      ['Qiime waara', 'Go’aanno loo qaato adkaysi, faa’iido iyo lahaansho muddo dheer ah.'],
    ],
    closingKicker: 'Si kalsooni leh u dhis',
    closingTitle: 'Aan fikraddaada hantida u beddelno qorshe cad.',
    closingText: 'Haddii aad qorshaynayso guri, sahaminayso maalgashi ama horumarinayso dhul, kooxdayadu diyaar bay u tahay inay ku dhegaysato.',
    estimate: 'Qiyaas mashruucaaga',
    contact: 'La xidhiidh Degaan',
  },
}

export default function About() {
  const { language } = useLanguage()
  const c = copy[language] || copy.en

  return (
    <>
      <Head>
        <title>{c.seoTitle}</title>
        <meta name="description" content={c.seoDescription} />
        <link rel="canonical" href="https://www.degaanrealestate.com/about" />
      </Head>

      <section className="about-hero">
        <Image src="/images/about/degaan-community-hero.webp" alt="" fill priority sizes="100vw" className="about-hero-image" />
        <div className="about-hero-shade" />
        <div className="container about-hero-content">
          <p className="about-kicker about-reveal">{c.kicker}</p>
          <h1 className="about-reveal about-delay-1">{c.heroTitle}</h1>
          <p className="about-hero-copy about-reveal about-delay-2">{c.heroText}</p>
          <div className="about-actions about-reveal about-delay-3">
            <Link href="/developments" className="about-button about-button-gold">{c.explore}</Link>
            <Link href="/contact" className="about-button about-button-ghost">{c.talk}</Link>
          </div>
        </div>
        <span className="about-scroll-mark" aria-hidden="true" />
      </section>

      <section className="about-story">
        <div className="container about-story-grid">
          <div className="about-story-copy">
            <p className="about-kicker">{c.storyKicker}</p>
            <h2>{c.storyTitle}</h2>
            <p className="about-lead">{c.storyLead}</p>
            <p>{c.storyBody}</p>
            <blockquote>{c.promise}</blockquote>
          </div>
          <div className="about-story-visual">
            <Image src="/images/about/degaan-team-site.webp" alt={c.imageAlt} fill sizes="(max-width: 800px) 100vw, 48vw" />
            <div className="about-image-badge"><span>Degaan</span><small>Real Estate &amp; Construction</small></div>
          </div>
        </div>
      </section>

      <section className="about-focus">
        <div className="container">
          <div className="about-section-heading">
            <p className="about-kicker">{c.focusKicker}</p>
            <h2>{c.focusTitle}</h2>
            <p>{c.focusIntro}</p>
          </div>
          <div className="about-service-grid">
            {c.services.map(([number, title, text]) => (
              <article className="about-service-card" key={number}>
                <span>{number}</span><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-process">
        <div className="container">
          <div className="about-section-heading about-section-heading-light">
            <p className="about-kicker">{c.processKicker}</p><h2>{c.processTitle}</h2>
          </div>
          <div className="about-process-grid">
            {c.steps.map(([title, text], index) => (
              <article className="about-process-step" key={title}>
                <span>0{index + 1}</span><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container about-values-grid">
          <div className="about-values-title"><p className="about-kicker">{c.valuesKicker}</p><h2>{c.valuesTitle}</h2></div>
          <div className="about-values-list">
            {c.values.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="about-closing">
        <div className="container about-closing-inner">
          <div><p className="about-kicker">{c.closingKicker}</p><h2>{c.closingTitle}</h2><p>{c.closingText}</p></div>
          <div className="about-actions">
            <Link href="/construction-estimator" className="about-button about-button-gold">{c.estimate}</Link>
            <Link href="/contact" className="about-button about-button-light">{c.contact}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
