const STORAGE_KEY = 'degaan-attribution'

export function captureAttribution() {
  if (typeof window === 'undefined') return

  try {
    const params = new URLSearchParams(window.location.search)
    const existing = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
    const attribution = {
      landing_page: existing.landing_page || `${window.location.pathname}${window.location.search}`,
      utm_source: params.get('utm_source') || existing.utm_source || '',
      utm_medium: params.get('utm_medium') || existing.utm_medium || '',
      utm_campaign: params.get('utm_campaign') || existing.utm_campaign || '',
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution))
  } catch (error) {
    console.warn('Attribution capture unavailable:', error)
  }
}

export function getAttribution() {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
  } catch (error) {
    return {}
  }
}
