import Head from 'next/head'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PropertyCard from '../components/PropertyCard'
import { useLanguage } from '../contexts/LanguageContext'

export default function Properties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()
  const [filters, setFilters] = useState({
    min_price: '',
    max_price: '',
    min_bedrooms: '',
    status: '',
  })

  useEffect(() => {
    fetchProperties()
  }, [filters])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filters.min_price) params.append('min_price', filters.min_price)
      if (filters.max_price) params.append('max_price', filters.max_price)
      if (filters.min_bedrooms) params.append('min_bedrooms', filters.min_bedrooms)
      if (filters.status) params.append('status', filters.status)

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/properties/?${params.toString()}`
      )
      setProperties(response.data.results || [])
    } catch (error) {
      console.error('Failed to fetch properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleReset = () => {
    setFilters({
      min_price: '',
      max_price: '',
      min_bedrooms: '',
      status: '',
    })
  }

  return (
    <>
      <Head>
        <title>{t('properties.seoTitle')}</title>
        <meta name="description" content={t('properties.seoDescription')} />
      </Head>

      <div className="container">
        <h1>{t('properties.title')}</h1>

        <div className="filters-section">
          <h3>{t('properties.filterTitle')}</h3>
          <div className="filters-grid">
            <div className="filter-group">
              <label>{t('properties.minPrice')}</label>
              <input
                type="number"
                name="min_price"
                value={filters.min_price}
                onChange={handleFilterChange}
                placeholder={t('properties.minPricePlaceholder')}
              />
            </div>
            <div className="filter-group">
              <label>{t('properties.maxPrice')}</label>
              <input
                type="number"
                name="max_price"
                value={filters.max_price}
                onChange={handleFilterChange}
                placeholder={t('properties.maxPricePlaceholder')}
              />
            </div>
            <div className="filter-group">
              <label>{t('properties.minBedrooms')}</label>
              <select name="min_bedrooms" value={filters.min_bedrooms} onChange={handleFilterChange}>
                <option value="">{t('properties.any')}</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            <div className="filter-group">
              <label>{t('properties.status')}</label>
              <select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="">{t('properties.any')}</option>
                <option value="available">{t('properties.available')}</option>
                <option value="sold">{t('properties.sold')}</option>
                <option value="construction">{t('properties.construction')}</option>
              </select>
            </div>
          </div>
          <button onClick={handleReset} className="btn-secondary">
            {t('properties.reset')}
          </button>
        </div>

        {loading ? (
          <p>{t('properties.loading')}</p>
        ) : properties.length > 0 ? (
          <>
            <p className="results-count">{t('properties.results', { count: properties.length })}</p>
            <div className="properties-grid">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </>
        ) : (
          <p>{t('properties.noResults')}</p>
        )}
      </div>
    </>
  )
}
