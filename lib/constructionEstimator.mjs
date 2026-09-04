export const CONSTRUCTION_RATES = Object.freeze({
  masonryGround: 190,
  rccGround: 450,
  rccUpper: 350,
  boundaryStandardPerLinearMetre: 150,
  boundaryDecorativeAddOn: 180,
  landscaping: 18,
  paving: 100,
  undergroundWaterTank: 300,
  septicTank: 3000,
  gateStandard: 1200,
  gatePremium: 1800,
  pergola: 230,
  designDeposit: 2500,
  projectManagement: 2500,
  mepAllowanceRate: 0.1,
})

const numberValue = (value) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

const wholeNumberValue = (value) => Math.max(0, Math.floor(numberValue(value)))

export function getRoadFacingLength({
  plotWidth,
  plotLength,
  roadSides = [],
}) {
  const width = numberValue(plotWidth)
  const length = numberValue(plotLength)

  return roadSides.reduce((total, side) => {
    if (side === 'front' || side === 'rear') return total + width
    if (side === 'left' || side === 'right') return total + length
    return total
  }, 0)
}

export function calculateConstructionEstimate(values, rates = CONSTRUCTION_RATES) {
  const plotWidth = numberValue(values.plotWidth)
  const plotLength = numberValue(values.plotLength)
  const boundaryHeight = numberValue(values.boundaryHeight)
  const groundFloorArea = numberValue(values.groundFloorArea)
  const floors = values.structure === 'masonry'
    ? 1
    : Math.max(1, wholeNumberValue(values.floors))
  const upperFloorArea = floors > 1 ? numberValue(values.upperFloorArea) : 0
  const upperFloorCount = Math.max(0, floors - 1)

  const plotArea = plotWidth * plotLength
  const totalBuildingArea = groundFloorArea + (upperFloorArea * upperFloorCount)
  const groundFloorCost = groundFloorArea * (
    values.structure === 'masonry' ? rates.masonryGround : rates.rccGround
  )
  const upperFloorsCost = upperFloorArea * upperFloorCount * rates.rccUpper
  const buildingCost = groundFloorCost + upperFloorsCost

  const perimeter = 2 * (plotWidth + plotLength)
  const roadFacingLength = Math.min(
    perimeter,
    getRoadFacingLength({ plotWidth, plotLength, roadSides: values.roadSides })
  )
  const standardGates = wholeNumberValue(values.standardGates)
  const premiumGates = wholeNumberValue(values.premiumGates)
  const gateCount = standardGates + premiumGates
  const gateOpeningWidth = Math.min(
    roadFacingLength,
    gateCount * numberValue(values.gateWidth)
  )
  const decorativeBoundaryLength = Math.max(0, roadFacingLength - gateOpeningWidth)
  const netBoundaryLength = Math.max(0, perimeter - gateOpeningWidth)
  const decorativeBoundaryArea = decorativeBoundaryLength * boundaryHeight
  const boundaryCost = (
    netBoundaryLength * rates.boundaryStandardPerLinearMetre
  ) + (
    decorativeBoundaryArea * rates.boundaryDecorativeAddOn
  )

  const landscapingArea = numberValue(values.landscapingArea)
  const pavingArea = numberValue(values.pavingArea)
  const tankVolume = numberValue(values.tankVolume)
  const pergolaArea = numberValue(values.pergolaArea)
  const landscapingCost = landscapingArea * rates.landscaping
  const pavingCost = pavingArea * rates.paving
  const waterTankCost = tankVolume * rates.undergroundWaterTank
  const septicTankCost = values.includeSeptic ? rates.septicTank : 0
  const gatesCost = (
    standardGates * rates.gateStandard
  ) + (
    premiumGates * rates.gatePremium
  )
  const pergolaCost = pergolaArea * rates.pergola

  const measuredWorksSubtotal = (
    buildingCost
    + boundaryCost
    + landscapingCost
    + pavingCost
    + waterTankCost
    + septicTankCost
    + gatesCost
    + pergolaCost
  )
  const mepAllowance = measuredWorksSubtotal * rates.mepAllowanceRate
  const designDeposit = values.includeDesign ? rates.designDeposit : 0
  const projectManagement = values.includeProjectManagement ? rates.projectManagement : 0
  const estimatedTotal = (
    measuredWorksSubtotal
    + mepAllowance
    + designDeposit
    + projectManagement
  )

  return {
    plotArea,
    siteCoverage: plotArea > 0 ? (groundFloorArea / plotArea) * 100 : 0,
    totalBuildingArea,
    floors,
    upperFloorCount,
    groundFloorCost,
    upperFloorsCost,
    buildingCost,
    perimeter,
    roadFacingLength,
    netBoundaryLength,
    decorativeBoundaryArea,
    boundaryCost,
    landscapingCost,
    pavingCost,
    waterTankCost,
    septicTankCost,
    gatesCost,
    pergolaCost,
    measuredWorksSubtotal,
    mepAllowance,
    designDeposit,
    projectManagement,
    estimatedTotal,
  }
}
