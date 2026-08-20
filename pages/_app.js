import '../styles/stylesglobals.css'
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
      <Layout>
        <Component {...pageProps} />
        <ToastContainer position="bottom-right" />
      </Layout>
    </div>
  )
}

export default MyApp
