import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PropertyCard from '../components/PropertyCard'
import Hero from '../components/Hero'
import ContactForm from '../components/ContactForm'

export default function Home() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/properties/?limit=6`
      )
      setProperties(response.data.results || [])
    } catch (error) {
      console.error('Failed to fetch properties:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home-page">
      <Head>
        <title>Degaan Real Estate | Premium Properties & Construction Services</title>
        <meta name="description" content="Discover exclusive properties and expert construction services in Somaliland" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Hero />

      <section className="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>🏗️ Construction Services</h3>
              <p>Complete end-to-end construction with premium materials and expert project management</p>
              <Link href="/contact?service=construction">Get Quote</Link>
            </div>
            <div className="service-card">
              <h3>🏠 Buy & Sell Properties</h3>
              <p>Expert guidance for buying or selling properties with market analysis</p>
              <Link href="/properties">Browse Properties</Link>
            </div>
            <div className="service-card">
              <h3>📊 Property Valuation</h3>
              <p>Accurate property valuation using market analysis and professional assessment</p>
              <Link href="/contact?service=valuation">Get Valuation</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-properties">
        <div className="container">
          <h2>Featured Properties</h2>
          {loading ? (
            <p>Loading properties...</p>
          ) : properties.length > 0 ? (
            <div className="properties-grid">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p>No properties available</p>
          )}
          <div className="text-center">
            <Link href="/properties" className="btn-primary">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      <section className="why-choose-us">
        <div className="container">
          <h2>Why Choose Degaan Real Estate</h2>
          <div className="reasons-grid">
            <div className="reason">
              <h4>Expert Team</h4>
              <p>Professional engineers and real estate experts with years of experience</p>
            </div>
            <div className="reason">
              <h4>Quality Assured</h4>
              <p>Earthquake-resistant structures and premium materials in all projects</p>
            </div>
            <div className="reason">
              <h4>Transparent Pricing</h4>
              <p>Detailed cost estimates and no hidden fees</p>
            </div>
            <div className="reason">
              <h4>On-Time Delivery</h4>
              <p>Proven track record of completing projects on schedule</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Project?</h2>
          <p>Contact us today for a free consultation</p>
          <div className="cta-buttons">
            <Link href="/contact" className="btn-primary">Schedule Consultation</Link>
            <a href="https://wa.link/9pfqyn" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
