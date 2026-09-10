import Head from 'next/head'
import { useLanguage } from '../contexts/LanguageContext'

export default function Privacy() {
  const { language } = useLanguage()
  const so = language === 'so'
  return (
    <>
      <Head>
        <title>{so ? 'Asturnaanta | Degaan Real Estate' : 'Privacy Notice | Degaan Real Estate'}</title>
        <meta name="description" content={so ? 'Ogeysiiska asturnaanta website-ka Degaan Real Estate & Construction.' : 'Privacy notice for the Degaan Real Estate & Construction website.'} />
        <link rel="canonical" href="https://www.degaanrealestate.com/privacy" />
      </Head>
      <main className="container trust-page">
        <p className="upgrade-kicker">{so ? 'Asturnaanta' : 'Privacy'}</p>
        <h1>{so ? 'Sida xogta website-ka loo isticmaalo.' : 'How website information is used.'}</h1>
        <p className="trust-lead">{so ? 'Marka aad nala soo xidhiidho, codsato qiimeyn ama diiwaangeliso xiisaha mashruuc, waxaan isticmaalnaa xogta aad bixisay si aan uga jawaabno codsigaaga oo aan u maamulno xidhiidhka macaamilka.' : 'When you contact us, request an estimate or register interest in a project, we use the information you provide to respond to your enquiry and manage the customer relationship.'}</p>
        <h2>{so ? 'Xogta la ururin karo' : 'Information we may collect'}</h2>
        <p>{so ? 'Waxaa ka mid noqon kara magaca, telefoonka, email-ka, nooca adeegga ama mashruuca, miisaaniyadda qiyaasta ah, fariinta, campaign source iyo xog farsamo oo aasaasi ah oo analytics-ku ururiyo.' : 'This can include your name, phone number, email, service or project interest, indicative budget, message, campaign source and basic technical analytics information.'}</p>
        <h2>{so ? 'Sababta loo isticmaalo' : 'Why we use it'}</h2>
        <p>{so ? 'Waxaan u isticmaalnaa jawaab celin, diyaarinta adeeg, hagaajinta website-ka, fahamka waxa macaamiishu danaynayaan iyo la socodka inquiries-ka.' : 'We use it to respond, prepare relevant services, improve the website, understand customer interest and track enquiries.'}</p>
        <h2>{so ? 'Analytics' : 'Analytics'}</h2>
        <p>{so ? 'Website-ku wuxuu isticmaali karaa analytics si loo fahmo booqashooyinka iyo interaction-ka. Analytics-ku wuxuu shaqeeyaa oo keliya marka configuration-ku sax yahay.' : 'The website may use analytics to understand visits and interactions. Analytics operates only when the site analytics configuration is enabled.'}</p>
        <h2>{so ? 'La wadaagista xogta' : 'Sharing information'}</h2>
        <p>{so ? 'Ma iibino xogta inquiries-ka. Xogta waxaa lala wadaagi karaa shaqaalaha ama adeeg-bixiyeyaasha loo baahan yahay si website-ka ama codsigaaga loo fuliyo, iyadoo la raacayo baahida shaqada.' : 'We do not sell enquiry information. Information may be available to staff or service providers needed to operate the website or respond to your request, on a need-to-know basis.'}</p>
        <h2>{so ? 'Nala soo xidhiidh' : 'Contact'}</h2>
        <p>{so ? 'Su’aal ku saabsan xogtaada: info@degaanrealestate.com.' : 'Questions about your information can be sent to info@degaanrealestate.com.'}</p>
      </main>
    </>
  )
}
