import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useLanguage } from '../contexts/LanguageContext'
import { getLocalizedPropertyField, getPropertyStatus, getPropertyType } from '../lib/translations'

export default function PropertyDetail() {
  const router = useRouter()
  const { id } = router.query
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const { language, t } = useLanguage()

  useEffect(() => {
    if (id) {
      fetchProperty()
    }
  }, [id])

  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}/`
      )
      setProperty(response.data)
    } catch (error) {
      console.error('Failed to fetch property:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="container"><p>{t('property.loading')}</p></div>
  if (!property) return <div className="container"><p>{t('property.notFound')}</p></div>

  const address = getLocalizedPropertyField(property, 'address', language)
  const location = getLocalizedPropertyField(property, 'location', language)
  const description = getLocalizedPropertyField(property, 'description', language)
  const features = getLocalizedPropertyField(property, 'features', language)

  return (
    <>
      <Head>
        <title>{address} | Degaan Real Estate</title>
        <meta name="description" content={description} />
      </Head>

      <div className="container">
        <Link href="/properties">&lt; {t('property.back')}</Link>

        <div className="property-detail">
          <div className="property-images">
            {property.images && property.images.length > 0 ? (
              <div className="main-image">
                <img src={property.images[0]} alt={address} />
              </div>
            ) : (
              <div className="no-image">{t('property.noImageAvailable')}</div>
            )}
          </div>

          <div className="property-info">
            <h1>{address}</h1>
            <div className="property-meta">
              <span className={`status ${property.status}`}>{getPropertyStatus(property.status, language)}</span>
              <span className="price">${property.price?.toLocaleString()}</span>
            </div>

            <div className="property-specs">
              <div className="spec">
                <strong>{t('property.size')}:</strong> {property.size} {t('property.areaUnit')}
              </div>
              <div className="spec">
                <strong>{t('property.bedrooms')}:</strong> {property.bedrooms}
              </div>
              <div className="spec">
                <strong>{t('property.location')}:</strong> {location}
              </div>
              <div className="spec">
                <strong>{t('property.type')}:</strong> {getPropertyType(property.property_type, language)}
              </div>
            </div>

            <div className="property-description">
              <h3>{t('property.description')}</h3>
              <p>{description}</p>
            </div>

            <div className="property-features">
              <h3>{t('property.features')}</h3>
              <ul>
                {features && features.split(',').map((feature, idx) => (
                  <li key={idx}>{feature.trim()}</li>
                ))}
              </ul>
            </div>

            <div className="property-actions">
              <a href="https://wa.me/252638888250" target="_blank" rel="noopener noreferrer" className="btn-primary">
                {t('property.contactWhatsapp')}
              </a>
              <Link href={`/contact?property=${id}`} className="btn-secondary">
                {t('property.requestInfo')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
