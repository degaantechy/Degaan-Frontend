export const INSIGHT_CATEGORIES = [
  'market',
  'investment',
  'construction',
  'guides',
  'company',
]

export function getInsightField(insight, field, language) {
  if (!insight) return ''
  const localizedField = `${field}_${language === 'so' ? 'so' : 'en'}`
  return insight[localizedField] || insight[`${field}_en`] || ''
}

export function formatInsightDate(value, language) {
  if (!value) return ''

  return new Intl.DateTimeFormat(language === 'so' ? 'so-SO' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}
