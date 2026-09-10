import Head from 'next/head'
import Link from 'next/link'

import { useLanguage } from '../contexts/LanguageContext'
import { trackAnalyticsEvent } from '../lib/analytics'

const COPY = {
  en: {
    seoTitle: 'Partner With Degaan | Landowners & Real Estate Investors in Somaliland',
    seoDescription: 'Development feasibility, landowner collaboration, investment analysis and development management support from Degaan in Somaliland.',
    kicker: 'Landowners · investors · developers',
    title: 'Turn land and capital into a development decision you can test.',
    intro: 'Before committing to a building type or sales price, Degaan can help define what the site can support, what the market may absorb and what delivery structure is practical.',
    cta: 'Discuss an opportunity',
    servicesKicker: 'Development advisory',
    servicesTitle: 'Start with the business case before the drawings become expensive.',
    cards: [
      ['01', 'Site & opportunity review', 'Review location, access, plot characteristics, surrounding uses and the practical constraints that shape development options.'],
      ['02', 'Development concept', 'Compare residential, apartment, commercial or mixed-use directions and define a concept appropriate to the site.'],
      ['03', 'Feasibility model', 'Test area efficiency, indicative development cost, unit mix, pricing assumptions, phases and sensitivity before a major commitment.'],
      ['04', 'Landowner structures', 'Explore development-management, joint-development or other collaboration structures without assuming that outright land sale is the only route.'],
      ['05', 'Investment planning', 'Organize the investment case around capital required, phasing, risk, expected demand and practical exit or income scenarios.'],
      ['06', 'Development management', 'Coordinate the route from concept through design, approvals where applicable, procurement, construction, sales preparation and handover.'],
    ],
    processKicker: 'How an opportunity is screened',
    processTitle: 'Four questions before a development moves forward.',
    steps: [
      ['01', 'What does the site allow?', 'Understand dimensions, access, physical conditions, infrastructure and planning constraints.'],
      ['02', 'Who is the project for?', 'Define the buyer, tenant or operator and what they are likely to value and afford.'],
      ['03', 'Does the financial logic work?', 'Test cost, price, phasing, cash requirement and downside sensitivity using transparent assumptions.'],
      ['04', 'How should it be delivered?', 'Choose a practical ownership, development, construction and sales structure with clear responsibilities.'],
    ],
    cautionTitle: 'Feasibility is not a promise of return.',
    cautionText: 'Market demand, cost, programme, financing, legal title and approvals can change. Degaan’s role is to make assumptions explicit, test them and improve the quality of the decision before capital is committed.',
    closingTitle: 'Have land, a site or an investment brief?',
    closingText: 'Send the location, approximate plot size, ownership situation and what you are considering. The first objective is to determine whether the opportunity deserves deeper work.',
  },
  so: {
    seoTitle: 'La Shaqee Degaan | Mulkiilayaasha Dhulka & Maalgashadayaasha Somaliland',
    seoDescription: 'Feasibility, wada-shaqayn mulkiile dhul, falanqayn maalgashi iyo development management oo Degaan ka bixiso Somaliland.',
    kicker: 'Mulkiile dhul · maalgashade · developer',
    title: 'Dhul iyo raasumaal u beddel go’aan development oo la tijaabin karo.',
    intro: 'Ka hor inta aan nooca dhismaha ama qiimaha iibka la go’aamin, Degaan waxay kaa caawin kartaa waxa goobtu qaadi karto, waxa suuqu nuugi karo iyo qaabka fulinta ee macquulka ah.',
    cta: 'Kala hadal fursadda',
    servicesKicker: 'Development advisory',
    servicesTitle: 'Ku bilow business case-ka ka hor inta drawings-ku qaali noqon.',
    cards: [
      ['01', 'Hubinta goobta & fursadda', 'Eeg location, access, cabbirka dhulka, isticmaalka ku hareeraysan iyo xaddidaadaha saameeya development-ka.'],
      ['02', 'Development concept', 'Isbarbar dhig residential, apartments, commercial ama mixed-use oo qeex concept ku habboon goobta.'],
      ['03', 'Feasibility model', 'Tijaabi area efficiency, kharash hordhac ah, unit mix, pricing assumptions, phases iyo sensitivity ka hor maalgelin weyn.'],
      ['04', 'Qaababka mulkiilaha dhulka', 'Sahamin development-management, joint-development ama qaabab kale iyadoo aan loo qaadan in iibinta dhulku tahay waddada keliya.'],
      ['05', 'Qorshaynta maalgashiga', 'Habee capital required, phasing, risk, expected demand iyo exit ama income scenarios.'],
      ['06', 'Development management', 'Isku dubbarid concept ilaa design, approvals marka ay khuseeyaan, procurement, construction, sales preparation iyo handover.'],
    ],
    processKicker: 'Sida fursadda loo qiimeeyo',
    processTitle: 'Afar su’aalood ka hor inta development-ku hore u socdo.',
    steps: [
      ['01', 'Maxay goobtu oggolaanaysaa?', 'Faham dimensions, access, xaaladda dhulka, infrastructure iyo planning constraints.'],
      ['02', 'Yaa mashruuca loogu talagalay?', 'Qeex buyer, tenant ama operator iyo waxa ay u badan tahay inay qiimeeyaan oo awoodaan.'],
      ['03', 'Financial logic-ku ma shaqaynayaa?', 'Tijaabi cost, price, phasing, cash requirement iyo downside sensitivity iyadoo assumptions-ku cad yihiin.'],
      ['04', 'Sidee loo fulinayaa?', 'Dooro ownership, development, construction iyo sales structure macquul ah oo masuuliyadaha cad yihiin.'],
    ],
    cautionTitle: 'Feasibility ma aha ballanqaad faa’iido.',
    cautionText: 'Market demand, kharash, jadwal, financing, legal title iyo approvals way is beddeli karaan. Doorka Degaan waa in assumptions-ka la caddeeyo, la tijaabiyo oo tayada go’aanka la kordhiyo ka hor capital commitment.',
    closingTitle: 'Dhul, site ama investment brief ma haysaa?',
    closingText: 'Soo dir goobta, cabbirka qiyaasta ah, xaaladda lahaanshaha iyo waxa aad ka fikirayso. Ujeeddada koowaad waa in la ogaado in fursaddu mudan tahay shaqo dheeraad ah.',
  },
}

