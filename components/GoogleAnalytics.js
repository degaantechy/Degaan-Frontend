import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const hasValidMeasurementId = /^G-[A-Z0-9]+$/i.test(measurementId || '')

export default function GoogleAnalytics() {
  const router = useRouter()

  useEffect(() => {
    if (!hasValidMeasurementId) return undefined

    const trackPageView = (url) => {
      if (typeof window.gtag !== 'function') return
      window.gtag('event', 'page_view', {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
      })
    }

    router.events.on('routeChangeComplete', trackPageView)
    return () => router.events.off('routeChangeComplete', trackPageView)
  }, [router.events])

  if (!hasValidMeasurementId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="degaan-google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  )
}
