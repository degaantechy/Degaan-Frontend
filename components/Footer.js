import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h4>Degaan Real Estate</h4>
            <p>Your trusted partner in real estate and construction services in Somaliland</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/properties">Properties</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="/contact?service=construction">Construction</a></li>
              <li><a href="/contact?service=valuation">Valuation</a></li>
              <li><a href="/contact?service=investment">Investment Advisory</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>Burjomar, Hargeisa, Somaliland</p>
            <p>+252 638 888 250</p>
            <p>info@degaanrealestate.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Degaan Real Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
