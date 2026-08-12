import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Degaan Real Estate</h1>
        <p>Your trusted partner for premium properties and expert construction services</p>
        <div className="hero-buttons">
          <Link href="/properties" className="btn-primary">
            Browse Properties
          </Link>
          <Link href="/contact" className="btn-secondary">
            Get Consultation
          </Link>
        </div>
      </div>
    </section>
  )
}
