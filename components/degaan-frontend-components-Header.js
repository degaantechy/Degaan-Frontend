import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">
          <Link href="/">
            <h1>Degaan Real Estate</h1>
          </Link>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link href="/">Home</Link>
          <Link href="/properties">Properties</Link>
          <Link href="/contact">Contact</Link>
          <a href="https://wa.link/9pfqyn" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  )
}
