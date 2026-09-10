import { developments } from '../lib/developments'

const BASE_URL = 'https://www.degaanrealestate.com'

function createSitemap() {
  const staticRoutes = [
    '',
    '/developments',
    '/properties',
    '/construction',
    '/construction-estimator',
    '/projects',
    '/insights',
    '/about',
    '/partner',
    '/contact',
    '/privacy',
    '/terms',
  ]

  const developmentRoutes = developments.map((project) => `/development/${project.slug}`)
  const routes = [...staticRoutes, ...developmentRoutes]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${BASE_URL}${route}</loc></url>`).join('\n')}
</urlset>`
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'text/xml')
  res.write(createSitemap())
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  return null
}
