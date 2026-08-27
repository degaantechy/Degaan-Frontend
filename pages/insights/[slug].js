import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'

import { useLanguage } from '../../contexts/LanguageContext'
import { API_BASE_URL } from '../../lib/api'
import { formatInsightDate, getInsightField } from '../../lib/insights'

export default function InsightDetail({ insight, loadError }) {
  const { language, t } = useLanguage()

  if (loadError || !insight) {
    return (
      <section className="insight-article-state container">
        <h1>{t('insights.unavailableTitle')}</h1>
        <p>{t('insights.unavailableText')}</p>
        <Link href="/insights" className="insight-read-link">← {t('insights.back')}</Link>
      </section>
    )
  }

  const title = getInsightField(insight, 'title', language)
  const excerpt = getInsightField(insight, 'excerpt', language)
  const content = getInsightField(insight, 'content', language)
  const paragraphs = content.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean)

  return (
    <article className="insight-article">
      <Head>
        <title>{title} | Degaan Real Estate</title>
        <meta name="description" content={excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        {insight.cover_image_url && <meta property="og:image" content={insight.cover_image_url} />}
        <link rel="canonical" href={`https://www.degaanrealestate.com/insights/${insight.slug}`} />
      </Head>

      <header className="insight-article-header">
        <div className="container insight-article-header-inner">
          <Link href="/insights" className="insight-back-link">← {t('insights.back')}</Link>
          <div className="insight-meta insight-article-meta">
            <span>{t(`insights.categories.${insight.category}`)}</span>
            <time dateTime={insight.published_at}>
              {formatInsightDate(insight.published_at, language)}
            </time>
          </div>
          <h1>{title}</h1>
          <p className="insight-article-lead">{excerpt}</p>
          <p className="insight-author">{t('insights.by')} {insight.author}</p>
        </div>
      </header>

      <div className="container insight-article-layout">
        {insight.cover_image_url && (
          <figure className="insight-cover">
            <img src={insight.cover_image_url} alt={title} />
          </figure>
        )}

        <div className="insight-article-body">
          {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      </div>
    </article>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/insights/${params.slug}/`, {
      timeout: 8000,
    })
    return { props: { insight: response.data, loadError: false } }
  } catch (error) {
    if (error.response?.status === 404) return { notFound: true }
    return { props: { insight: null, loadError: true } }
  }
}
