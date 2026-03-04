/**
 * Geocoding Service
 * Single Responsibility: Convert location names to coordinates
 * Uses Google Maps Geocoding API (primary) with OpenStreetMap fallback
 */

import type { Coordinates } from '../types/coverage';

export interface GeocodingResult {
  coordinates: Coordinates;
  displayName: string;
}

export class GeocodingService {
  private static readonly GOOGLE_GEOCODE_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
  private static readonly NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';
  private static readonly REQUEST_DELAY_MS = 1000; // Rate limiting: 1 request per second
  
  /**
   * Get Google Maps API key from environment variables
   */
  private static getGoogleMapsApiKey(): string | null {
    // Check for API key in environment variables
    return import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 
           import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY || 
           null;
  }

  /**
   * Check if input looks like coordinates (contains numbers and degree symbols or decimal points)
   */
  static isCoordinateInput(input: string): boolean {
    const trimmed = input.trim();
    
    // Check for DMS format (contains degree symbols)
    if (trimmed.includes('°') || trimmed.includes("'") || trimmed.includes('"')) {
      return true;
    }
    
    // Check for decimal format (contains numbers with comma or space separator)
    const decimalPattern = /^-?\d+\.?\d*\s*[,，]\s*-?\d+\.?\d*$/;
    if (decimalPattern.test(trimmed)) {
      return true;
    }
    
    // Check for space-separated decimal coordinates
    const spacePattern = /^-?\d+\.?\d*\s+-?\d+\.?\d*$/;
    if (spacePattern.test(trimmed)) {
      return true;
    }
    
    return false;
  }

  /**
   * Geocode using Google Maps API (primary method - better for businesses and places)
   */
  private static async geocodeWithGoogle(
    locationName: string,
    countryCode: string = 'MW'
  ): Promise<GeocodingResult> {
    const apiKey = this.getGoogleMapsApiKey();
    if (!apiKey) {
      throw new Error('Google Maps API key not configured');
    }

    const params = new URLSearchParams({
      address: locationName.trim(),
      key: apiKey,
      region: countryCode.toLowerCase(),
      components: `country:${countryCode.toLowerCase()}`,
    });

    const response = await fetch(`${this.GOOGLE_GEOCODE_API_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Google Maps geocoding failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status === 'ZERO_RESULTS') {
      throw new Error(
        `Location "${locationName}" not found on Google Maps. This location may not exist.\n\n` +
        `Please try:\n` +
        `• A more specific location name\n` +
        `• Include business/place name if searching for a shop or landmark\n` +
        `• Or use coordinates instead (e.g., "-13.9626, 33.7741")`
      );
    }

    if (data.status !== 'OK' || !data.results || data.results.length === 0) {
      throw new Error(`Google Maps geocoding failed: ${data.status || 'Unknown error'}`);
    }

    const result = data.results[0];
    const location = result.geometry.location;
    const lat = location.lat;
    const lng = location.lng;

    return {
      coordinates: { lat, lng },
      displayName: result.formatted_address || result.name || locationName,
    };
  }

  /**
   * Geocode using OpenStreetMap Nominatim (fallback method)
   */
  private static async geocodeWithOpenStreetMap(
    locationName: string,
    countryCode: string = 'MW'
  ): Promise<GeocodingResult> {
    // Add delay to respect rate limiting
    await this.delay(this.REQUEST_DELAY_MS);

    const params = new URLSearchParams({
      q: locationName.trim(),
      format: 'json',
      limit: '1',
      countrycodes: countryCode,
      addressdetails: '1',
    });

    const response = await fetch(`${this.NOMINATIM_API_URL}?${params.toString()}`, {
      headers: {
        'User-Agent': 'CTN-Website/1.0', // Required by Nominatim
      },
    });

    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error(
        `Location "${locationName}" not found on the map. This location may not exist or may be too vague.\n\n` +
        `Please try:\n` +
        `• A more specific location (e.g., "Lilongwe Area 47 Sector 1, Malawi")\n` +
        `• Include city and area name\n` +
        `• Or use coordinates instead (e.g., "-13.9626, 33.7741")`
      );
    }

    const result = data[0];
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);

    if (isNaN(lat) || isNaN(lng)) {
      throw new Error('Invalid coordinates returned from geocoding service');
    }

    return {
      coordinates: { lat, lng },
      displayName: result.display_name || locationName,
    };
  }

  /**
   * Geocode a location name to coordinates
   * Tries Google Maps API first (if API key is available), falls back to OpenStreetMap
   * @param locationName - The location name or address to geocode (can include business names, shops, landmarks)
   * @param countryCode - Optional country code to limit search (e.g., 'MW' for Malawi)
   */
  static async geocode(
    locationName: string,
    countryCode: string = 'MW'
  ): Promise<GeocodingResult> {
    if (!locationName || !locationName.trim()) {
      throw new Error('Location name cannot be empty');
    }

    // Try Google Maps API first (better for businesses, shops, places)
    const apiKey = this.getGoogleMapsApiKey();
    if (apiKey) {
      try {
        return await this.geocodeWithGoogle(locationName, countryCode);
      } catch (error) {
        // If Google Maps fails and it's not a "not found" error, try fallback
        if (error instanceof Error && !error.message.includes('not found')) {
          console.warn('Google Maps geocoding failed, trying OpenStreetMap fallback:', error.message);
          // Fall through to OpenStreetMap
        } else {
          // Re-throw "not found" errors from Google Maps
          throw error;
        }
      }
    }

    // Fallback to OpenStreetMap
    try {
      return await this.geocodeWithOpenStreetMap(locationName, countryCode);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to geocode location. Please try again or use coordinates instead.');
    }
  }

  /**
   * Delay function for rate limiting
   */
  private static delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
