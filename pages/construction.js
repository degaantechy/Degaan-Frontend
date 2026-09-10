import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useLanguage } from '../contexts/LanguageContext'
import { trackAnalyticsEvent } from '../lib/analytics'

const COPY = {
  en: {
    seoTitle: 'Construction Services in Somaliland | Degaan Real Estate & Construction',
    seoDescription: 'Residential and commercial construction, design coordination, BOQs, project management, renovation and quality control by Degaan in Somaliland.',
    kicker: 'Design & construction',
    title: 'Build with one accountable team from brief to handover.',
    intro: 'Degaan coordinates design, cost planning, procurement, construction and quality control so the project is managed as one system—not as disconnected trades.',
    estimate: 'Estimate your project',
    contact: 'Talk to construction team',
    servicesKicker: 'Full project capability',
    servicesTitle: 'The services required to move from an idea to a completed building.',
    servicesIntro: 'Scope is defined project by project. Degaan can provide an integrated package or selected services depending on the client and contract structure.',
    services: [
      ['Residential Construction', 'Bungalows, G+1 family homes and multi-unit residential construction.'],
      ['Commercial Construction', 'Retail, office and other commercial building delivery.'],
      ['Architectural Design', 'Concept development, space planning, façade coordination and construction information.'],
      ['Structural Coordination', 'RCC and masonry systems coordinated with project drawings and site execution.'],
      ['BOQ & Cost Planning', 'Measured quantities, preliminary budgets, scope definition and cost visibility before commitment.'],
      ['Project Management', 'Programme, procurement, site coordination, reporting and decision tracking.'],
      ['MEP Coordination', 'Plumbing and electrical works coordinated with architectural and structural requirements.'],
      ['Renovation & Upgrades', 'Building repair, reconfiguration, finishes, ceilings, façades, waterproofing and services upgrades.'],
      ['Interior Fit-Out', 'Gypsum, joinery, lighting, finishes and coordinated interior execution.'],
      ['Landscape & External Works', 'Paving, planting, pergolas, parking shades, boundary upgrades and outdoor spaces.'],
    ],
    processKicker: 'The Degaan construction process',
    processTitle: 'Decisions become more expensive after construction starts. We define them early.',
    steps: [
      ['01', 'Brief & site review', 'Understand the site, client requirements, budget, programme and constraints before fixing the project scope.'],
      ['02', 'Design, BOQ & contract', 'Coordinate drawings, specifications, quantities, price structure, programme and responsibilities before mobilisation.'],
      ['03', 'Build, inspect & report', 'Execute in controlled stages with site supervision, material coordination, progress checks and client reporting.'],
      ['04', 'Snag, document & hand over', 'Close defects, test relevant systems, confirm completion information and hand over the project in an organized way.'],
    ],
    qualityKicker: 'Quality assurance & control',
    qualityTitle: 'Buildings executed in accordance with internationally recognized building codes and construction standards.',
    qualityIntro: 'The exact code basis and technical specifications are confirmed for each project. Quality control is then built into the sequence of work rather than checked only at the end.',
    quality: [
      ['01', 'Drawing & scope control', 'Current approved information is identified before each work package is executed.'],
      ['02', 'Reinforcement & concrete checks', 'Structural works are inspected against the approved structural information before and during casting.'],
      ['03', 'Waterproofing & concealed works', 'Critical work is checked before it is covered by subsequent finishes.'],
      ['04', 'MEP testing & coordination', 'Plumbing and electrical installations are checked at appropriate stages before close-up and handover.'],
      ['05', 'Material approvals', 'Specified materials and key finishes are reviewed before use on the project.'],
      ['06', 'Finishing inspections', 'Alignment, workmanship and visible defects are reviewed progressively, not only at completion.'],
      ['07', 'Snagging', 'Outstanding defects and completion items are recorded, assigned and closed before final handover.'],
      ['08', 'Handover record', 'Completion information and agreed handover documentation are assembled for the client.'],
    ],
    controlsKicker: 'Project controls',
    controlsTitle: 'Cost, programme and communication remain visible.',
    controls: [
      ['BOQ transparency', 'Defined quantities and scope make changes easier to understand and control.'],
      ['Progress reporting', 'Structured reporting keeps decisions, constraints and completed work visible.'],
      ['Variation control', 'Additional or changed work should be documented before it becomes an uncontrolled cost.'],
      ['Health & safety', 'Site planning includes practical controls for people, access, housekeeping and higher-risk activities.'],
    ],
    calculatorTitle: 'Planning a project? Start with a preliminary cost model.',
    calculatorText: 'Use the Degaan estimator to describe your plot, structure, floor area, external works and major services. The output is indicative and becomes the starting point for a proper design and BOQ review.',
    calculatorCta: 'Open construction estimator',
  },
  so: {
    seoTitle: 'Adeegyada Dhismaha Somaliland | Degaan Real Estate & Construction',
    seoDescription: 'Dhismaha guryaha iyo ganacsiga, naqshad, BOQ, maamulka mashruuca, renovation iyo hubinta tayada ee Degaan.',
    kicker: 'Naqshad & dhisme',
    title: 'Hal koox oo masuul ka ah mashruuca laga bilaabo baahida ilaa wareejinta.',
    intro: 'Degaan waxay isku dubbariddaa naqshadda, qorshaynta kharashka, soo-iibinta, dhismaha iyo hubinta tayada si mashruucu u noqdo hal nidaam oo isku xidhan.',
    estimate: 'Qiyaas mashruucaaga',
    contact: 'La hadal kooxda dhismaha',
    servicesKicker: 'Awood mashruuc oo dhamaystiran',
    servicesTitle: 'Adeegyada fikradda looga gaadhsiiyo dhisme la dhammaystiray.',
    servicesIntro: 'Scope-ka mashruuc kasta si gaar ah ayaa loo qeexaa. Degaan waxay bixin kartaa package dhamaystiran ama adeegyo la xushay.',
    services: [
      ['Dhismaha Guryaha', 'Bungalows, guryo G+1 ah iyo dhismayaal degaan oo qaybo badan leh.'],
      ['Dhismaha Ganacsiga', 'Dukaamo, xafiisyo iyo dhismayaal ganacsi.'],
      ['Naqshadda Architectural', 'Concept, space planning, façade iyo xogta lagu dhisayo.'],
      ['Structural Coordination', 'RCC iyo masonry oo lagu waafajiyo drawings-ka iyo fulinta goobta.'],
      ['BOQ & Qorshaynta Kharashka', 'Cabbirro, miisaaniyad hordhac ah, qeexidda scope-ka iyo kharash muuqda ka hor heshiiska.'],
      ['Maamulka Mashruuca', 'Jadwal, procurement, isku-duwid goobta, warbixin iyo la socodka go’aannada.'],
      ['MEP Coordination', 'Plumbing iyo electrical oo la waafajiyo architectural iyo structural.'],
      ['Renovation & Casriyeyn', 'Dayactir, beddel layout, finishes, ceiling, façade, waterproofing iyo adeegyada.'],
      ['Interior Fit-Out', 'Gypsum, joinery, nalal, finishes iyo fulinta gudaha.'],
      ['Landscape & Shaqada Bannaanka', 'Paving, dhir, pergolas, parking shades, dayr iyo meelaha bannaanka.'],
    ],
    processKicker: 'Habka dhismaha Degaan',
    processTitle: 'Go’aannadu way qaali noqdaan marka dhismuhu bilaabmo. Waxaan qeexnaa goor hore.',
    steps: [
      ['01', 'Baahi & hubinta goobta', 'Faham goobta, baahida macmiilka, miisaaniyadda, jadwalka iyo xaddidaadaha.'],
      ['02', 'Naqshad, BOQ & heshiis', 'Isku xidh drawings, specifications, quantities, qiime, jadwal iyo masuuliyadaha ka hor mobilisation.'],
      ['03', 'Dhis, kormeer & warbixin', 'Shaqada u fuliso marxalado la xakameeyo iyadoo la raacayo kormeer, agab iyo warbixin horumar.'],
      ['04', 'Snag, diiwaangelin & wareejin', 'Xidh khaladaadka, tijaabi nidaamyada khuseeya oo mashruuca si nidaamsan u wareeji.'],
    ],
    qualityKicker: 'Hubinta & xakamaynta tayada',
    qualityTitle: 'Dhismayaasha waxaa loo fuliyaa si waafaqsan xeerarka dhismaha iyo heerarka caalamiga ah ee la aqoonsan yahay.',
    qualityIntro: 'Code-ka iyo technical specifications-ka saxda ah mashruuc kasta ayaa la xaqiijiyaa. Tayadana waxaa lagu dhex daraa marxalad kasta oo shaqada ah.',
    quality: [
      ['01', 'Drawings & scope', 'Xogta la ansixiyey ayaa la hubiyaa ka hor work package kasta.'],
      ['02', 'Bir & shub', 'Structural works waxaa lagu hubiyaa drawings-ka ka hor iyo inta shubku socdo.'],
      ['03', 'Waterproofing & concealed works', 'Shaqada muhiimka ah waa la hubiyaa ka hor inta aan la daboolin.'],
      ['04', 'MEP testing', 'Plumbing iyo electrical waxaa la hubiyaa marxaladaha ku habboon.'],
      ['05', 'Agab la ansixiyey', 'Agabka iyo finishes-ka muhiimka ah waa la hubiyaa ka hor isticmaalka.'],
      ['06', 'Finishing inspection', 'Workmanship iyo khaladaadka muuqda si joogto ah ayaa loo hubiyaa.'],
      ['07', 'Snagging', 'Waxyaabaha dhiman waa la diiwaangeliyaa lana xidhaa ka hor wareejinta.'],
      ['08', 'Handover record', 'Xogta dhammaystirka iyo dokumentiyada lagu heshiiyey ayaa loo diyaariyaa macmiilka.'],
    ],
    controlsKicker: 'Xakamaynta mashruuca',
    controlsTitle: 'Kharashka, jadwalka iyo xidhiidhku waa inay muuqdaan.',
    controls: [
      ['BOQ cad', 'Quantities iyo scope la qeexay waxay sahlaan in isbeddelka la fahmo lana xakameeyo.'],
      ['Warbixin horumar', 'Warbixin nidaamsan waxay muujisaa go’aannada, caqabadaha iyo shaqada la qabtay.'],
      ['Variation control', 'Shaqo dheeraad ah ama isbeddel waa in la diiwaangeliyaa ka hor inta uusan noqon kharash aan la xakamayn.'],
      ['Badbaadada goobta', 'Qorshaynta goobtu waxay dabooshaa dadka, gelitaanka, nadaafadda iyo shaqooyinka khatarta badan.'],
    ],
    calculatorTitle: 'Mashruuc ma qorshaynaysaa? Ka bilow qiyaas hordhac ah.',
    calculatorText: 'Isticmaal estimator-ka Degaan si aad u geliso dhulka, structure-ka, floor area, shaqada bannaanka iyo adeegyada waaweyn. Natiijadu waa hordhac oo waxay bilow u tahay design iyo BOQ sax ah.',
    calculatorCta: 'Fur xisaabiyaha dhismaha',
  },
}

