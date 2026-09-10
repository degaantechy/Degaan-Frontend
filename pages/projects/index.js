import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useLanguage } from '../../contexts/LanguageContext'

const COPY = {
  en: {
    seoTitle: 'Selected Projects | Degaan Real Estate & Construction',
    seoDescription: 'Selected residential construction, renovation, interior and external works experience from Degaan in Somaliland.',
    kicker: 'Selected work',
    title: 'The work behind the promises.',
    intro: 'This project library separates completed and active delivery experience from Degaan’s future development concepts. Client names, addresses and commercial information are only published when appropriate.',
    cases: [
      {
        type: 'Residential construction',
        title: 'G+1 Family Residence',
        location: 'Hargeisa, Somaliland',
        status: 'Selected delivery experience',
        summary: 'Coordinated residential delivery covering design information, structural construction, procurement planning, building services and high-standard finishing.',
        scope: ['Site coordination', 'RCC structural works', 'Architectural finishes', 'MEP coordination', 'External works', 'Handover planning'],
      },
      {
        type: 'Residential construction',
        title: 'Adjacent Bungalow Residences',
        location: 'Hargeisa, Somaliland',
        status: 'Residential delivery',
        summary: 'Two neighboring family homes coordinated as one construction programme, with separate internal requirements and shared delivery controls.',
        scope: ['Bungalow construction', 'Boundary works', 'Hidden sheet-roof system', 'Kitchens & bathrooms', 'Services coordination', 'Programme control'],
      },
      {
        type: 'Renovation & home upgrade',
        title: 'Integrated Home Renovation',
        location: 'Hargeisa, Somaliland',
        status: 'Renovation experience',
        summary: 'Multi-scope home improvement integrating interior finishes, ceiling work, joinery, façade changes, landscaping and outdoor-living improvements.',
        scope: ['Interior renovation', 'Gypsum ceilings', 'Joinery & TV walls', 'Lighting coordination', 'Landscape works', 'Pergola / shade works'],
      },
    ],
    noteTitle: 'Documentation standard',
    noteText: 'As the portfolio grows, each published case study will be expanded with approved site photography, drawings, scope, programme, measurable project facts and completion information. Concept renders will remain clearly labelled as concepts and will not be presented as completed buildings.',
    processTitle: 'Need a similar project?',
    processText: 'Share your site, building type and requirements. Degaan can define the next steps from feasibility and design through pricing and construction.',
    cta: 'Discuss your project',
  },
  so: {
    seoTitle: 'Shaqooyinka La Xushay | Degaan Real Estate & Construction',
    seoDescription: 'Khibrad la xushay oo ku saabsan dhismaha guryaha, renovation, interior iyo shaqooyinka bannaanka ee Degaan.',
    kicker: 'Shaqooyin la xushay',
    title: 'Shaqada ka dambaysa ballanqaadka.',
    intro: 'Boggan wuxuu kala saarayaa khibradda dhabta ah ee fulinta iyo fikradaha development-ka mustaqbalka. Magacyada macaamiisha, cinwaanada iyo xogta ganacsi waxaa la daabacaa marka ay habboon tahay oo keliya.',
    cases: [
      {
        type: 'Dhismaha guryaha',
        title: 'Guri Qoys G+1',
        location: 'Hargeysa, Somaliland',
        status: 'Khibrad fulineed',
        summary: 'Dhismaha guri oo isku xidha design information, structural construction, procurement planning, building services iyo finishing tayo sare leh.',
        scope: ['Site coordination', 'RCC structural works', 'Architectural finishes', 'MEP coordination', 'Shaqada bannaanka', 'Handover planning'],
      },
      {
        type: 'Dhismaha guryaha',
        title: 'Laba Guri Bungalow oo Isku Dhow',
        location: 'Hargeysa, Somaliland',
        status: 'Residential delivery',
        summary: 'Laba guri qoys oo deris ah oo hal programme lagu maamulo, iyadoo guri kastaa leeyahay baahidiisa gudaha.',
        scope: ['Bungalow construction', 'Dayrarka', 'Saqaf jiingad qaris ah', 'Jikooyin & musqulo', 'Services coordination', 'Programme control'],
      },
      {
        type: 'Renovation & home upgrade',
        title: 'Casriyeyn Guri oo Isku Dhan',
        location: 'Hargeysa, Somaliland',
        status: 'Khibrad renovation',
        summary: 'Hagaajin guri oo isku keenta interior finishes, ceiling, joinery, façade changes, landscaping iyo outdoor-living.',
        scope: ['Interior renovation', 'Gypsum ceilings', 'Joinery & TV walls', 'Lighting coordination', 'Landscape works', 'Pergola / shade works'],
      },
    ],
    noteTitle: 'Heerka dokumentiyada',
    noteText: 'Marka portfolio-gu kordho, case study kasta waxaa lagu dari doonaa sawirro goobta ah oo la ansixiyey, drawings, scope, jadwal, xog la cabbiri karo iyo completion information. Concept renders si cad ayaa loogu calaamadin doonaa fikrad mana loo soo bandhigi doono dhisme la dhammeeyey.',
    processTitle: 'Mashruuc la mid ah ma qorshaynaysaa?',
    processText: 'Nala wadaag goobta, nooca dhismaha iyo baahidaada. Degaan waxay dejin kartaa tallaabooyinka feasibility iyo design ilaa pricing iyo construction.',
    cta: 'Kala hadal mashruucaaga',
  },
}

