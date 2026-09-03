import Image from 'next/image'
import Link from 'next/link'

import { getDevelopmentCopy } from '../lib/developments'

export default function DevelopmentCard({ project, index, language, priority = false }) {
  const copy = getDevelopmentCopy(project, language)

  return (
    <article className="development-card">
      <div className="development-image-wrap">
        <Image
          src={project.image}
          alt={copy.alt}
          fill
          className="development-image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 580px"
          priority={priority}
        />
        <span className="development-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="development-concept">
          {language === 'so' ? 'Fikrad cusub' : 'New concept'}
        </span>
      </div>

      <div className="development-card-body">
        <div className="development-card-heading">
          <div>
            <p className="development-location">{copy.location}</p>
            <h3>{project.name}</h3>
          </div>
          <p className="development-price">
            <span>{language === 'so' ? 'Qiimaha' : 'Price range'}</span>
            {project.priceRange}
          </p>
        </div>

        <p className="development-description">{copy.description}</p>

        <div className="development-card-footer">
          <div>
            <span>{copy.category}</span>
            <strong>{copy.type}</strong>
          </div>
          <Link href={`/contact?project=${project.slug}`} className="development-link">
            {language === 'so' ? 'Diiwaangeli xiisaha' : 'Register interest'}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
