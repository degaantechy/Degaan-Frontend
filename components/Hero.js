import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useLanguage } from '../contexts/LanguageContext'
import { developments, getDevelopmentCopy } from '../lib/developments'
import { trackAnalyticsEvent } from '../lib/analytics'

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const { language, t } = useLanguage()
  const project = developments[activeSlide]
  const copy = getDevelopmentCopy(project, language)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % developments.length)
    }, 7000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="hero" aria-roledescription="carousel" aria-label={t('hero.label')}>
      <div className="hero-media" aria-live="off">
        {developments.map((slide, index) => {
          const slideCopy = getDevelopmentCopy(slide, language)
          return (
            <Image
              key={slide.slug}
              src={slide.image}
              alt={index === activeSlide ? slideCopy.alt : ''}
              fill
              className={`hero-image ${index === activeSlide ? 'active' : ''}`}
              sizes="100vw"
              priority={index === 0}
              aria-hidden={index !== activeSlide}
            />
          )
        })}
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-content">
        <p className="hero-company">Degaan Real Estate &amp; Construction</p>
        <h1 className="hero-corporate-title">
          {language === 'so' ? 'Meelo nolol fiican loo dhisay.' : 'Built for better living.'}
        </h1>
        <p className="hero-tagline">
          {language === 'so'
            ? 'Naqshad, dhisme iyo horumarin si taxaddar leh la isugu xidhay—fikrad ilaa meel la isticmaali karo.'
            : 'Design, construction and development thoughtfully connected—from first idea to finished place.'}
        </p>

        <div className="hero-buttons">
          <Link
            href="/developments"
            className="btn-primary"
            onClick={() => trackAnalyticsEvent('development_explore', { placement: 'hero' })}
          >
            {language === 'so' ? 'Sahamin mashaariicda' : 'Explore developments'}
          </Link>
          <Link
            href="/contact?service=construction"
            className="btn-secondary"
            onClick={() => trackAnalyticsEvent('construction_cta', { placement: 'hero' })}
          >
            {language === 'so' ? 'Bilow mashruuc' : 'Start a project'}
          </Link>
        </div>

        <Link
          href={`/development/${project.slug}`}
          className="hero-project-register"
          onClick={() => trackAnalyticsEvent('featured_development_open', { project: project.slug, placement: 'hero' })}
        >
          {language === 'so' ? 'Mashruuca muuqda' : 'Featured'}: {project.name} · {copy.location} <span aria-hidden="true">›</span>
        </Link>
      </div>

      <div className="hero-controls">
        <div className="hero-dots" role="tablist" aria-label={t('hero.chooseSlide')}>
          {developments.map((slide, index) => (
            <button
              key={slide.slug}
              type="button"
              className={index === activeSlide ? 'active' : ''}
              onClick={() => setActiveSlide(index)}
              aria-label={`${t('hero.showSlide')} ${index + 1}: ${slide.name}`}
              aria-selected={index === activeSlide}
              role="tab"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
