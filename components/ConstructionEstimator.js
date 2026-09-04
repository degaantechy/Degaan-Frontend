import axios from 'axios'
import { useMemo, useRef, useState } from 'react'

import { useLanguage } from '../contexts/LanguageContext'
import { API_BASE_URL } from '../lib/api'
import { calculateConstructionEstimate } from '../lib/constructionEstimator.mjs'

const COPY = {
  en: {
    steps: ['Project', 'Plot', 'Building', 'External works', 'Estimate'],
    projectTitle: 'What are you planning to build?',
    projectIntro: 'Choose the property and structural system. A masonry house is limited to one floor.',
    propertyType: 'Property type',
    house: 'Residential house',
    apartments: 'Apartments',
    commercial: 'Commercial building',
    structure: 'Structural system',
    masonry: 'One-floor masonry',
    masonryHelp: 'Load-bearing masonry for a single-floor home',
    rcc: 'RCC framed structure',
    rccHelp: 'Reinforced concrete frame for one or more floors',
    floors: 'Number of floors',
    floorsHelp: 'Choose 1 for ground floor only, 2 for G+1, and so on.',
    plotTitle: 'Tell us about your plot',
    plotIntro: 'Enter the frontage and depth, then mark every side that directly faces a road.',
    location: 'Project location',
    locationPlaceholder: 'For example, Hargeisa',
    plotWidth: 'Plot frontage / width',
    plotLength: 'Plot depth / length',
    metres: 'metres',
    roadSides: 'Which sides face a road?',
    roadHelp: 'This determines the decorative boundary length. Select at least one side.',
    front: 'Front',
    rear: 'Rear',
    left: 'Left',
    right: 'Right',
    boundaryHeight: 'Boundary-wall height',
    buildingTitle: 'Set the building size and rooms',
    buildingIntro: 'The construction price is calculated from floor area. Room counts are recorded for planning and feasibility.',
    groundArea: 'Ground-floor building area',
    upperArea: 'Area of each upper floor',
    rooms: 'Rooms and spaces',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    kitchens: 'Kitchens',
    livingRooms: 'Living / dining rooms',
    majlis: 'Majlis',
    staffRooms: 'Staff rooms',
    externalTitle: 'Choose external works and services',
    externalIntro: 'Only selected items are included in your preliminary estimate.',
    landscape: 'Landscaping area',
    paving: 'Outdoor paving area',
    tank: 'Underground water-tank volume',
    cubicMetres: 'm³',
    pergola: 'Pergola / parking-shade area',
    septic: 'Include fixed-price septic tank',
    standardGates: 'Standard gates',
    premiumGates: 'Premium gates',
    gateWidth: 'Average opening width per gate',
    design: 'Include design service',
    management: 'Include project-management service',
    reviewTitle: 'Your preliminary construction estimate',
    reviewIntro: 'Review the quantities and estimated cost before sending the project to Degaan.',
    preliminary: 'Preliminary estimate',
    plotArea: 'Plot area',
    buildingArea: 'Total building area',
    siteCoverage: 'Ground-floor site coverage',
    roadAccess: 'Road-facing sides',
    buildingWork: 'Building construction',
    boundaryWork: 'Boundary wall',
    landscaping: 'Landscaping',
    outdoorPaving: 'Outdoor paving',
    waterTank: 'Underground water tank',
    septicTank: 'Septic tank',
    gates: 'Gates',
    pergolaWork: 'Pergola / parking shade',
    mep: 'Plumbing & electrical allowance (10%)',
    designDeposit: 'Design service',
    projectManagement: 'Project management',
    total: 'Estimated project total',
    estimateNote: 'This is an indicative estimate, not a contract quotation. Final cost requires drawings, specifications, a site visit, soil review and confirmation of quantities. The 10% plumbing and electrical allowance is calculated on measured construction and external works.',
    yourDetails: 'Send this estimate to Degaan',
    name: 'Full name',
    phone: 'Phone / WhatsApp',
    email: 'Email address',
    namePlaceholder: 'Your name',
    phonePlaceholder: '+252…',
    emailPlaceholder: 'you@example.com',
    submit: 'Request official quotation',
    submitting: 'Sending…',
    sent: 'Your estimate has been sent. The Degaan team will contact you.',
    sendError: 'The website could not send the request. You can still send it through WhatsApp.',
    whatsapp: 'Send estimate on WhatsApp',
    print: 'Print / save PDF',
    back: 'Back',
    continue: 'Continue',
    viewEstimate: 'Calculate estimate',
    requiredPlot: 'Enter valid plot dimensions and select at least one road-facing side.',
    requiredBuilding: 'Enter a valid building area that does not exceed the plot area.',
    requiredUpper: 'Enter a valid upper-floor area that does not exceed the plot area.',
    outdoorTooLarge: 'Landscaping and paving cannot exceed the open plot area.',
    contactRequired: 'Enter your name, phone number and a valid email address.',
    liveTitle: 'Estimate summary',
    liveHint: 'Your estimate updates as you make selections.',
    notIncluded: 'Not selected',
    yes: 'Yes',
    no: 'No',
  },
  so: {
    steps: ['Mashruuca', 'Dhulka', 'Dhismaha', 'Shaqada bannaanka', 'Qiimaynta'],
    projectTitle: 'Maxaad qorshaynaysaa inaad dhisto?',
    projectIntro: 'Dooro nooca hantida iyo qaab-dhismeedka. Guriga masonry-gu wuxuu ku egyahay hal dabaq.',
    propertyType: 'Nooca hantida',
    house: 'Guri degaan',
    apartments: 'Guryo dabaqyo ah',
    commercial: 'Dhisme ganacsi',
    structure: 'Qaab-dhismeedka',
    masonry: 'Masonry hal dabaq ah',
    masonryHelp: 'Masonry culays qaada oo loogu talagalay guri hal dabaq ah',
    rcc: 'Qaab-dhismeed RCC ah',
    rccHelp: 'Qaab shub RCC ah oo loogu talagalay hal dabaq ama dabaqyo badan',
    floors: 'Tirada dabaqyada',
    floorsHelp: 'Dooro 1 haddii uu yahay dabaqa hoose oo keliya, 2 haddii uu yahay G+1, iyo wixii la mid ah.',
    plotTitle: 'Faahfaahinta dhulka',
    plotIntro: 'Geli ballaca hore iyo dhererka dhulka, kadibna calaamadee dhinac kasta oo waddo ku jeeda.',
    location: 'Goobta mashruuca',
    locationPlaceholder: 'Tusaale, Hargeysa',
    plotWidth: 'Ballaca hore ee dhulka',
    plotLength: 'Dhererka dhulka',
    metres: 'mitir',
    roadSides: 'Dhinacyadee waddo ku jeeda?',
    roadHelp: 'Tani waxay go’aaminaysaa gidaarka qurxinta leh. Dooro ugu yaraan hal dhinac.',
    front: 'Hore',
    rear: 'Dambe',
    left: 'Bidix',
    right: 'Midig',
    boundaryHeight: 'Dhererka gidaarka dayrka',
    buildingTitle: 'Geli cabbirka dhismaha iyo qolalka',
    buildingIntro: 'Qiimaha dhismaha waxaa lagu xisaabinayaa bedka dabaqyada. Tirada qolalka waxaa loo kaydinayaa qorshaynta.',
    groundArea: 'Bedka dabaqa hoose',
    upperArea: 'Bedka dabaq kasta oo sare',
    rooms: 'Qolalka iyo qaybaha',
    bedrooms: 'Qolalka jiifka',
    bathrooms: 'Musqulaha',
    kitchens: 'Jikooyinka',
    livingRooms: 'Fadhiga / cuntada',
    majlis: 'Majlis',
    staffRooms: 'Qolalka shaqaalaha',
    externalTitle: 'Dooro shaqooyinka iyo adeegyada bannaanka',
    externalIntro: 'Waxyaabaha aad doorato oo keliya ayaa lagu darayaa qiimaynta hordhaca ah.',
    landscape: 'Bedka beerista',
    paving: 'Bedka sagxadda bannaanka',
    tank: 'Mugga haanta biyaha dhulka hoostiisa',
    cubicMetres: 'm³',
    pergola: 'Bedka pergola / hadhka baabuurta',
    septic: 'Ku dar septic tank-ka qiimaha go’an',
    standardGates: 'Albaabbada caadiga ah',
    premiumGates: 'Albaabbada tayada sare leh',
    gateWidth: 'Celceliska ballaca albaab kasta',
    design: 'Ku dar adeegga naqshadda',
    management: 'Ku dar adeegga maamulka mashruuca',
    reviewTitle: 'Qiyaasta hordhaca ah ee dhismahaaga',
    reviewIntro: 'Hubi cabbirrada iyo qiimaha ka hor inta aan mashruuca loo dirin Degaan.',
    preliminary: 'Qiyaas hordhac ah',
    plotArea: 'Bedka dhulka',
    buildingArea: 'Wadarta bedka dhismaha',
    siteCoverage: 'Boqolkiiba dhulka uu daboolayo dabaqa hoose',
    roadAccess: 'Dhinacyada waddooyinka',
    buildingWork: 'Dhismaha guriga',
    boundaryWork: 'Gidaarka dayrka',
    landscaping: 'Beerista bannaanka',
    outdoorPaving: 'Sagxadda bannaanka',
    waterTank: 'Haanta biyaha dhulka hoostiisa',
    septicTank: 'Septic tank',
    gates: 'Albaabbada',
    pergolaWork: 'Pergola / hadhka baabuurta',
    mep: 'Qiyaasta tuubooyinka iyo korontada (10%)',
    designDeposit: 'Adeegga naqshadda',
    projectManagement: 'Maamulka mashruuca',
    total: 'Wadarta qiimaha la qiyaasay',
    estimateNote: 'Tani waa qiyaas hordhac ah, mana aha qiime qandaraas. Qiimaha kama dambaysta ahi wuxuu u baahan yahay naqshado, qeexitaan, booqasho goobta, hubinta ciidda iyo xaqiijinta cabbirrada. Qiyaasta 10% ee tuubooyinka iyo korontada waxaa laga xisaabiyey shaqada dhismaha iyo bannaanka.',
    yourDetails: 'U dir qiimayntan Degaan',
    name: 'Magaca oo buuxa',
    phone: 'Telefoon / WhatsApp',
    email: 'Cinwaanka iimaylka',
    namePlaceholder: 'Magacaaga',
    phonePlaceholder: '+252…',
    emailPlaceholder: 'adiga@example.com',
    submit: 'Codso qiime rasmi ah',
    submitting: 'Waa la dirayaa…',
    sent: 'Qiimaynta waa la diray. Kooxda Degaan ayaa kula soo xidhiidhi doonta.',
    sendError: 'Codsiga website-ku ma dirin. Weli waxaad ku diri kartaa WhatsApp.',
    whatsapp: 'Qiimaynta ku dir WhatsApp',
    print: 'Daabac / PDF kaydi',
    back: 'Dib u noqo',
    continue: 'Sii wad',
    viewEstimate: 'Xisaabi qiimaha',
    requiredPlot: 'Geli cabbir dhul oo sax ah, doorona ugu yaraan hal dhinac oo waddo ku jeeda.',
    requiredBuilding: 'Geli bed dhisme oo sax ah kana yar bedka dhulka.',
    requiredUpper: 'Geli bed sax ah oo dabaqa sare ah kana yar bedka dhulka.',
    outdoorTooLarge: 'Bedka beerista iyo sagxaddu kama badnaan karaan bannaanka dhulka.',
    contactRequired: 'Geli magaca, telefoonka iyo cinwaan iimayl oo sax ah.',
    liveTitle: 'Soo koobidda qiimaynta',
    liveHint: 'Qiimuhu wuu is beddelayaa marka aad wax doorato.',
    notIncluded: 'Lama dooran',
    yes: 'Haa',
    no: 'Maya',
  },
}