export default function Construction() {
  const { language } = useLanguage()
  const c = COPY[language] || COPY.en

  return (
    <>
      <Head>
        <title>{c.seoTitle}</title>
        <meta name="description" content={c.seoDescription} />
        <link rel="canonical" href="https://www.degaanrealestate.com/construction" />
      </Head>

      <header className="subpage-hero">
        <div className="container">
          <p className="upgrade-kicker">{c.kicker}</p>
          <h1>{c.title}</h1>
          <p>{c.intro}</p>
          <div className="subpage-actions">
            <Link href="/construction-estimator" className="btn-primary" onClick={() => trackAnalyticsEvent('construction_estimator_open', { placement: 'construction_hero' })}>{c.estimate}</Link>
            <Link href="/contact?service=construction" className="btn-secondary">{c.contact}</Link>
          </div>
        </div>
      </header>

      <section className="subpage-section">
        <div className="container subpage-split">
          <div>
            <p className="upgrade-kicker">{c.servicesKicker}</p>
            <h2>{c.servicesTitle}</h2>
            <p className="section-lead">{c.servicesIntro}</p>
          </div>
          <div className="service-list">
            {c.services.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="subpage-section soft">
        <div className="container">
          <div className="section-heading-upgrade">
            <div><p className="upgrade-kicker">{c.processKicker}</p><h2>{c.processTitle}</h2></div>
          </div>
          <div className="process-grid">
            {c.steps.map(([number, title, text]) => <article className="process-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="subpage-section" id="quality">
        <div className="container">
          <div className="subpage-split">
            <div>
              <p className="upgrade-kicker">{c.qualityKicker}</p>
              <h2>{c.qualityTitle}</h2>
              <p className="section-lead">{c.qualityIntro}</p>
              <Image src="/images/about/degaan-team-site.webp" alt={language === 'so' ? 'Kooxda Degaan oo goob dhisme ku eegaysa qorshaha' : 'Degaan team reviewing project information on site'} width={1200} height={900} style={{ width: '100%', height: 'auto', marginTop: '2rem' }} />
            </div>
            <div className="qa-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0,1fr))' }}>
              {c.quality.map(([number, title, text]) => <article className="qa-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </div>
      </section>

      <section className="subpage-section soft">
        <div className="container">
          <div className="section-heading-upgrade"><div><p className="upgrade-kicker">{c.controlsKicker}</p><h2>{c.controlsTitle}</h2></div></div>
          <div className="quality-grid">
            {c.controls.map(([title, text]) => <article className="quality-card" key={title}><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="home-partner">
        <div className="container">
          <div className="partner-banner">
            <div><p className="upgrade-kicker">Construction planning</p><h2>{c.calculatorTitle}</h2><p>{c.calculatorText}</p></div>
            <Link href="/construction-estimator" className="btn-secondary" onClick={() => trackAnalyticsEvent('construction_estimator_open', { placement: 'construction_bottom' })}>{c.calculatorCta}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
