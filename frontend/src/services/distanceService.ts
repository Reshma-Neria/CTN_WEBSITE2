/**
 * Distance Calculation Service
 * Single Responsibility: Calculate distances between coordinates
 */

import type { Coordinates } from '../types/coverage';

/**
 * Calculate distance between two coordinates using Haversine formula
 */
export class DistanceService {
  private static readonly EARTH_RADIUS_KM = 6371;

  /**
   * Calculate distance in kilometers between two coordinates
   */
  static calculateDistance(
    coord1: Coordinates,
    coord2: Coordinates
  ): number {
    const dLat = this.toRadians(coord2.lat - coord1.lat);
    const dLon = this.toRadians(coord2.lng - coord1.lng);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(coord1.lat)) *
        Math.cos(this.toRadians(coord2.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return this.EARTH_RADIUS_KM * c;
  }

  /**
   * Convert degrees to radians
   */
  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}