const INITIAL_VALUES = {
  propertyType: 'house',
  structure: 'masonry',
  floors: 1,
  location: 'Hargeisa',
  plotWidth: 9,
  plotLength: 24,
  roadSides: ['front'],
  boundaryHeight: 2.4,
  groundFloorArea: 140,
  upperFloorArea: 140,
  bedrooms: 3,
  bathrooms: 3,
  kitchens: 1,
  livingRooms: 1,
  majlis: 1,
  staffRooms: 1,
  landscapingArea: 25,
  pavingArea: 35,
  tankVolume: 12,
  pergolaArea: 0,
  includeSeptic: true,
  standardGates: 1,
  premiumGates: 0,
  gateWidth: 4,
  includeDesign: true,
  includeProjectManagement: false,
}

const ROAD_SIDES = ['front', 'rear', 'left', 'right']

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const number = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
})

function NumberField({ label, value, onChange, suffix, min = 0, max, step = 1 }) {
  return (
    <label className="estimator-field">
      <span>{label}</span>
      <span className="estimator-input-wrap">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          inputMode="decimal"
          onChange={(event) => onChange(event.target.value)}
        />
        {suffix && <small>{suffix}</small>}
      </span>
    </label>
  )
}

function Choice({ selected, title, description, onClick }) {
  return (
    <button
      type="button"
      className={`estimator-choice ${selected ? 'selected' : ''}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      <span className="estimator-choice-check" aria-hidden="true">{selected ? '✓' : ''}</span>
      <strong>{title}</strong>
      {description && <small>{description}</small>}
    </button>
  )
}

export default function ConstructionEstimator() {
  const { language } = useLanguage()
  const c = COPY[language] || COPY.en
  const [step, setStep] = useState(0)
  const [values, setValues] = useState(INITIAL_VALUES)
  const [error, setError] = useState('')
  const [contact, setContact] = useState({ name: '', phone: '', email: '' })
  const [submitState, setSubmitState] = useState('idle')
  const topRef = useRef(null)

  const estimate = useMemo(
    () => calculateConstructionEstimate(values),
    [values]
  )

  const setValue = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }))
    setError('')
  }

  const chooseStructure = (structure) => {
    setValues((current) => ({
      ...current,
      structure,
      propertyType: structure === 'masonry' && current.propertyType === 'apartments'
        ? 'house'
        : current.propertyType,
      floors: structure === 'masonry' ? 1 : Math.max(1, Number(current.floors)),
    }))
    setError('')
  }

  const choosePropertyType = (propertyType) => {
    setValues((current) => ({
      ...current,
      propertyType,
      structure: propertyType === 'apartments' ? 'rcc' : current.structure,
      floors: propertyType === 'apartments'
        ? Math.max(2, Number(current.floors))
        : current.floors,
    }))
    setError('')
  }

  const toggleRoadSide = (side) => {
    setValues((current) => ({
      ...current,
      roadSides: current.roadSides.includes(side)
        ? current.roadSides.filter((item) => item !== side)
        : [...current.roadSides, side],
    }))
    setError('')
  }

  const validateCurrentStep = () => {
    if (step === 1) {
      if (estimate.plotArea <= 0 || values.roadSides.length === 0) return c.requiredPlot
    }

    if (step === 2) {
      if (Number(values.groundFloorArea) <= 0 || Number(values.groundFloorArea) > estimate.plotArea) {
        return c.requiredBuilding
      }
      if (estimate.floors > 1 && (
        Number(values.upperFloorArea) <= 0 || Number(values.upperFloorArea) > estimate.plotArea
      )) {
        return c.requiredUpper
      }
    }

    if (step === 3) {
      const availableOutdoorArea = Math.max(0, estimate.plotArea - Number(values.groundFloorArea || 0))
      if (Number(values.landscapingArea || 0) + Number(values.pavingArea || 0) > availableOutdoorArea) {
        return c.outdoorTooLarge
      }
    }

    return ''
  }

  const moveToStep = (nextStep) => {
    const validationError = nextStep > step ? validateCurrentStep() : ''
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    setStep(Math.max(0, Math.min(c.steps.length - 1, nextStep)))
    window.requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const selectedRoads = values.roadSides.map((side) => c[side]).join(', ')
  const costRows = [
    [c.buildingWork, estimate.buildingCost],
    [c.boundaryWork, estimate.boundaryCost],
    [c.landscaping, estimate.landscapingCost],
    [c.outdoorPaving, estimate.pavingCost],
    [c.waterTank, estimate.waterTankCost],
    [c.septicTank, estimate.septicTankCost],
    [c.gates, estimate.gatesCost],
    [c.pergolaWork, estimate.pergolaCost],
    [c.mep, estimate.mepAllowance],
    [c.designDeposit, estimate.designDeposit],
    [c.projectManagement, estimate.projectManagement],
  ]

  const summaryMessage = [
    'Degaan Construction Estimate',
    `${c.location}: ${values.location || '-'}`,
    `${c.propertyType}: ${c[values.propertyType]}`,
    `${c.structure}: ${c[values.structure]}`,
    `${c.plotArea}: ${number.format(estimate.plotArea)} m²`,
    `${c.buildingArea}: ${number.format(estimate.totalBuildingArea)} m²`,
    `${c.floors}: ${estimate.floors}`,
    `${c.roadAccess}: ${selectedRoads}`,
    `${c.rooms}: ${c.bedrooms} ${values.bedrooms}; ${c.bathrooms} ${values.bathrooms}; ${c.kitchens} ${values.kitchens}; ${c.livingRooms} ${values.livingRooms}; ${c.majlis} ${values.majlis}; ${c.staffRooms} ${values.staffRooms}`,
    `${c.landscape}: ${values.landscapingArea || 0} m²; ${c.paving}: ${values.pavingArea || 0} m²; ${c.tank}: ${values.tankVolume || 0} m³; ${c.pergola}: ${values.pergolaArea || 0} m²`,
    `${c.gates}: ${c.standardGates} ${values.standardGates || 0}; ${c.premiumGates} ${values.premiumGates || 0}; ${c.septicTank}: ${values.includeSeptic ? c.yes : c.no}`,
    `${c.total}: ${money.format(estimate.estimatedTotal)}`,
    `${c.name}: ${contact.name || '-'}`,
    `${c.phone}: ${contact.phone || '-'}`,
  ].join('\n')

  const whatsappUrl = `https://wa.me/252638888250?text=${encodeURIComponent(summaryMessage)}`

  const submitEstimate = async (event) => {
    event.preventDefault()
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
    if (!contact.name.trim() || !contact.phone.trim() || !validEmail) {
      setError(c.contactRequired)
      return
    }

    setSubmitState('submitting')
    setError('')
    try {
      await axios.post(`${API_BASE_URL}/api/leads/`, {
        name: contact.name.trim(),
        phone: contact.phone.trim(),
        email: contact.email.trim(),
        interest_type: 'construction',
        message: summaryMessage,
      })
      setSubmitState('sent')
    } catch (submissionError) {
      console.error('Construction estimate submission failed:', submissionError)
      setSubmitState('error')
    }
  }

  return (
    <div className="estimator-shell" ref={topRef}>
      <div className="estimator-progress" aria-label={`${step + 1} / ${c.steps.length}`}>
        {c.steps.map((label, index) => (
          <div
            key={label}
            className={`estimator-progress-step ${index === step ? 'active' : ''} ${index < step ? 'complete' : ''}`}
          >
            <span>{index < step ? '✓' : index + 1}</span>
            <small>{label}</small>
          </div>
        ))}
      </div>

      <div className="estimator-layout">
        <section className="estimator-panel">
          {step === 0 && (
            <div className="estimator-step">
              <p className="section-kicker">01 · {c.steps[0]}</p>
              <h2>{c.projectTitle}</h2>
              <p className="estimator-intro">{c.projectIntro}</p>

              <fieldset className="estimator-fieldset">
                <legend>{c.propertyType}</legend>
                <div className="estimator-choice-grid three">
                  {['house', 'apartments', 'commercial'].map((type) => (
                    <Choice
                      key={type}
                      selected={values.propertyType === type}
                      title={c[type]}
                      onClick={() => choosePropertyType(type)}
                    />
                  ))}
                </div>
              </fieldset>

              <fieldset className="estimator-fieldset">
                <legend>{c.structure}</legend>
                <div className="estimator-choice-grid">
                  <Choice
                    selected={values.structure === 'masonry'}
                    title={c.masonry}
                    description={c.masonryHelp}
                    onClick={() => chooseStructure('masonry')}
                  />
                  <Choice
                    selected={values.structure === 'rcc'}
                    title={c.rcc}
                    description={c.rccHelp}
                    onClick={() => chooseStructure('rcc')}
                  />
                </div>
              </fieldset>

              {values.structure === 'rcc' && (
                <div className="estimator-field-block">
                  <NumberField
                    label={c.floors}
                    value={values.floors}
                    min={1}
                    max={12}
                    onChange={(value) => setValue('floors', Math.max(1, Math.floor(Number(value || 1))))}
                  />
                  <p className="estimator-help">{c.floorsHelp}</p>
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="estimator-step">
              <p className="section-kicker">02 · {c.steps[1]}</p>
              <h2>{c.plotTitle}</h2>
              <p className="estimator-intro">{c.plotIntro}</p>

              <label className="estimator-field full">
                <span>{c.location}</span>
                <input
                  type="text"
                  value={values.location}
                  placeholder={c.locationPlaceholder}
                  onChange={(event) => setValue('location', event.target.value)}
                />
              </label>

              <div className="estimator-fields-grid">
                <NumberField
                  label={c.plotWidth}
                  value={values.plotWidth}
                  suffix={c.metres}
                  min={1}
                  step={0.1}
                  onChange={(value) => setValue('plotWidth', value)}
                />
                <NumberField
                  label={c.plotLength}
                  value={values.plotLength}
                  suffix={c.metres}
                  min={1}
                  step={0.1}
                  onChange={(value) => setValue('plotLength', value)}
                />
                <NumberField
                  label={c.boundaryHeight}
                  value={values.boundaryHeight}
                  suffix={c.metres}
                  min={1}
                  step={0.1}
                  onChange={(value) => setValue('boundaryHeight', value)}
                />
              </div>

              <fieldset className="estimator-fieldset">
                <legend>{c.roadSides}</legend>
                <p className="estimator-help">{c.roadHelp}</p>
                <div className="road-selector">
                  {ROAD_SIDES.map((side) => (
                    <button
                      key={side}
                      type="button"
                      className={values.roadSides.includes(side) ? 'selected' : ''}
                      aria-pressed={values.roadSides.includes(side)}
                      onClick={() => toggleRoadSide(side)}
                    >
                      <span aria-hidden="true">{values.roadSides.includes(side) ? '✓' : '+'}</span>
                      {c[side]}
                    </button>
                  ))}
                  <div className="road-plot" aria-hidden="true">
                    <span>{number.format(estimate.plotArea)} m²</span>
                  </div>
                </div>
              </fieldset>
            </div>
          )}

          {step === 2 && (
            <div className="estimator-step">
              <p className="section-kicker">03 · {c.steps[2]}</p>
              <h2>{c.buildingTitle}</h2>
              <p className="estimator-intro">{c.buildingIntro}</p>

              <div className="estimator-fields-grid">
                <NumberField
                  label={c.groundArea}
                  value={values.groundFloorArea}
                  suffix="m²"
                  min={1}
                  step={1}
                  onChange={(value) => setValue('groundFloorArea', value)}
                />
                {estimate.floors > 1 && (
                  <NumberField
                    label={c.upperArea}
                    value={values.upperFloorArea}
                    suffix="m²"
                    min={1}
                    step={1}
                    onChange={(value) => setValue('upperFloorArea', value)}
                  />
                )}
              </div>

              <fieldset className="estimator-fieldset">
                <legend>{c.rooms}</legend>
                <div className="estimator-fields-grid three">
                  {['bedrooms', 'bathrooms', 'kitchens', 'livingRooms', 'majlis', 'staffRooms'].map((room) => (
                    <NumberField
                      key={room}
                      label={c[room]}
                      value={values[room]}
                      min={0}
                      max={50}
                      onChange={(value) => setValue(room, Math.max(0, Math.floor(Number(value || 0))))}
                    />
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          {step === 3 && (
            <div className="estimator-step">
              <p className="section-kicker">04 · {c.steps[3]}</p>
              <h2>{c.externalTitle}</h2>
              <p className="estimator-intro">{c.externalIntro}</p>

              <div className="estimator-fields-grid">
                <NumberField label={c.landscape} value={values.landscapingArea} suffix="m²" onChange={(value) => setValue('landscapingArea', value)} />
                <NumberField label={c.paving} value={values.pavingArea} suffix="m²" onChange={(value) => setValue('pavingArea', value)} />
                <NumberField label={c.tank} value={values.tankVolume} suffix={c.cubicMetres} onChange={(value) => setValue('tankVolume', value)} />
                <NumberField label={c.pergola} value={values.pergolaArea} suffix="m²" onChange={(value) => setValue('pergolaArea', value)} />
                <NumberField label={c.standardGates} value={values.standardGates} min={0} max={8} onChange={(value) => setValue('standardGates', Math.max(0, Math.floor(Number(value || 0))))} />
                <NumberField label={c.premiumGates} value={values.premiumGates} min={0} max={8} onChange={(value) => setValue('premiumGates', Math.max(0, Math.floor(Number(value || 0))))} />
                <NumberField label={c.gateWidth} value={values.gateWidth} suffix={c.metres} min={1} step={0.1} onChange={(value) => setValue('gateWidth', value)} />
              </div>

              <div className="estimator-toggles">
                {[
                  ['includeSeptic', c.septic],
                  ['includeDesign', c.design],
                  ['includeProjectManagement', c.management],
                ].map(([key, label]) => (
                  <label key={key} className="estimator-toggle">
                    <input
                      type="checkbox"
                      checked={values[key]}
                      onChange={(event) => setValue(key, event.target.checked)}
                    />
                    <span aria-hidden="true" />
                    <strong>{label}</strong>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="estimator-step estimate-review">
              <p className="section-kicker">05 · {c.steps[4]}</p>
              <h2>{c.reviewTitle}</h2>
              <p className="estimator-intro">{c.reviewIntro}</p>

              <div className="estimate-project-facts">
                <div><span>{c.plotArea}</span><strong>{number.format(estimate.plotArea)} m²</strong></div>
                <div><span>{c.buildingArea}</span><strong>{number.format(estimate.totalBuildingArea)} m²</strong></div>
                <div><span>{c.siteCoverage}</span><strong>{number.format(estimate.siteCoverage)}%</strong></div>
                <div><span>{c.roadAccess}</span><strong>{selectedRoads}</strong></div>
              </div>

              <div className="estimate-cost-table">
                {costRows.filter(([, amount]) => amount > 0).map(([label, amount]) => (
                  <div key={label}><span>{label}</span><strong>{money.format(amount)}</strong></div>
                ))}
                <div className="estimate-total"><span>{c.total}</span><strong>{money.format(estimate.estimatedTotal)}</strong></div>
              </div>

              <p className="estimate-disclaimer">{c.estimateNote}</p>

              <form className="estimate-contact" onSubmit={submitEstimate}>
                <h3>{c.yourDetails}</h3>
                <div className="estimator-fields-grid">
                  <label className="estimator-field">
                    <span>{c.name}</span>
                    <input type="text" value={contact.name} placeholder={c.namePlaceholder} onChange={(event) => setContact((current) => ({ ...current, name: event.target.value }))} />
                  </label>
                  <label className="estimator-field">
                    <span>{c.phone}</span>
                    <input type="tel" value={contact.phone} placeholder={c.phonePlaceholder} onChange={(event) => setContact((current) => ({ ...current, phone: event.target.value }))} />
                  </label>
                  <label className="estimator-field full">
                    <span>{c.email}</span>
                    <input type="email" value={contact.email} placeholder={c.emailPlaceholder} onChange={(event) => setContact((current) => ({ ...current, email: event.target.value }))} />
                  </label>
                </div>

                {submitState === 'sent' && <p className="estimate-status success" role="status">{c.sent}</p>}
                {submitState === 'error' && <p className="estimate-status error" role="alert">{c.sendError}</p>}

                <div className="estimate-actions">
                  <button className="btn-primary" type="submit" disabled={submitState === 'submitting'}>
                    {submitState === 'submitting' ? c.submitting : c.submit}
                  </button>
                  <a className="btn-secondary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">{c.whatsapp}</a>
                  <button className="estimator-print" type="button" onClick={() => window.print()}>{c.print}</button>
                </div>
              </form>
            </div>
          )}

          {error && <p className="estimator-error" role="alert">{error}</p>}

          <div className="estimator-navigation">
            {step > 0 ? <button type="button" className="estimator-back" onClick={() => moveToStep(step - 1)}>← {c.back}</button> : <span />}
            {step < c.steps.length - 1 && (
              <button type="button" className="btn-primary" onClick={() => moveToStep(step + 1)}>
                {step === c.steps.length - 2 ? c.viewEstimate : c.continue} →
              </button>
            )}
          </div>
        </section>

        <aside className="estimator-summary" aria-live="polite">
          <p className="section-kicker">{c.preliminary}</p>
          <h2>{c.liveTitle}</h2>
          <p>{c.liveHint}</p>
          <dl>
            <div><dt>{c.plotArea}</dt><dd>{number.format(estimate.plotArea)} m²</dd></div>
            <div><dt>{c.buildingArea}</dt><dd>{number.format(estimate.totalBuildingArea)} m²</dd></div>
            <div><dt>{c.structure}</dt><dd>{c[values.structure]}</dd></div>
            <div><dt>{c.roadAccess}</dt><dd>{values.roadSides.length}</dd></div>
          </dl>
          <div className="estimator-summary-total">
            <span>{c.total}</span>
            <strong>{money.format(estimate.estimatedTotal)}</strong>
          </div>
        </aside>
      </div>
    </div>
  )
}
