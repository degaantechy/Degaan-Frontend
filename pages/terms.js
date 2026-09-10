import Head from 'next/head'
import { useLanguage } from '../contexts/LanguageContext'

export default function Terms() {
  const { language } = useLanguage()
  const so = language === 'so'
  return (
    <>
      <Head>
        <title>{so ? 'Shuruudaha Website-ka | Degaan Real Estate' : 'Website Terms | Degaan Real Estate'}</title>
        <meta name="description" content={so ? 'Shuruudaha isticmaalka website-ka Degaan Real Estate & Construction.' : 'Website terms for Degaan Real Estate & Construction.'} />
        <link rel="canonical" href="https://www.degaanrealestate.com/terms" />
      </Head>
      <main className="container trust-page">
        <p className="upgrade-kicker">{so ? 'Shuruudaha' : 'Website terms'}</p>
        <h1>{so ? 'Xog hordhac ah ilaa heshiis rasmi ah la saxeexo.' : 'Preliminary information until a formal agreement is signed.'}</h1>
        <p className="trust-lead">{so ? 'Website-kan wuxuu bixiyaa xog guud oo ku saabsan adeegyada, hantida iyo fikradaha development-ka Degaan. Xogta website-ku keligeed ma samaynayso qandaraas, ballanqaad maalgashi ama dammaanad qiime.' : 'This website provides general information about Degaan services, properties and development concepts. Website information alone does not create a construction contract, investment commitment or price guarantee.'}</p>
        <h2>{so ? 'Concept developments' : 'Development concepts'}</h2>
        <p>{so ? 'Magacyada, renders-ka, qiimaha, specifications-ka, unit mix-ka, amenities-ka iyo jadwalka mashaariicda concept-ka ah waa hordhac waxaana laga yaabaa inay is beddelaan ka hor launch ama contract.' : 'Names, renders, pricing, specifications, unit mix, amenities and programme for concept-stage developments are preliminary and may change before formal launch or contract.'}</p>
        <h2>{so ? 'Construction estimator' : 'Construction estimator'}</h2>
        <p>{so ? 'Qiyaasta online-ka ahi waa planning estimate. Qiimaha kama dambaysta ahi wuxuu u baahan yahay drawings, specifications, site review, quantities, materials iyo qandaraas ama quotation rasmi ah.' : 'Online construction estimates are planning estimates. Final pricing requires drawings, specifications, site review, confirmed quantities, materials and a formal quotation or contract.'}</p>
        <h2>{so ? 'Hantida la iibinayo' : 'Property listings'}</h2>
        <p>{so ? 'Availability, qiime, cabbir iyo xaaladda hantida waa in si gaar ah loo xaqiijiyaa ka hor go’aan iib, deposit ama heshiis.' : 'Availability, price, dimensions and property condition should be independently confirmed before a purchase decision, deposit or agreement.'}</p>
        <h2>{so ? 'Maalgashi & feasibility' : 'Investment & feasibility'}</h2>
        <p>{so ? 'Feasibility iyo market analysis waa qalab go’aan, mana aha dammaanad faa’iido. Kharash, demand, financing, sharci, title iyo programme way is beddeli karaan.' : 'Feasibility and market analysis are decision tools, not guarantees of return. Cost, demand, financing, legal title and programme can change.'}</p>
        <h2>{so ? 'Xuquuqda muuqaalka & qoraalka' : 'Content and visuals'}</h2>
        <p>{so ? 'Qoraalka, branding-ka, drawings-ka iyo muuqaalada website-ka waxaa loo isticmaalaa ujeeddooyinka Degaan haddii aan si kale loo sheegin.' : 'Website copy, branding, drawings and visual material are used for Degaan business purposes unless otherwise stated.'}</p>
      </main>
    </>
  )
}
