import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'
import ContactForm from '../components/ContactForm'
import { useLanguage } from '../contexts/LanguageContext'
import { API_BASE_URL } from '../lib/api'

export default function Contact() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = async (data) => {
    try {
      setLoading(true)
      await axios.post(`${API_BASE_URL}/api/leads/`, data)
      toast.success(t('contact.success'))
      router.push('/')
    } catch (error) {
      toast.error(t('contact.error'))
      console.error('Form error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>{t('contact.seoTitle')}</title>
        <meta name="description" content={t('contact.seoDescription')} />
      </Head>

      <div className="container">
        <h1>{t('contact.title')}</h1>

        <div className="contact-section">
          <div className="contact-info">
            <h2>{t('contact.getInTouch')}</h2>
            <div className="info-item">
              <h4>{t('contact.location')}</h4>
              <p>{t('contact.address')}</p>
            </div>
            <div className="info-item">
              <h4>{t('contact.phone')}</h4>
              <p>+252 638 888 250</p>
            </div>
            <div className="info-item">
              <h4>{t('contact.email')}</h4>
              <p>info@degaanrealestate.com</p>
            </div>
            <div className="info-item">
              <h4>{t('contact.whatsapp')}</h4>
              <a href="https://wa.me/252638888250" target="_blank" rel="noopener noreferrer">
                {t('contact.chatWhatsapp')}
              </a>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>{t('contact.sendTitle')}</h2>
            <ContactForm onSubmit={handleSubmit} loading={loading} />
          </div>
        </div>
      </div>
    </>
  )
}