export default function ProjectsIndex() {
  const { language } = useLanguage()
  const c = COPY[language] || COPY.en

  return (
    <>
      <Head>
        <title>{c.seoTitle}</title>
        <meta name="description" content={c.seoDescription} />
        <link rel="canonical" href="https://www.degaanrealestate.com/projects" />
      </Head>

      <header className="subpage-hero">
        <div className="container">
          <p className="upgrade-kicker">{c.kicker}</p>
          <h1>{c.title}</h1>
          <p>{c.intro}</p>
        </div>
      </header>

      <section className="subpage-section">
        <div className="container subpage-split">
          <div>
            <p className="upgrade-kicker">{language === 'so' ? 'Goobta & fulinta' : 'Site & delivery'}</p>
            <h2>{language === 'so' ? 'Maamulka goobta waa qayb ka mid ah tayada.' : 'Site control is part of quality.'}</h2>
            <p className="section-lead">{language === 'so' ? 'Mashruuc wanaagsan wuxuu u baahan yahay drawing sax ah, agab, kormeer, jadwal iyo go’aanno si joogto ah loo maamulo.' : 'Good delivery depends on coordinated drawings, materials, supervision, programme control and decisions being managed throughout construction.'}</p>
          </div>
          <Image src="/images/about/degaan-team-site.webp" alt={language === 'so' ? 'Kooxda Degaan ee goob dhisme' : 'Degaan team coordinating work on a construction site'} width={1200} height={900} style={{ width: '100%', height: 'auto' }} />
        </div>
      </section>

      <section className="subpage-section soft">
        <div className="container">
          <div className="work-grid">
            {c.cases.map((item) => (
              <article className="work-card" key={item.title}>
                <p className="work-meta">{item.type} · {item.location}</p>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="proof-note"><strong>{item.status}</strong></div>
                <ul>{item.scope.map((scope) => <li key={scope}>{scope}</li>)}</ul>
              </article>
            ))}
          </div>
          <div className="proof-note" style={{ marginTop: '2rem' }}><strong>{c.noteTitle}</strong><br />{c.noteText}</div>
        </div>
      </section>

      <section className="home-partner">
        <div className="container">
          <div className="partner-banner">
            <div><h2>{c.processTitle}</h2><p>{c.processText}</p></div>
            <Link href="/contact?service=construction" className="btn-secondary">{c.cta}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
