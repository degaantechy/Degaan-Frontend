const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL

export const API_BASE_URL = (
  configuredApiUrl && !configuredApiUrl.includes('YOUR-BACKEND-DOMAIN')
    ? configuredApiUrl
    : 'https://api.degaanrealestate.com'
).replace(/\/$/, '')
