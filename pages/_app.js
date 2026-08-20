import '../styles/stylesglobals.css'
import Head from 'next/head'
import Layout from '../components/Layout'
import { Montserrat } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

function MyApp({ Component, pageProps }) {
  return (
    <div className={montserrat.className}>
      <Head>
        <link rel="icon" type="image/png" href="/images/degaan-mark.png" />
        <link rel="apple-touch-icon" href="/images/degaan-mark.png" />
        <meta name="theme-color" content="#2c3240" />
      </Head>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer position="bottom-right" />
      </Layout>
    </div>
  )
}

export default MyApp
