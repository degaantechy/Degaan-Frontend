import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="brand-logo" aria-label="Degaan Real Estate home">
          <Image
            src="/images/degaan-mark.png"
            alt="Degaan Real Estate"
            width={512}
            height={512}
            className="brand-logo-image"
            priority
          />
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          ☰
        </button>

        <nav id="primary-navigation" className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/#projects" onClick={() => setMenuOpen(false)}>Projects</Link>
          <Link href="/properties" onClick={() => setMenuOpen(false)}>Properties</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <a href="https://wa.link/9pfqyn" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  )
}
