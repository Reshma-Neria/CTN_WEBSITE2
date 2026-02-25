/**
 * API Service
 * Dependency Inversion Principle: Abstract API calls
 * Single Responsibility: Handle all API communication
 */

import type { BaseStation, Coordinates, CoverageResult } from '../types/coverage';

export interface IApiService {
  fetchBaseStations(): Promise<BaseStation[]>;
  checkCoverage(coordinates: Coordinates): Promise<CoverageResult>;
}

export class ApiService implements IApiService {
  private readonly baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || (import.meta.env.VITE_API_URL as string) || 'http://localhost:4000';
  }

  /**
   * Fetch all base stations from the API
   */
  async fetchBaseStations(): Promise<BaseStation[]> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(`${this.baseUrl}/api/base-stations`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return (data || []).map((s: any) => ({
        id: s.id,
        name: s.name,
        lat: Number(s.lat),
        lng: Number(s.lng),
      }));
    } catch (error) {
      console.error('Failed to fetch base stations:', error);
      throw new Error('Failed to fetch coverage information. Ensure backend is running.');
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Check coverage for given coordinates
   */
  async checkCoverage(coordinates: Coordinates): Promise<CoverageResult> {
    try {
      const response = await fetch(`${this.baseUrl}/api/coverage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(coordinates),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return {
        inCoverage: !!data.inCoverage,
        nearest: data.nearest
          ? {
              name: data.nearest.name,
              distanceKm: data.nearest.distanceKm,
            }
          : undefined,
      };
    } catch (error) {
      console.error('Coverage check failed:', error);
      throw new Error('Failed to evaluate coverage.');
    }
  }
}
