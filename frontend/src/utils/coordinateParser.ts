/**
 * Coordinate Parser Utility
 * Single Responsibility: Parse coordinates from various formats
 * Open/Closed: Can be extended with new formats without modifying existing code
 */

export interface ParsedCoordinates {
  lat: number;
  lng: number;
}

/**
 * Converts DMS (Degrees, Minutes, Seconds) to decimal degrees
 */
export function parseDMS(dmsString: string): number | null {
  const trimmed = dmsString.trim();
  
  // Try pattern with direction at end: 14°01'12.3"S
  let dmsRegex = /(-?\d+)[°\s]+(\d+)['\s]+([\d.]+)["\s]*([NSEW])/i;
  let match = trimmed.match(dmsRegex);
  
  if (!match) {
    // Try pattern without explicit direction, use sign: -14°01'12.3"
    dmsRegex = /(-?\d+)[°\s]+(\d+)['\s]+([\d.]+)["\s]*/;
    match = trimmed.match(dmsRegex);
  }
  
  if (!match) return null;
  
  const degrees = parseFloat(match[1]);
  const minutes = parseFloat(match[2]);
  const seconds = parseFloat(match[3]);
  const direction = match[4] ? match[4].toUpperCase() : '';
  
  // Convert to decimal degrees
  let decimal = Math.abs(degrees) + minutes / 60 + seconds / 3600;
  
  // Apply sign based on direction or original sign
  if (direction === 'S' || direction === 'W') {
    decimal = -decimal;
  } else if (direction === 'N' || direction === 'E') {
    decimal = Math.abs(decimal);
  } else if (degrees < 0) {
    decimal = -decimal;
  }
  
  return decimal;
}

/**
 * Parse coordinates from various formats (decimal, DMS, mixed)
 */
export function parseCoordinates(coordString: string): ParsedCoordinates | null {
  const trimmed = coordString.trim();
  
  // Try DMS format first (e.g., "14°01'12.3"S 33°48'05.0"E")
  const dmsPattern = /(-?\d+[°\s]+\d+['\s]+[\d.]+["\s]*[NSEW]?)\s*[,]?\s*(-?\d+[°\s]+\d+['\s]+[\d.]+["\s]*[NSEW]?)/i;
  const dmsMatch = trimmed.match(dmsPattern);
  
  if (dmsMatch) {
    const firstDMS = parseDMS(dmsMatch[1]);
    const secondDMS = parseDMS(dmsMatch[2]);
    
    if (firstDMS !== null && secondDMS !== null) {
      return determineLatLng(firstDMS, secondDMS, dmsMatch[1], dmsMatch[2]);
    }
  }
  
  // Try single DMS coordinates separated by comma or space
  const parts = trimmed.split(/[,\s]+/).filter(p => p.trim().length > 0);
  if (parts.length === 2) {
    const firstDMS = parseDMS(parts[0]);
    const secondDMS = parseDMS(parts[1]);
    
    if (firstDMS !== null && secondDMS !== null) {
      return determineLatLng(firstDMS, secondDMS, parts[0], parts[1]);
    }
  }
  
  // Fall back to decimal format
  return parseDecimalCoordinates(trimmed);
}

/**
 * Determines which coordinate is latitude and which is longitude
 */
function determineLatLng(
  first: number,
  second: number,
  firstStr: string,
  secondStr: string
): ParsedCoordinates {
  let lat = first;
  let lng = second;
  
  // Check for direction indicators
  const firstHasNS = /[NS]/i.test(firstStr);
  const secondHasEW = /[EW]/i.test(secondStr);
  const firstHasEW = /[EW]/i.test(firstStr);
  const secondHasNS = /[NS]/i.test(secondStr);
  
  if (firstHasNS || secondHasEW) {
    lat = first;
    lng = second;
  } else if (firstHasEW || secondHasNS) {
    lat = second;
    lng = first;
  } else {
    // No direction indicators, use value ranges
    if (Math.abs(first) > 90 || (first > 0 && second < 0)) {
      lat = second;
      lng = first;
    }
  }
  
  return { lat, lng };
}

/**
 * Parse decimal coordinate format
 */
function parseDecimalCoordinates(coordString: string): ParsedCoordinates | null {
  const decimalParts = coordString
    .replace(/[,\s]+/g, ',')
    .split(',')
    .map(p => p.trim())
    .filter(p => p.length > 0);
  
  if (decimalParts.length !== 2) {
    return null;
  }
  
  let lat = parseFloat(decimalParts[0]);
  let lng = parseFloat(decimalParts[1]);
  
  if (isNaN(lat) || isNaN(lng)) {
    return null;
  }
  
  // Validate ranges - if values seem swapped, swap them
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) {
    const temp = lat;
    lat = lng;
    lng = temp;
  }
  
  // Additional validation for Malawi region
  if (lat > 0 && lng < 0) {
    const temp = lat;
    lat = lng;
    lng = temp;
  }
  
  return { lat, lng };
}

/**
 * Validates coordinates are within valid ranges
 */
export function validateCoordinates(coords: ParsedCoordinates): ParsedCoordinates {
  return {
    lat: Math.max(-90, Math.min(90, coords.lat)),
    lng: Math.max(-180, Math.min(180, coords.lng)),
  };
}
