import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function PropertyDetail() {
  const router = useRouter()
  const { id } = router.query
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

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

  if (loading) return <div className="container"><p>Loading property...</p></div>
  if (!property) return <div className="container"><p>Property not found</p></div>

  return (
    <>
      <Head>
        <title>{property.address} | Degaan Real Estate</title>
        <meta name="description" content={property.description} />
      </Head>

      <div className="container">
        <Link href="/properties">&lt; Back to Properties</Link>

        <div className="property-detail">
          <div className="property-images">
            {property.images && property.images.length > 0 ? (
              <div className="main-image">
                <img src={property.images[0]} alt={property.address} />
              </div>
            ) : (
              <div className="no-image">No image available</div>
            )}
          </div>

          <div className="property-info">
            <h1>{property.address}</h1>
            <div className="property-meta">
              <span className={`status ${property.status}`}>{property.status}</span>
              <span className="price">${property.price?.toLocaleString()}</span>
            </div>

            <div className="property-specs">
              <div className="spec">
                <strong>Size:</strong> {property.size} sq ft
              </div>
              <div className="spec">
                <strong>Bedrooms:</strong> {property.bedrooms}
              </div>
              <div className="spec">
                <strong>Location:</strong> {property.location}
              </div>
              <div className="spec">
                <strong>Type:</strong> {property.property_type}
              </div>
            </div>

            <div className="property-description">
              <h3>Description</h3>
              <p>{property.description}</p>
            </div>

            <div className="property-features">
              <h3>Features</h3>
              <ul>
                {property.features && property.features.split(',').map((feature, idx) => (
                  <li key={idx}>{feature.trim()}</li>
                ))}
              </ul>
            </div>

            <div className="property-actions">
              <a href="https://wa.me/252638888250" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Contact on WhatsApp
              </a>
              <Link href={`/contact?property=${id}`} className="btn-secondary">
                Request Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
