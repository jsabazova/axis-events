// Pricing calculation logic for freight quotes

export interface PricingFactors {
  distance: number; // Distance in kilometers
  weight: number; // Weight in kg (estimated)
  volume: number; // Volume in cubic meters (estimated)
  hasForkliftAtPickup: boolean;
  liftCount: number; // Number of lifts required at destination
  eventForkliftCosts: {
    single: number;
    small: number;
    bulk: number;
  };
  isUrgent: boolean; // Same day or next day delivery
  requiresTailLift: boolean;
  isOversized: boolean;
}

export interface PricingBreakdown {
  baseFreight: number;
  distanceMultiplier: number;
  forkliftCostAtEvent: number;
  tailLiftSurcharge: number;
  urgentDeliverySurcharge: number;
  oversizedItemSurcharge: number;
  subtotal: number;
  gst: number;
  total: number;
}

// Base pricing constants
const PRICING_CONFIG = {
  // Base freight rates per cubic meter
  BASE_FREIGHT_RATE: 85, // $85 per cubic meter base rate

  // Distance-based multipliers
  DISTANCE_RATES: [
    { maxKm: 10, multiplier: 1.0 },    // Local: 0-10km
    { maxKm: 50, multiplier: 1.3 },    // Metro: 10-50km
    { maxKm: 150, multiplier: 1.8 },   // Regional: 50-150km
    { maxKm: 500, multiplier: 2.5 },   // Interstate: 150-500km
    { maxKm: Infinity, multiplier: 3.2 } // Long distance: 500km+
  ],

  // Surcharges
  TAIL_LIFT_SURCHARGE: 120, // Additional cost for truck with tailift
  URGENT_DELIVERY_MULTIPLIER: 1.5, // 50% surcharge for urgent delivery
  OVERSIZED_SURCHARGE: 250, // Additional cost for oversized items

  // GST rate
  GST_RATE: 0.1, // 10% GST

  // Minimum charges
  MIN_FREIGHT_CHARGE: 180, // Minimum freight charge
};

/**
 * Calculate distance multiplier based on distance
 */
function getDistanceMultiplier(distance: number): number {
  const rate = PRICING_CONFIG.DISTANCE_RATES.find(
    rate => distance <= rate.maxKm
  );
  return rate?.multiplier || PRICING_CONFIG.DISTANCE_RATES[PRICING_CONFIG.DISTANCE_RATES.length - 1].multiplier;
}

/**
 * Calculate forklift cost at event destination
 */
function calculateEventForkliftCost(
  liftCount: number,
  eventForkliftCosts: PricingFactors['eventForkliftCosts']
): number {
  if (liftCount === 0) return 0;

  if (liftCount === 1) {
    return eventForkliftCosts.single;
  } else if (liftCount >= 2 && liftCount <= 4) {
    return liftCount * eventForkliftCosts.small;
  } else if (liftCount >= 22) {
    return liftCount * eventForkliftCosts.bulk;
  } else {
    // 5-21 lifts - use small rate
    return liftCount * eventForkliftCosts.small;
  }
}

/**
 * Main pricing calculation function
 */
export function calculateFreightPricing(factors: PricingFactors): PricingBreakdown {
  // Calculate base freight based on volume
  const baseFreight = Math.max(
    factors.volume * PRICING_CONFIG.BASE_FREIGHT_RATE,
    PRICING_CONFIG.MIN_FREIGHT_CHARGE
  );

  // Calculate distance multiplier
  const distanceMultiplier = getDistanceMultiplier(factors.distance);

  // Calculate forklift cost at event
  const forkliftCostAtEvent = calculateEventForkliftCost(
    factors.liftCount,
    factors.eventForkliftCosts
  );

  // Calculate tailift surcharge (if no forklift at pickup)
  const tailLiftSurcharge = (!factors.hasForkliftAtPickup || factors.requiresTailLift)
    ? PRICING_CONFIG.TAIL_LIFT_SURCHARGE
    : 0;

  // Calculate oversized surcharge
  const oversizedItemSurcharge = factors.isOversized
    ? PRICING_CONFIG.OVERSIZED_SURCHARGE
    : 0;

  // Calculate base subtotal
  let subtotal = (baseFreight * distanceMultiplier) +
                 forkliftCostAtEvent +
                 tailLiftSurcharge +
                 oversizedItemSurcharge;

  // Apply urgent delivery surcharge
  const urgentDeliverySurcharge = factors.isUrgent
    ? subtotal * (PRICING_CONFIG.URGENT_DELIVERY_MULTIPLIER - 1)
    : 0;

  subtotal += urgentDeliverySurcharge;

  // Calculate GST
  const gst = subtotal * PRICING_CONFIG.GST_RATE;

  // Calculate total
  const total = subtotal + gst;

  return {
    baseFreight: Math.round(baseFreight * 100) / 100,
    distanceMultiplier: Math.round(distanceMultiplier * 100) / 100,
    forkliftCostAtEvent: Math.round(forkliftCostAtEvent * 100) / 100,
    tailLiftSurcharge: Math.round(tailLiftSurcharge * 100) / 100,
    urgentDeliverySurcharge: Math.round(urgentDeliverySurcharge * 100) / 100,
    oversizedItemSurcharge: Math.round(oversizedItemSurcharge * 100) / 100,
    subtotal: Math.round(subtotal * 100) / 100,
    gst: Math.round(gst * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

/**
 * Estimate volume based on typical freight dimensions
 */
export function estimateVolume(
  length: number,
  width: number,
  height: number,
  itemCount: number = 1
): number {
  return (length * width * height * itemCount) / 1000000; // Convert cm³ to m³
}

/**
 * Estimate distance between two addresses (mock implementation)
 * In production, this would integrate with Google Maps Distance Matrix API
 */
export function estimateDistance(
  pickupAddress: string,
  deliveryAddress: string
): number {
  // Mock distance calculation - in production use Google Maps API
  // For now, return a random distance based on address similarity
  const pickup = pickupAddress.toLowerCase();
  const delivery = deliveryAddress.toLowerCase();

  // Simple heuristic based on suburb names
  if (pickup.includes('melbourne') && delivery.includes('melbourne')) {
    return Math.random() * 30 + 5; // 5-35km for Melbourne metro
  } else if (pickup.includes('vic') && delivery.includes('vic')) {
    return Math.random() * 200 + 50; // 50-250km for Victorian regional
  } else {
    return Math.random() * 800 + 200; // 200-1000km for interstate
  }
}

/**
 * Get pricing tier description based on distance
 */
export function getPricingTier(distance: number): string {
  if (distance <= 10) return 'Local (0-10km)';
  if (distance <= 50) return 'Metro (10-50km)';
  if (distance <= 150) return 'Regional (50-150km)';
  if (distance <= 500) return 'Interstate (150-500km)';
  return 'Long Distance (500km+)';
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD'
  }).format(amount);
}