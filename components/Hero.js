import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useLanguage } from '../contexts/LanguageContext'
import { developments, getDevelopmentCopy } from '../lib/developments'

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

  const changeSlide = (direction) => {
    setActiveSlide((current) => (
      (current + direction + developments.length) % developments.length
    ))
  }

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
        <p className="hero-kicker">{copy.category} <span>·</span> {copy.location}</p>
        <h1>{project.name}</h1>
        <p className="hero-description">{copy.description}</p>

        <div className="hero-facts">
          <div>
            <span>{t('hero.from')}</span>
            <strong>{project.price}</strong>
          </div>
          <div>
            <span>{t('hero.propertyType')}</span>
            <strong>{copy.type}</strong>
          </div>
        </div>

        <div className="hero-buttons">
          <Link href="#developments" className="btn-primary">{t('hero.explore')}</Link>
          <Link href={`/contact?project=${project.slug}`} className="btn-secondary">
            {t('hero.register')}
          </Link>
        </div>
      </div>

      <div className="hero-controls">
        <span className="hero-counter" aria-hidden="true">
          {String(activeSlide + 1).padStart(2, '0')} / {String(developments.length).padStart(2, '0')}
        </span>
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
        <div className="hero-arrows">
          <button type="button" onClick={() => changeSlide(-1)} aria-label={t('hero.previous')}>←</button>
          <button type="button" onClick={() => changeSlide(1)} aria-label={t('hero.next')}>→</button>
        </div>
      </div>
    </section>
  )
}
