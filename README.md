# Degaan Real Estate - Frontend

Next.js 14 frontend for Degaan Real Estate platform.

## Features

- Property listing and search
- Property detail pages
- Contact forms with lead capture
- Responsive mobile design
- SEO optimized
- Fast performance (Core Web Vitals)

## Installation

```bash
npm install
```

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=https://api.degaanrealestate.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Development

```bash
npm run dev
```

Visit http://localhost:3000

## Production Build

```bash
npm run build
npm start
```

## Deployment on Railway

1. Push this code to GitHub
2. Connect repository on Railway
3. Set environment variables: `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. Railway auto-detects Node.js and deploys

## Project Structure

```
pages/              - Next.js pages
components/         - React components
styles/             - CSS stylesheets
public/             - Static files
```

## Connecting to Backend

Frontend calls backend API at `NEXT_PUBLIC_API_URL`

Google Analytics 4 loads when `NEXT_PUBLIC_GA_MEASUREMENT_ID` contains a valid web-stream ID beginning with `G-`. Keep Enhanced Measurement enabled in the GA4 web stream so client-side page changes are counted. The estimator also records quotation submissions, WhatsApp quotation clicks and PDF/print actions without sending names, phone numbers or email addresses to Analytics.

Endpoints:
- `GET /api/properties/` - List properties
- `GET /api/properties/{id}/` - Get property detail
- `POST /api/leads/` - Submit lead form
