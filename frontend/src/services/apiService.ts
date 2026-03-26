/**
 * API Service
 * Dependency Inversion Principle: Abstract API calls
 * Single Responsibility: Handle all API communication
 */

import type { BaseStation, Coordinates, CoverageResult } from '../types/coverage';

interface ApiBaseStation {
  id: number | string;
  name: string;
  lat: number | string;
  lng: number | string;
}

export interface IApiService {
  fetchBaseStations(): Promise<BaseStation[]>;
  checkCoverage(coordinates: Coordinates): Promise<CoverageResult>;
}

export class ApiService implements IApiService {
  private readonly baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl ?? ApiService.resolveBaseUrl();
  }

  private static resolveBaseUrl(): string {
    const configuredBaseUrl = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
    if (configuredBaseUrl) {
      return configuredBaseUrl.replace(/\/+$/, '');
    }

    if (typeof window === 'undefined') {
      return 'http://localhost:5000';
    }

    const { hostname } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5000';
    }

    return '';
  }

  private buildUrl(pathname: string): string {
    return this.baseUrl ? `${this.baseUrl}${pathname}` : pathname;
  }

  /**
   * Fetch all base stations from the API
   */
  async fetchBaseStations(): Promise<BaseStation[]> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(this.buildUrl('/api/base-stations'), {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return ((data || []) as ApiBaseStation[]).map((station) => ({
        id: Number(station.id),
        name: station.name,
        lat: Number(station.lat),
        lng: Number(station.lng),
      }));
    } catch (error) {
      console.error('Failed to fetch base stations:', error);
      throw new Error('Failed to fetch coverage information. Ensure the coverage API is reachable.');
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Check coverage for given coordinates
   */
  async checkCoverage(coordinates: Coordinates): Promise<CoverageResult> {
    try {
      const response = await fetch(this.buildUrl('/api/coverage'), {
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