export default function Partner() {
  const { language } = useLanguage()
  const c = COPY[language] || COPY.en

  return (
    <>
      <Head>
        <title>{c.seoTitle}</title>
        <meta name="description" content={c.seoDescription} />
        <link rel="canonical" href="https://www.degaanrealestate.com/partner" />
      </Head>

      <header className="subpage-hero">
        <div className="container">
          <p className="upgrade-kicker">{c.kicker}</p>
          <h1>{c.title}</h1>
          <p>{c.intro}</p>
          <div className="subpage-actions">
            <Link href="/contact?service=investment" className="btn-primary" onClick={() => trackAnalyticsEvent('partner_lead_start', { placement: 'partner_hero' })}>{c.cta}</Link>
          </div>
        </div>
      </header>

      <section className="subpage-section">
        <div className="container">
          <div className="section-heading-upgrade"><div><p className="upgrade-kicker">{c.servicesKicker}</p><h2>{c.servicesTitle}</h2></div></div>
          <div className="partner-grid">
            {c.cards.map(([number, title, text]) => <article className="partner-card" key={number}><span className="work-meta">{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="subpage-section soft">
        <div className="container">
          <div className="section-heading-upgrade"><div><p className="upgrade-kicker">{c.processKicker}</p><h2>{c.processTitle}</h2></div></div>
          <div className="process-grid">
            {c.steps.map(([number, title, text]) => <article className="process-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <div className="proof-note"><strong>{c.cautionTitle}</strong><br />{c.cautionText}</div>
        </div>
      </section>

      <section className="home-partner">
        <div className="container">
          <div className="partner-banner">
            <div><h2>{c.closingTitle}</h2><p>{c.closingText}</p></div>
            <Link href="/contact?service=investment" className="btn-secondary" onClick={() => trackAnalyticsEvent('partner_lead_start', { placement: 'partner_bottom' })}>{c.cta}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
