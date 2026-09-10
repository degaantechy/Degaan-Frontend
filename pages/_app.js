import '../styles/stylesglobals.css'
import '../styles/brand-upgrade.css'
import '../styles/apple-minimal.css'
import Head from 'next/head'
import Layout from '../components/Layout'
import GoogleAnalytics from '../components/GoogleAnalytics'
import { ToastContainer } from 'react-toastify'
import { LanguageProvider } from '../contexts/LanguageContext'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <div>
        <Head>
          <link rel="icon" type="image/png" href="/images/degaan-mark.png" />
          <link rel="apple-touch-icon" href="/images/degaan-mark.png" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer position="bottom-right" />
        </Layout>
        <GoogleAnalytics />
      </div>
    </LanguageProvider>
  )
}

export default MyApp
