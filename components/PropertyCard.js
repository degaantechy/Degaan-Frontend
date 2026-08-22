import Link from 'next/link'
import { useLanguage } from '../contexts/LanguageContext'
import { getLocalizedPropertyField, getPropertyStatus } from '../lib/translations'

export default function PropertyCard({ property }) {
  const { language, t } = useLanguage()
  const address = getLocalizedPropertyField(property, 'address', language)
  const location = getLocalizedPropertyField(property, 'location', language)
  const description = getLocalizedPropertyField(property, 'description', language)

  return (
    <div className="property-card">
      <div className="property-image">
        {property.images && property.images.length > 0 ? (
          <img src={property.images[0]} alt={address} />
        ) : (
          <div className="no-image">{t('property.noImage')}</div>
        )}
        <span className={`status-badge ${property.status}`}>{getPropertyStatus(property.status, language)}</span>
      </div>

      <div className="property-content">
        <h3>{address}</h3>
        <p className="location">{location}</p>

        <div className="property-specs">
          <span>{property.bedrooms} {t('property.beds')}</span>
          <span>{property.size} {t('property.areaUnit')}</span>
        </div>

        <p className="description">
          {description?.substring(0, 100)}...
        </p>

        <div className="property-footer">
          <div className="price">${property.price?.toLocaleString()}</div>
          <Link href={`/property/${property.id}`} className="btn-small">
            {t('property.viewDetails')}
          </Link>
        </div>
      </div>
    </div>
  )
}
