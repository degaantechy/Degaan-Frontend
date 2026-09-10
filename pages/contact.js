import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'
import ContactForm from '../components/ContactForm'
import { useLanguage } from '../contexts/LanguageContext'
import { API_BASE_URL } from '../lib/api'
import { developments } from '../lib/developments'
import { trackAnalyticsEvent } from '../lib/analytics'

const firstValue = (value) => Array.isArray(value) ? value[0] : (value || '')

export default function Contact() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { language, t } = useLanguage()

  const projectSlug = firstValue(router.query.project)
  const service = firstValue(router.query.service)
  const project = developments.find((item) => item.slug === projectSlug)

  const serviceLabels = {
    construction: language === 'so' ? 'Adeegyada Dhismaha' : 'Construction Services',
    valuation: language === 'so' ? 'Qiimaynta Hantida' : 'Property Valuation',
    investment: language === 'so' ? 'Maalgashi & Development Advisory' : 'Investment & Development Advisory',
    landowner: language === 'so' ? 'Mulkiile Dhul / Joint Development' : 'Landowner / Joint Development',
  }

  const interestMap = {
    construction: 'construction',
    valuation: 'valuation',
    investment: 'investment',
    landowner: 'landowner',
  }

  const formContext = {
    projectSlug,
    projectLabel: project?.name || projectSlug,
    serviceLabel: serviceLabels[service] || service,
    interestType: projectSlug ? 'development' : (interestMap[service] || ''),
  }

  const handleSubmit = async (data) => {
    try {
      setLoading(true)

      const { project_location, timeline, ...apiData } = data
      const qualificationNotes = [
        project_location ? `Project / property location: ${project_location}` : '',
        timeline ? `Target timing: ${timeline}` : '',
      ].filter(Boolean)
      const message = [apiData.message?.trim(), ...qualificationNotes].filter(Boolean).join('\n')

      await axios.post(`${API_BASE_URL}/api/leads/`, {
        ...apiData,
        message,
        project_slug: projectSlug,
        service,
        source_page: router.asPath?.split('?')[0] || '/contact',
        utm_source: firstValue(router.query.utm_source),
        utm_medium: firstValue(router.query.utm_medium),
        utm_campaign: firstValue(router.query.utm_campaign),
      })

      trackAnalyticsEvent('generate_lead', {
        form_name: 'contact',
        interest_type: apiData.interest_type,
        project: projectSlug || undefined,
        service: service || undefined,
      })
      toast.success(t('contact.success'))
      router.push('/?lead=success')
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
        <link rel="canonical" href="https://www.degaanrealestate.com/contact" />
      </Head>

      <div className="container">
        <h1>{t('contact.title')}</h1>

        <div className="contact-section">
          <div className="contact-info">
            <h2>{t('contact.getInTouch')}</h2>
            <div className="info-item"><h4>{t('contact.location')}</h4><p>{t('contact.address')}</p></div>
            <div className="info-item"><h4>{t('contact.phone')}</h4><p>+252 638 888 250</p></div>
            <div className="info-item"><h4>{t('contact.email')}</h4><p>info@degaanrealestate.com</p></div>
            <div className="info-item">
              <h4>{t('contact.whatsapp')}</h4>
              <a
                href="https://wa.me/252638888250"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAnalyticsEvent('whatsapp_click', { placement: 'contact_page', project: projectSlug || undefined, service: service || undefined })}
              >
                {t('contact.chatWhatsapp')}
              </a>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>{t('contact.sendTitle')}</h2>
            <ContactForm onSubmit={handleSubmit} loading={loading} context={formContext} />
          </div>
        </div>
      </div>
    </>
  )
}
