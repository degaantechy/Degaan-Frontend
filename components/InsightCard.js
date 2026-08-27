import Link from 'next/link'

import { formatInsightDate, getInsightField } from '../lib/insights'
import { useLanguage } from '../contexts/LanguageContext'

export default function InsightCard({ insight }) {
  const { language, t } = useLanguage()
  const title = getInsightField(insight, 'title', language)
  const excerpt = getInsightField(insight, 'excerpt', language)

  return (
    <article className="insight-card">
      <Link
        href={`/insights/${insight.slug}`}
        className="insight-card-media"
        aria-label={`${t('insights.readArticle')}: ${title}`}
      >
        {insight.cover_image_url ? (
          <img src={insight.cover_image_url} alt="" loading="lazy" />
        ) : (
          <span className="insight-card-placeholder" aria-hidden="true">Degaan</span>
        )}
      </Link>

      <div className="insight-card-body">
        <div className="insight-meta">
          <span>{t(`insights.categories.${insight.category}`)}</span>
          <time dateTime={insight.published_at}>
            {formatInsightDate(insight.published_at, language)}
          </time>
        </div>
        <h2><Link href={`/insights/${insight.slug}`}>{title}</Link></h2>
        <p>{excerpt}</p>
        <Link href={`/insights/${insight.slug}`} className="insight-read-link">
          {t('insights.readArticle')} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
