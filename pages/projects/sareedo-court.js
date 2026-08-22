import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const features = [
  'Four spacious bedrooms',
  'Three modern bathrooms',
  'Private domestic staff quarters',
  'Fully equipped kitchen',
  'Solar water-heating system',
  'Landscaped outdoor spaces',
  'Fridge and microwave included',
  'Two-road access and enhanced privacy',
  'Pergola and family outdoor seating'
]

export default function SareedoCourt() {
  return (
    <>
      <Head>
        <title>Sareedo Court | Degaan Real Estate</title>
        <meta
          name="description"
          content="Explore Sareedo Court: affordable four-bedroom family homes in Masala with three bathrooms, a private DSQ, solar water heating and landscaped outdoor spaces."
        />
        <meta property="og:title" content="Sareedo Court | Degaan Real Estate" />
        <meta
          property="og:description"
          content="Modern four-bedroom family homes, launching February 2027 from USD 63.4K."
        />
        <meta property="og:image" content="/images/projects/sareedo-court/residence.webp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <article className="project-page">
        <header className="project-hero">
          <div className="container project-hero-content">
            <div className="project-hero-copy">
              <Link href="/#projects" className="project-back-link">← Our projects</Link>
              <p className="section-kicker">Upcoming residential development</p>
              <h1>Sareedo Court</h1>
              <p className="project-lead">
                A private collection of affordable, high-finish homes designed for family comfort,
                everyday convenience and long-term value.
              </p>
              <div className="project-hero-actions">
                <Link href="/contact?project=sareedo-court" className="btn-primary">Register Interest</Link>
                <a
                  href="https://wa.me/252638888250"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>

            <dl className="project-hero-facts">
              <div>
                <dt>Location</dt>
                <dd>Masala, behind UNICEF Office</dd>
              </div>
              <div>
                <dt>Launch</dt>
                <dd>February 2027</dd>
              </div>
              <div>
                <dt>Starting price</dt>
                <dd>USD 63.4K</dd>
              </div>
              <div>
                <dt>Target completion</dt>
                <dd>December 2027</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="project-hero-image-wrap">
          <Image
            src="/images/projects/sareedo-court/residence.webp"
            alt="Front exterior render of a Sareedo Court residence"
            width={1448}
            height={1086}
            className="project-hero-image"
            priority
            sizes="100vw"
          />
        </div>

        <section className="project-overview">
          <div className="container project-overview-grid">
            <div>
              <p className="section-kicker">The development</p>
              <h2>Modern family living, thoughtfully planned</h2>
            </div>
            <div className="project-overview-copy">
              <p>
                Each Sareedo Court residence combines generous living spaces with practical family
                features. The development is currently in planning, design and market-insight stages.
              </p>
              <dl className="project-specs">
                <div>
                  <dt>Home type</dt>
                  <dd>Affordable residential house</dd>
                </div>
                <div>
                  <dt>Plot size</dt>
                  <dd>12 × 24 m</dd>
                </div>
                <div>
                  <dt>Bedrooms</dt>
                  <dd>4 + private DSQ</dd>
                </div>
                <div>
                  <dt>Bathrooms</dt>
                  <dd>3</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="project-features-section">
          <div className="container">
            <div className="section-heading section-heading-split">
              <div>
                <p className="section-kicker">Included</p>
                <h2>Comfort in every detail</h2>
              </div>
              <p>Essential features are integrated into every home from the outset.</p>
            </div>
            <ul className="project-features-grid">
              {features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>
        </section>

        <section className="project-gallery-section">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Project gallery</p>
              <h2>Site arrangement and floor plan</h2>
            </div>

            <figure className="project-gallery-feature">
              <Image
                src="/images/projects/sareedo-court/site-plan.webp"
                alt="Aerial site arrangement showing eight Sareedo Court homes"
                width={1536}
                height={1024}
                className="project-gallery-image"
                sizes="(max-width: 1180px) 100vw, 1180px"
              />
              <figcaption>Eight-home site arrangement with private plots and two-road access.</figcaption>
            </figure>

            <figure className="project-floor-plan">
              <div className="project-floor-plan-copy">
                <p className="section-kicker">Residence plan</p>
                <h3>Clear, functional family spaces</h3>
                <p>
                  A practical layout centred on spacious living, private bedrooms and efficient circulation.
                </p>
              </div>
              <Image
                src="/images/projects/sareedo-court/floor-plan.webp"
                alt="Sareedo Court residence floor plan"
                width={1191}
                height={1320}
                className="project-floor-plan-image"
                sizes="(max-width: 800px) 100vw, 55vw"
              />
            </figure>
          </div>
        </section>

        <section className="project-enquiry">
          <div className="container project-enquiry-inner">
            <div>
              <p className="section-kicker">Sareedo Court</p>
              <h2>Register for project updates</h2>
              <p>Receive availability, launch and reservation information from our team.</p>
            </div>
            <Link href="/contact?project=sareedo-court" className="btn-primary">Register Interest</Link>
          </div>
        </section>
      </article>
    </>
  )
}
