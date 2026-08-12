import Head from 'next/head'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PropertyCard from '../components/PropertyCard'

export default function Properties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
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
        <title>Browse Properties | Degaan Real Estate</title>
        <meta name="description" content="Search and browse our available properties" />
      </Head>

      <div className="container">
        <h1>Browse Properties</h1>

        <div className="filters-section">
          <h3>Filter Properties</h3>
          <div className="filters-grid">
            <div className="filter-group">
              <label>Min Price</label>
              <input
                type="number"
                name="min_price"
                value={filters.min_price}
                onChange={handleFilterChange}
                placeholder="Min price"
              />
            </div>
            <div className="filter-group">
              <label>Max Price</label>
              <input
                type="number"
                name="max_price"
                value={filters.max_price}
                onChange={handleFilterChange}
                placeholder="Max price"
              />
            </div>
            <div className="filter-group">
              <label>Min Bedrooms</label>
              <select name="min_bedrooms" value={filters.min_bedrooms} onChange={handleFilterChange}>
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Status</label>
              <select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="">Any</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="construction">Under Construction</option>
              </select>
            </div>
          </div>
          <button onClick={handleReset} className="btn-secondary">
            Reset Filters
          </button>
        </div>

        {loading ? (
          <p>Loading properties...</p>
        ) : properties.length > 0 ? (
          <>
            <p className="results-count">Found {properties.length} properties</p>
            <div className="properties-grid">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </>
        ) : (
          <p>No properties found matching your criteria</p>
        )}
      </div>
    </>
  )
}
