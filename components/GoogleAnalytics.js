import Script from 'next/script'

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const hasValidMeasurementId = /^G-[A-Z0-9]+$/i.test(measurementId || '')

export default function GoogleAnalytics() {
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
