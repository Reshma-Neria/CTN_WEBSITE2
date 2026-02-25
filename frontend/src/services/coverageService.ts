/**
 * Coverage Calculation Service
 * Single Responsibility: Calculate coverage-related metrics
 */

import type { BaseStation, CombinedCoverage, RelevantStations, Coordinates } from '../types/coverage';
import { DistanceService } from './distanceService';

export class CoverageService {
  private static readonly COVERAGE_RADIUS_KM = 10;

  /**
   * Get the coverage radius in kilometers
   */
  static getCoverageRadius(): number {
    return this.COVERAGE_RADIUS_KM;
  }

  /**
   * Calculate which stations are within coverage for a given location
   */
  static findStationsWithinCoverage(
    location: Coordinates,
    stations: BaseStation[]
  ): BaseStation[] {
    return stations.filter((station) => {
      const distance = DistanceService.calculateDistance(location, station);
      return distance <= this.COVERAGE_RADIUS_KM;
    });
  }

  /**
   * Find the nearest station to a given location
   */
  static findNearestStation(
    location: Coordinates,
    stations: BaseStation[]
  ): BaseStation | null {
    if (stations.length === 0) return null;

    let nearestStation: BaseStation = stations[0];
    let minDistance = DistanceService.calculateDistance(location, nearestStation);

    stations.forEach((station) => {
      const distance = DistanceService.calculateDistance(location, station);
      if (distance < minDistance) {
        minDistance = distance;
        nearestStation = station;
      }
    });

    return nearestStation;
  }

  /**
   * Calculate relevant stations (within coverage or nearest)
   */
  static calculateRelevantStations(
    location: Coordinates,
    stations: BaseStation[],
    isInCoverage: boolean
  ): RelevantStations {
    const stationsWithinCoverage = this.findStationsWithinCoverage(location, stations);
    const nearestStation = this.findNearestStation(location, stations);

    if (isInCoverage) {
      return {
        withinCoverage: stationsWithinCoverage,
        nearest: null,
      };
    }

    return {
      withinCoverage: [],
      nearest: nearestStation,
    };
  }

  /**
   * Calculate combined coverage boundary that encompasses all base stations
   */
  static calculateCombinedCoverage(
    stations: BaseStation[]
  ): CombinedCoverage | null {
    if (stations.length === 0) return null;

    // Find bounding box of all stations
    let minLat = stations[0].lat;
    let maxLat = stations[0].lat;
    let minLng = stations[0].lng;
    let maxLng = stations[0].lng;

    stations.forEach((station) => {
      minLat = Math.min(minLat, station.lat);
      maxLat = Math.max(maxLat, station.lat);
      minLng = Math.min(minLng, station.lng);
      maxLng = Math.max(maxLng, station.lng);
    });

    // Calculate center point
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;
    const center: Coordinates = { lat: centerLat, lng: centerLng };

    // Find the maximum distance from center to any station + coverage radius
    let maxDistance = 0;
    stations.forEach((station) => {
      const distance = DistanceService.calculateDistance(center, station);
      const totalDistance = distance + this.COVERAGE_RADIUS_KM;
      maxDistance = Math.max(maxDistance, totalDistance);
    });

    return {
      center: [centerLat, centerLng],
      radius: maxDistance,
    };
  }
}
