import Link from 'next/link'

export default function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <div className="property-image">
        {property.images && property.images.length > 0 ? (
          <img src={property.images[0]} alt={property.address} />
        ) : (
          <div className="no-image">No Image</div>
        )}
        <span className={`status-badge ${property.status}`}>{property.status}</span>
      </div>

      <div className="property-content">
        <h3>{property.address}</h3>
        <p className="location">📍 {property.location}</p>

        <div className="property-specs">
          <span>🛏️ {property.bedrooms} beds</span>
          <span>📐 {property.size} sqft</span>
        </div>

        <p className="description">
          {property.description?.substring(0, 100)}...
        </p>

        <div className="property-footer">
          <div className="price">${property.price?.toLocaleString()}</div>
          <Link href={`/property/${property.id}`} className="btn-small">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
