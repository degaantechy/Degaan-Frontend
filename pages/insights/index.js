import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'

import InsightCard from '../../components/InsightCard'
import { useLanguage } from '../../contexts/LanguageContext'
import { API_BASE_URL } from '../../lib/api'
import { INSIGHT_CATEGORIES } from '../../lib/insights'

const PAGE_SIZE = 10

function categoryHref(category, page = 1) {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `/insights?${query}` : '/insights'
}

export default function Insights({ insights, count, currentPage, selectedCategory, loadError }) {
  const { t } = useLanguage()
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE))

  return (
    <>
      <Head>
        <title>{t('insights.seoTitle')}</title>
        <meta name="description" content={t('insights.seoDescription')} />
        <link rel="canonical" href="https://www.degaanrealestate.com/insights" />
      </Head>

      <section className="insights-hero">
        <div className="container insights-hero-inner">
          <p className="insights-kicker">{t('insights.kicker')}</p>
          <h1>{t('insights.title')}</h1>
          <p>{t('insights.intro')}</p>
        </div>
      </section>

      <section className="insights-page">
        <div className="container">
          <nav className="insight-filters" aria-label={t('insights.filterLabel')}>
            <Link href="/insights" className={!selectedCategory ? 'active' : ''}>
              {t('insights.all')}
            </Link>
            {INSIGHT_CATEGORIES.map((category) => (
              <Link
                key={category}
                href={categoryHref(category)}
                className={selectedCategory === category ? 'active' : ''}
              >
                {t(`insights.categories.${category}`)}
              </Link>
            ))}
          </nav>

          {loadError ? (
            <div className="insights-empty">
              <h2>{t('insights.unavailableTitle')}</h2>
              <p>{t('insights.unavailableText')}</p>
            </div>
          ) : insights.length ? (
            <div className="insights-grid">
              {insights.map((insight) => <InsightCard key={insight.id} insight={insight} />)}
            </div>
          ) : (
            <div className="insights-empty">
              <h2>{t('insights.emptyTitle')}</h2>
              <p>{t('insights.emptyText')}</p>
            </div>
          )}

          {totalPages > 1 && (
            <nav className="insights-pagination" aria-label={t('insights.paginationLabel')}>
              {currentPage > 1 && (
                <Link href={categoryHref(selectedCategory, currentPage - 1)}>
                  {t('insights.previous')}
                </Link>
              )}
              <span>{t('insights.page', { current: currentPage, total: totalPages })}</span>
              {currentPage < totalPages && (
                <Link href={categoryHref(selectedCategory, currentPage + 1)}>
                  {t('insights.next')}
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const selectedCategory = INSIGHT_CATEGORIES.includes(query.category) ? query.category : ''
  const requestedPage = Number.parseInt(query.page, 10)
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1

  try {
    const response = await axios.get(`${API_BASE_URL}/api/insights/`, {
      params: {
        page: currentPage,
        ...(selectedCategory ? { category: selectedCategory } : {}),
      },
      timeout: 8000,
    })

    return {
      props: {
        insights: response.data.results || [],
        count: response.data.count || 0,
        currentPage,
        selectedCategory,
        loadError: false,
      },
    }
  } catch (error) {
    return {
      props: {
        insights: [],
        count: 0,
        currentPage,
        selectedCategory,
        loadError: true,
      },
    }
  }
}
